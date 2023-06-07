import * as THREE from "three";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Mesh, Object3D } from "three";

export default function testCubeTexture({ camera, renderer, controls }: any) {
  console.log("testCubeTexture");
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe4e9f0);
  const troControl = new TransformControls(camera, renderer.domElement);

  function initLight() {
    // const dirLight1 = new THREE.DirectionalLight(0xffffff);
    // dirLight1.position.set(1, 1, 1);
    // scene.add(dirLight1);

    // const dirLight2 = new THREE.DirectionalLight(0x002288);
    // dirLight2.position.set(-1, -1, -1);
    // scene.add(dirLight2);

    // const ambientLight = new THREE.AmbientLight(0x404040);
    // scene.add(ambientLight);
    const spotLight = new THREE.SpotLight(0x3d3d3d, 1, 10);
    spotLight.castShadow = true;

    spotLight.position.set(-10, 50, -10);
    scene.add(spotLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff);

    dirLight2.position.set(0, -50, 0);
    //sceneNow.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.92);
    light.position.set(-10, 0, -10);
    scene.add(light);
  }
  const a = {
    x: -35.75897731994577,
    y: 9.689793516631738,
    z: -392.82801845029167,
  };
  const createPlaneMap = () => {
    const loader = new THREE.TextureLoader();
    const url = "floor/image.png";
    loader.crossOrigin = "";
    const gMap = loader.load(url);
    gMap.wrapS = THREE.RepeatWrapping;
    gMap.wrapT = THREE.RepeatWrapping;
    gMap.repeat.set(1, 1);

    const boxProjectedMat = new THREE.MeshPhongMaterial({
      alphaTest: 0.1,
      map: gMap,
      // side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.79,
    });
    const imgWidth = 221;
    const imgHeight = 92;
    const planeMap = new THREE.Mesh(
      new THREE.PlaneGeometry(imgWidth, imgHeight * 1),
      boxProjectedMat
    );
    planeMap.rotateX(-Math.PI / 2);
    //    planeMap.rotateZ(Math.PI)
    // planeMap.position.set(
    //   -193.4331473464016,

    //   4.292042426869216,

    //   -84.5840343184382);
    //  sceneA.objects.push(groundPlane)
    planeMap.renderOrder = 2;
    scene.add(planeMap);
    troControl.attach(planeMap);

    troControl.addEventListener("dragging-changed", function (event) {
      controls.enabled = !event.value;
    });
    scene.add(troControl);
    scene.add(new THREE.BoxHelper(planeMap));
    setInterval(() => {
      console.log(planeMap);
    }, 10000);
    return planeMap;
  };
  const init = () => {
    window.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
        case 81: // Q
          troControl.setSpace(troControl.space === "local" ? "world" : "local");
          break;

        case 16: // Shift
          troControl.setTranslationSnap(100);
          troControl.setRotationSnap(THREE.MathUtils.degToRad(15));
          troControl.setScaleSnap(0.25);
          break;

        case 87: // W
          troControl.setMode("translate");
          break;

        case 69: // E
          troControl.setMode("rotate");
          break;

        case 82: // R
          troControl.setMode("scale");
          break;

        // case 27: // Esc
        //     control.reset();
        //     break;
      }
    });

    //  new THREE.TextureLoader().load('cubetexture/bg.jpeg',(texture)=>{
    //         console.log('init')
    //         const geometry = new THREE.SphereGeometry( 20, 100, 100 );
    //         const material = new THREE.MeshBasicMaterial( { map:texture } );
    //         const sphere = new THREE.Mesh( geometry, material );
    //         sphere.geometry.scale(1,1,-1)
    //         scene.add( sphere );
    //         console.log(sphere)
    //         scene.add(new THREE.AxesHelper(200))

    //     });

    loadBuilding();
    createPlaneMap();
    scene.add(new THREE.AxesHelper(1200));

    //  camera.position.set(0,0,1)
  };
  const loadBuilding = () => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("robot/draco/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    const gltfloader = new GLTFLoader();
    gltfloader.setDRACOLoader(dracoLoader);
    const url = "floor/moying_SH.gltf";
    gltfloader.load(url, (gltf) => {
      // gltf.scene.renderOrder = 8;
      gltf.scene.position.set(0, 0, 0);

      //   const a = gltf.scene.children[0].children[2];
      console.log(gltf.scene);
      //   let d;
      //   gltf.scene.traverse((node) => {
      //     if (node.userData.name === "立方体.427") {
      //         d = node
      //         console.log(node)
      //   //    a.remove(node);
      //     }
      //   });
      // a.remove(d)
      //  gltf.scene.children[0].remove(a);
      //       x
      // :
      // -76.82601916352318
      // y
      // :
      // 0
      // z
      // :
      // -23.795851201079856
      const bbox = new THREE.Box3().setFromObject(gltf.scene);
      const modelZ = (55.91 * 20) / (bbox.max.z - bbox.min.z);
      console.log(bbox, modelZ);
      gltf.scene.scale.set(1, 1, 1);
      //  gltf.scene.rotateY(-Math.PI/2)
      // gltf.scene.traverse((node) => {
      //   // if (!node.isMesh) return;
      //   if (node instanceof Mesh) {
      //     node.material.wireframe = true;
      //     node.geometry.computeTangents()
      //   }
      // });
      const box = new THREE.BoxHelper(gltf.scene, 0xffff00);
      console.log(box);
      //    scene.add(box);
      scene.add(gltf.scene);
      box.update();
      //   const wireframe = new THREE.WireframeGeometry( gltf.scene.geometry );
      //   let line = new THREE.LineSegments( wireframe );
    });
  };

  init();
  initLight();
  return scene;
}
