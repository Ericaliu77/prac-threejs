import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
const MeshLine = require("three.meshline").MeshLine;
const MeshLineMaterial = require("three.meshline").MeshLineMaterial;
const MeshLineRaycast = require("three.meshline").MeshLineRaycast;
export function showRobot(renderer: any, camera: any, controls: any) {
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x5e5e5e); 
  let texture;
  const showRobotLight = () => {
    new MTLLoader().load("robot/light/light-all.mtl", (materials) => {
      materials.preload();

      new OBJLoader()
        .setMaterials(materials)
        .load("robot/light/light-all.obj", (obj) => {
          obj.renderOrder = 8;
          obj.position.set(0, 0, 0);
          //scene.add(obj);
          console.log(obj);
        });
    });
  };
  function initLight() {
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
  }
  function loadGround() {
    const loader = new THREE.TextureLoader();
    let gMap = loader.load("./texture/point.png");
    gMap.wrapS = THREE.RepeatWrapping;
    gMap.wrapT = THREE.RepeatWrapping;
    gMap.repeat.set(300, 200);
    let groundPlane;
    let boxProjectedMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: gMap,
    });
    boxProjectedMat.transparent = true;
    //      boxProjectedMat.opacity = 0.5
    groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5000, 3000),
      boxProjectedMat
    );
    groundPlane.rotateX(-Math.PI / 2);
    groundPlane.position.set(0, -2, 0);
    console.log(groundPlane);
    scene.add(groundPlane);
    //     render();
  }
  var textureLoader = new THREE.TextureLoader();
  function loadLine() {
    let uniforms = {
      amplitude: { value: 5.0 },
      opacity: { value: 1 },
      color: { value: new THREE.Color(0xffffff) },
      texture1: { value: textureLoader.load("texture/red-line.png") },
      topColor: { value: new THREE.Color(0x0077ff) },
      bottomColor: { value: new THREE.Color(0xffffff) },
      offset: { value: 1 },
      exponent: { value: 0.6 },
    };
    const Vshader =
      "uniform float amplitude;" +
      //      "attribute vec3 displacement;" +
      "attribute vec3 customColor;" +
      "varying vec3 vWorldPosition;" +
      "varying vec3 vColor;" +
      "void main() {" +
      "vec4 worldPosition = modelMatrix *vec4(position,1.0)" +
      "vWorldPosition = worldPosition.xyz" +
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );" +
      "}";
    const fShader =
      "uniform vec3 topColor;" +
      "uniform vec3 bottomColor;" +
      "uniform float opacity;" +
      "uniform float offset;" +
      "uniform float exponent;" +
      " uniform sampler2D texture1;" +
      "varying vec3 vWorldPosition;" +
      "void main() {" +
      " float h = normalize( vWorldPosition + offset ).z;" +
      "gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );" +
      "}";
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: Vshader,
      fragmentShader: fShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });
    const points = [];
    points.push(new THREE.Vector3(0, -1, 10));
    points.push(new THREE.Vector3(20, -1, 180));
    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });
    // points.push(new THREE.Vector3(200, -1, 320));
    // points.push(new THREE.Vector3(250, -1, 380));
    // points.push(new THREE.Vector3(330, -1, 382));
    // points.push(new THREE.Vector3(350, -1, 392));
    // points.push(new THREE.Vector3(460, -1, 505));
    // points.push(new THREE.Vector3(490, -1, 529));
    // points.push(new THREE.Vector3(520, -1, 540));
    // points.push(new THREE.Vector3(640, -1, 420));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, shaderMaterial);
    console.log(line);
    scene.add(line);
  }
  function loadText() {
    let uniforms = {
      amplitude: { value: 5.0 },
      opacity: { value: 1 },
      color: { value: new THREE.Color(0xffffff) },
      texture1: { value: textureLoader.load("texture/red-line.png") },
    };
    const loader = new THREE.FontLoader();
    loader.load("texture/helvetiker_bold.typeface.json", function (font) {
      //  console.log(customColor * color)
      console.log(font);
      const Vshader =
        "uniform float amplitude;" +
        "attribute vec3 displacement;" +
        "attribute vec3 customColor;" +
        "varying vec3 vColor;" +
        "void main() {" +
        "vec3 newPosition = position + amplitude * displacement;" +
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );" +
        "}";
      const fShader =
        "uniform vec3 color;" +
        "uniform float opacity;" +
        " uniform sampler2D texture1;" +
        "void main() {" +
        "vec2 texcoord = vec2(0.5,0.5);" +
        "gl_FragColor =texture2D(texture1,texcoord);" +
        "}";
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: Vshader,
        fragmentShader: fShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      const geometry = new THREE.TextGeometry("three.js", {
        font: font,
        size: 50,
        height: 15,
        curveSegments: 10,

        bevelThickness: 5,
        bevelSize: 1.5,
        bevelEnabled: true,
        bevelSegments: 10,
      });

      geometry.center();

      const count = geometry.attributes.position.count;

      const displacement = new THREE.Float32BufferAttribute(count * 3, 3);
      geometry.setAttribute("displacement", displacement);

      let customColor = new THREE.Float32BufferAttribute(count * 3, 3);
      geometry.setAttribute("customColor", customColor);
      console.log(geometry);
      const color = new THREE.Color(0xffffff);

      for (let i = 0, l = customColor.count; i < l; i++) {
        color.setHSL(i / l, 0.5, 0.5);
        color.toArray(customColor.array, i * customColor.itemSize);
      }
      let points = [];
      points.push(new THREE.Vector3(100, 1, 10));
      points.push(new THREE.Vector3(200, 1, 300));
      let line = new THREE.Line(geometry, shaderMaterial);
      const geometry111 = new THREE.BufferGeometry().setFromPoints(points);
      const line111 = new THREE.Line(geometry111, shaderMaterial);
      console.log(line111);
      scene.add(line111);
      line.rotation.x = 0.2;
      scene.add(line);
    });
  }
  function loadTube() {
    //let tubeGeometry = new THREE.TubeGeometry()
  }
  function loadline1() {
     let texture = new THREE.TextureLoader().load("texture/gline.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
    texture.repeat.set(1, 1)
    texture.offset.y= 0.5;
    const material = new MeshLineMaterial({
      map: texture,
      useMap: true,
      lineWidth: 2,
      sizeAttenuation: true,
      transparent: true,
      near: camera.near,
      far: camera.far,
    });
    material.needsUpdate = true
    const points = [];
    points.push(new THREE.Vector3(0, -1, 10));
    points.push(new THREE.Vector3(20, -1, 180));
       points.push(new THREE.Vector3(520, -1, 540));
     points.push(new THREE.Vector3(640, -1, 420));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    material.uniforms.resolution.value.set(100, 100);
    const meshLine = new MeshLine();
    //  meshLine.setGeometry(geometry);
    meshLine.setPoints(points);
    const line = new THREE.Mesh(meshLine.geometry, material);
    console.log(line)
    scene.add(line);
    function animate(){
   //     texture.offset.x-=0.1;
        line.material.uniforms.dashOffset.value -= 0.01
        //console.log(texture.offset.x)
        requestAnimationFrame(animate)
        renderer.render(scene, camera);
    }
    animate()
  }
  // showRobotLight()
  //  loadText();
  //initLight();
  loadGround();
  //  loadLine();
  scene.add(new THREE.AxesHelper(20));
  loadline1();
  return scene;
}
