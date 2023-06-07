import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default function testBorderLoad(props: any) {
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x272727);
  scene.add(new THREE.AxesHelper(1200));
  const borderObstacleMeasurement = {
    back: 0.6100000143051147,
    backWarning: "ALERT",
    front: 2.5,
    frontWarning: "NORMAL",
    left: 1.1699999570846558,
    leftBack: 0.75,
    leftBackWarning: "ALERT",
    leftFront: 1.899999976158142,
    leftFrontWarning: "NORMAL",
    leftWarning: "WARNING",
    right: 2.490000009536743,
    rightBack: 1.409999966621399,
    rightBackWarning: "NORMAL",
    rightFront: 2.5,
    rightFrontWarning: "NORMAL",
    rightWarning: "NORMAL",
  };

  const vertexShader =
    "varying vec3 vWorldPosition;" +
    "void main(){" +
    "vec4 worldPosition = modelMatrix * vec4(position,1.0);" +
    "vWorldPosition = worldPosition.xyz;" +
    "gl_Position = projectionMatrix * modelViewMatrix *vec4(position,1.0);" +
    "}";
  const fragmentShader =
    "uniform vec3 topColor;" +
    "uniform vec3 bottomColor;" +
    "varying vec3 vWorldPosition;" +
    "float alpha = smoothstep(0.0, 1.0, vWorldPosition.y);"+
    "float colorMix = smoothstep(1.0, 2.0, vWorldPosition.y);"+
    "void main() {" +
    "gl_FragColor = vec4(mix(topColor, bottomColor, colorMix), 1);" +
    "}";
  function initGround() {
    // FLOOR
    var floorTexture = new THREE.TextureLoader().load(
      "texture/checkerboard.jpg"
    );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      map: floorTexture,
      side: THREE.DoubleSide,
    });
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -10.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.BoxGeometry(4000, 4000, 4000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.BackSide,
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
  }
  init();

  function drawBorder() {
    const borderShape = new THREE.Shape();
    const widthF = 27;
    const widthUnit = 9;
    const height = 36;
    const widthUp = 27;
    const widthDown = 44;
    const arcHeight = 5;
    const shapes = [];

    borderShape.moveTo(-widthUp / 2, 0);
    borderShape.quadraticCurveTo(0, 5, widthUp / 2, 0);
    borderShape.lineTo(widthDown / 2, height - arcHeight);
    borderShape.quadraticCurveTo(0, height, -widthDown / 2, height - arcHeight);
    borderShape.lineTo(-widthUp / 2, 0);

    const flat = new THREE.ShapeGeometry(borderShape);
    const mate = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: "#ffff00",
    });
    const uniforms = {
      topColor: {value: new THREE.Color(0x31c7de) },
      bottomColor: { value: new THREE.Color(0xde3c31) },
  
    };
    const skyMat = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(flat, skyMat);
    mesh.rotateX(Math.PI / 2);
    scene.add(mesh);
  }

  function init() {
    initLight();
    initGround();
    drawBorder();
    //  loadDeviceModel()
  }
  function initLight() {
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(0, -50, 0);
    scene.add(dirLight1);
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    const light = new THREE.HemisphereLight(0xffffff, 0x303030, 0.62);
    light.position.set(-10, 50, -10);
    scene.add(light);
  }
  function loadDeviceModel() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("robot/draco/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    const gltfloader = new GLTFLoader();
    gltfloader.setDRACOLoader(dracoLoader);
    const url = "model/CS6010.gltf";
    gltfloader.load(url, (gltf) => {
      gltf.scene.renderOrder = 8;
      gltf.scene.position.set(0, 0, 0);
      //    console.log(gltf.scene, gltf.animations)
      const bbox = new THREE.Box3().setFromObject(gltf.scene);

      console.log(gltf.scene);
      scene.add(gltf.scene);
    });
  }
  return scene;
}
