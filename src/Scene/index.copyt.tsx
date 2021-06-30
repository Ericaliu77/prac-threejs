import React, { Component, Fragment } from "react";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "./OrbitControls";
import { FirstPersonControls } from "./FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import {CSS3DRenderer,CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "./reCode/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";
import { getHistoryData } from "./getHistoryData";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";
import axios from "axios";
import geolist from "./geolist.json";
import { showRobots } from "./showRobot";
import { loadWanke,loadPCD,loadIndoor,testFatLine,loadWankeInside } from "./pages/index";
const MeshLine = require("three.meshline").MeshLine;
const MeshLineMaterial = require("three.meshline").MeshLineMaterial;
const MeshLineRaycast = require("three.meshline").MeshLineRaycast;
const css = require("./index.less");
let scene2: any;
let renderer: any;
let rendererCss: any;
let camera: any;
let sceneNow: any;
let controls: any;
let scene: any;
let sceneCss:any;
let stats = Stats()
let historyData: any;
let robotModel: any;
let robotHistoryData: any;
let fatLine: any
class Scene extends Component {
  componentDidMount() {
    this.init();
  }
  WSG84TOMercator(geo: any) {
    const lon = geo[0];
    const lat = geo[1];
    let x = (lon * 20037508.34) / 180;
    // let y =
    //   ((Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 360)) *
    //     20037508.34) /
    //   180;
    var y = (Math.PI / 180.0) * lat;
    var tmp = Math.PI / 4.0 + y / 2.0;
    y = (20037508.3427892 * Math.log(Math.tan(tmp))) / Math.PI;
    return [x, y];
    //let y = Math.log(Math.tan((90+lat)*Math.PI/360))/（Math.PI/360）*20037508.34/180
  }
  init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = true;

  
    camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.set(-200, 700, -100);

    controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 10;
    controls.maxDistance = 10000;
    //修改鼠标事件
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    controls.maxPolarAngle = Math.PI / 2;

  // document
  // .getElementById("scene-container")
  // ?.appendChild(rendererCss.domElement);
  document
  .getElementById("scene-container")
  ?.appendChild(renderer.domElement);
  document
  .getElementById("scene-container")
  ?.appendChild(stats.domElement);

     // const {scene,fL} = testFatLine(renderer,camera,controls)
    // sceneNow = scene

    // sceneNow = loadWanke(renderer,camera,controls)
 //   sceneNow = loadIndoor(renderer,camera,controls)
   // this.setSceneCss()
   sceneNow = loadWankeInside(renderer,camera,controls)
 // this.initScene2();
    this.animate();
  }
  checkPosition = (event: any) => {
    const mouse = new THREE.Vector2(1, 1);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
  };
  getColor(height: any) {
    let rgb;
    if (height < 61.4) {
      rgb = "112,112,123";
    } else if (height >= 61.4 && height < 104.8) {
      rgb = "135,139,155";
    } else if (height >= 104.8 && height < 148.2) {
      rgb = "231,241,245";
    } else if (height >= 148.2 && height < 236) {
      rgb = "162,169,183";
    } else {
      rgb = "1,0,0";
    }
    return `rgb(${rgb})`;
  }
  animate = () => {
    requestAnimationFrame(this.animate);

    stats.update()
    //  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    this.setRender();
  };
  setRender() {
    renderer.render(sceneNow, camera);
 
    //console.log(sceneCss)
    window.addEventListener("resize", this.onWindowResize);
  }
  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  initScene1() {
    let otherMesh: any;
    const _this = this;
    scene = new THREE.Scene();
    sceneNow = scene;
    scene.background = new THREE.Color(0x272727);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    function onMouseMove(event: any) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    function MouseClick(event: any) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (otherMesh) {
        const intersectClick = raycaster.intersectObject(otherMesh);

        if (intersectClick.length > 0) {
          console.log("onclick");
          sceneNow = scene2;
          _this.initScene2();
          render();

          document.removeEventListener("pointerup", MouseClick);
          // otherMesh.material.color = new THREE.Color(0xff8c59);
        } else {
        }
      }
    }

    // world
    const geometry1 = new THREE.BoxGeometry(50, 140, 10);
    const count = geometry1.attributes.position.count;

    const geometryTest = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);

    const texture = new THREE.TextureLoader().load("./icon-buildingTop.png");
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 30);

    // console.log("cube", geometry1);
    //console.log("position", geometry1.attributes.position.getY(1));

    //  scene.add(cube);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    //
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

    function animate() {
      requestAnimationFrame(animate);
     // controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      render();
    }
    function render() {
      raycaster.setFromCamera(mouse, camera);

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("pointerup", MouseClick);

      renderer.render(sceneNow, camera);
    }

    function loadModel() {
      const loader = new GLTFLoader();
      loader.load("./model/others.gltf", (gltf) => {
        gltf.scene.position.set(-120, 0, 120);
        //

        // console.log(gltf.scene)
        // scene.add(gltf.scene)
        gltf.scene.traverse((mesh) => {
          if (mesh instanceof THREE.Mesh) {
            let texttrue2 = new THREE.TextureLoader().load(
              "./icon-buildingTop.png"
            );
            mesh.position.set(-120, 0, 120);
            // mesh.material = new THREE.MeshBasicMaterial({
            //   map: texttrue2,
            //   // specularMap:texttrue2,
            //   //  specular: 0x111111,
            // });

            mesh.material = new THREE.MeshBasicMaterial({
              color: 0x508aff,
            });
            otherMesh = mesh;
            material.normalScale.set(1, 0);
            //  scene.add(helper)
            mesh.material.transparent = true;
            mesh.material.opacity = 0.5;
            console.log("rigthone", mesh, texture);
            scene.add(mesh);
            let originColor = mesh.material.color;
            let INTERSECTED: any;
            const aaa = () => {
              requestAnimationFrame(aaa);
              const intersects = raycaster.intersectObject(mesh);

              if (intersects.length > 0) {
                mesh.material.color = new THREE.Color(0xff8c59);
              } else {
                mesh.material.color = originColor;
              }
            };
            aaa();
          }

          //   scene.add(gltf.scene)
          //console.log(gltf.scene);
        });

        render();
      });
    }
    function loadBuildings() {
      let lineMaterial = new LineBasicMaterial({
        color: "#e33540",
        transparent: true,
        linewidth: 5,
        opacity: 1.0,
      });
      //解决z-flighting
      lineMaterial.polygonOffset = true;
      lineMaterial.depthTest = true;
      lineMaterial.polygonOffsetFactor = 1;
      lineMaterial.polygonOffsetUnits = 1.0;
      const loader = new GLTFLoader();
      loader.load("./model/baoancenter-1.gltf", (gltf) => {
        gltf.scene.position.set(0, 0, 0);
        //   gltf.scene.scale.set(1.1, 1.1, 1.1);
        gltf.scene.traverse((mesh) => {
          if (mesh instanceof THREE.Mesh) {
            let texttrue2 = new THREE.TextureLoader().load(
              "./icon-buildingTop.png"
            );
            let materialNormal = new THREE.MeshNormalMaterial();
            let edges = new EdgesGeometry(mesh.geometry, 1);
            let lines = new LineSegments(edges, lineMaterial);
            scene.add(lines);
            // mesh.material = materialNormal
            mesh.material = new THREE.MeshPhongMaterial({
              //      specular: 0xb21e2d,
              emissive: 0x450108,
              color: 0x272727,
              //        color: _this.getColor(height),
              transparent: true,
              opacity: 0.72,
              //map: texttrue2,
              //        specularMap:texttrue2,
              //  shininess:30
            });
            scene.add(mesh);
            //     mesh.material.transparent = true;
            //mesh.material.opacity = 0.55;
            //    console.log(mesh, texture);
          }

          //  scene.add(gltf.scene);
        });
      });
    }
    //   const linegeo =  _this.getLineJson();

    function loadGround() {
      const loader = new THREE.TextureLoader();
      let gMap = loader.load("./texture/point.png");
      gMap.wrapS = THREE.RepeatWrapping;
      gMap.wrapT = THREE.RepeatWrapping;
      gMap.repeat.set(300, 200);

      let boxProjectedMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: gMap,
      });
      boxProjectedMat.transparent = true;
      //      boxProjectedMat.opacity = 0.5
      let groundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(5000, 3000),
        boxProjectedMat
      );
      groundPlane.rotateX(-Math.PI / 2);
      groundPlane.position.set(0, -2, 0);
      scene.add(groundPlane);
      render();

      const checkPosition = (event: any) => {
        const mouse = new THREE.Vector2(1, 1);
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(groundPlane);
        if (intersects.length > 0) {
          console.log(intersects[0].point);
        }
      };
      document
        .getElementById("scene-container")
        ?.addEventListener("click", checkPosition);
    }
    function loadLine() {
      let texture = new THREE.TextureLoader().load("texture/gline.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
      texture.needsUpdate = true;
      texture.repeat.set(1, 1);
      console.log(geolist);
      const materia4 = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      for (let item in geolist) {
        let geoArr: any = [];
        geolist[item].forEach((e: any) => {
          geoArr.push(new THREE.Vector3(e[0], e[1], e[2]));
        });
        let curve = new THREE.CatmullRomCurve3(geoArr); // 曲线路径
        let tubularSegments = geolist[item].length + 3;
        const tubeGeometry = new THREE.TubeGeometry(
          curve,
          tubularSegments,
          4,
          22
        );
        let mesh = new THREE.Mesh(tubeGeometry, materia4);
        scene.add(mesh);
      }

      const move = () => {
        texture.offset.x -= 0.0076;
        requestAnimationFrame(move);
      };
      move();
    }
    function loadRoad() {
      let center = _this.WSG84TOMercator([113.877981, 22.55755]); //22.55764,113.87800
      console.log(center);
      const linegeo = axios.get("./linegeo/lines.json").then((res) => {
        let { geometries } = res.data;

        const material = new THREE.LineBasicMaterial({
          color: "#2179bd",
          linewidth: 1,
          transparent: true,
          opacity: 0.5,
        });
        geometries.forEach((geomatery: any) => {
          let points = geomatery.coordinates;
          let transPoints: any = [];
          points.forEach((geo: any) => {
            let geoM = _this.WSG84TOMercator(geo);

            let newGeo = new THREE.Vector3(
              geoM[0] - center[0],
              -1,
              -(geoM[1] - center[1])
            );
            transPoints.push(newGeo);
          });
          const geometry = new THREE.BufferGeometry().setFromPoints(
            transPoints
          );
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        });
        //   let points1 = geometries[0].coordinates
        //   let trans:any = []
        // //  console.log(points1[0])
        //   points1.forEach((geo:any,index:any)=>{
        //     let geoM = _this.WSG84TOMercator(geo)
        //  //   points.push(new THREE.Vector3(150, -1, 100));
        //     let newGeo =new THREE.Vector3(+(geoM[0]-center[0]),-1,-(geoM[1]-center[1]))
        //     trans.push(newGeo)
        //   })
        //   console.log(trans)
        //   const geometry = new THREE.BufferGeometry().setFromPoints(trans);
        //   const line = new THREE.Line(geometry, material);
        //   scene.add(line);
      });
    }
    let a =
      "czm_material czm_getMaterial(czm_materialInput materialInput)" +
      " {czm_material material = czm_getDefaultMaterial(materialInput);" +
      "vec2 st = materialInput.st;" +
      "if(texture2D(image, vec2(0.0,0.0)).a == 1.0){discard;}" +
      "else{material.alpha=texture2D(image,vec2(1.0-fract(time-st.s),st.t)).a* color.a;}" +
      "material.diffuse =max(color.rgb*material.alpha*3.0,color.rgb);return material;}";

    scene.add(new THREE.AxesHelper(200));
    animate();
    loadRoad();
    loadModel();
    loadBuildings();
    loadGround();
    loadLine();
    initLight();
  }
  setSceneCss(){
    rendererCss = new CSS3DRenderer();
    rendererCss.setSize(window.innerWidth, window.innerHeight);
    rendererCss.domElement.style.position = 'absolute';
    renderer.setClearColor(0x000000, 0)
    rendererCss.domElement.style.zIndex = 1;
    rendererCss.domElement.style.top = 0;
    sceneCss = new THREE.Scene();

    var material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        opacity: 0.0,
        side: THREE.DoubleSide
    });
    
    var xpos = [50, -10, 30, 70, 110];
    var ypos = [60, -40, 0, 40, 80];
    var zpos = [-30, -50, 0, 50, 100];

    for (var i = 0; i < 5; i++) {

        var element = document.createElement('div');
        element.style.width = '100px';
        element.style.height = '100px';
      //  element.style.opacity = 1.0;
        element.style.background = new THREE.Color(Math.random() * 0xff0000).getStyle();

        var object = new CSS3DObject(element);
        object.position.x = xpos[i];
        object.position.y = ypos[i];
        object.position.z = zpos[i];
        object.rotation.x = Math.PI / (i + 5);
        object.rotation.y = Math.PI / (21 - 2 * i);
        object.rotation.z = Math.PI / (3 * i + 25);
        object.scale.x = i / 12 + 0.5;
        object.scale.y = 1 / (12 - i) + 0.5;
        sceneCss.add(object);
       
    }
    const table = [
      "H", "Hydrogen", "1.00794", 1, 1,
      "He", "Helium", "4.002602", 18, 1,
      "Li", "Lithium", "6.941", 1, 2,
      "Be", "Beryllium", "9.012182", 2, 2,]
      const objects = [];
      for ( let i = 0; i < table.length; i += 5 ) {
        const element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')'

        const number = document.createElement( 'div' );
        number.className = 'number';
        number.textContent = ( i / 5 ) + 1;
        element.appendChild( number );

        const symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = table[ i ];
        element.appendChild( symbol );

        const details = document.createElement( 'div' );
        details.className = 'details';
        details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
        element.appendChild( details );

        const objectCSS = new CSS3DObject( element );
        objectCSS.position.x = Math.random() * 400 - 200;
        objectCSS.position.y = Math.random() * 400 - 200;
        objectCSS.position.z = Math.random() * 400 - 200;
        sceneCss.add(objectCSS)
        objects.push( objectCSS );

        const object = new THREE.Object3D();
        object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
				object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

//					targets.table.push( object );
      }
      controls.dispose()
      controls = new OrbitControls(camera, rendererCss.domElement);

      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;
  
      controls.screenSpacePanning = false;
  
      controls.minDistance = 10;
      controls.maxDistance = 10000;
      //修改鼠标事件
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      };
      controls.maxPolarAngle = Math.PI / 2;
       document
  .getElementById("scene-container")
  ?.appendChild(rendererCss.domElement);
      aaabbb()
      function aaabbb(){
        requestAnimationFrame(aaabbb)
        rendererCss.render(sceneCss, camera);
      }

  }

  calMapOriginDeviation = (coordinates: any, origin: any, resolution: any) => {
    //  let { coordinates } = robotOHistoryData[name][value
    let imgHeight = 553 * 2;
    let imgWidth = 1140 * 2;
    let difwidth = 57.7 * 2;
    let difheight = 83 * 2;
    //解决地图原点误差
    let _x = (coordinates[0] - origin[0]) / resolution;
    let _y = (coordinates[1] - origin[1]) / resolution;
    let x = _x - imgWidth / 2 - difwidth;
    let y = _y - imgHeight / 2 - difheight;
    //解决canvas与地图的原点误差
    return [x, y];
  };
  cameraAuto() {
    console.log("11111111");
    const _this = this;
    let t0 = new Date().getTime();
    console.log(controls);
    // controls.autoRotateSpeed = 0.1;
    controls.autoRotate = true;
    controls.update();

    function animatecamera() {
      controls.update();

      //let radian = _this.AngleToRadian(10);
      camera.rotateY(1);

      camera.lookAt(scene.position);
      console.log(camera.lookAt);
      renderer.render(scene, camera);
      // requestAnimationFrame(animatecamera);
      controls.target = new THREE.Vector3(0, -100, 0);
    }

    // animatecamera()
  }
  cameraStop() {
    controls.autoRotate = false;
  }
  AngleToRadian(angle: any) {
    const radian = angle * (Math.PI / 180);
    return radian;
  }

  render() {
    return (
      <Fragment>
        <div id="scene-container" className={css["scene-container"]}></div>

        <button
          style={{ position: "fixed", top: 200, left: 200 }}
          onClick={this.cameraAuto}
        >
          旋转
        </button>
        <button
          style={{ position: "fixed", top: 240, left: 200 }}
          onClick={this.cameraStop}
        >
          停止
        </button>
        {/* <button onClick = {this.setToScene1}>返回</button> */}
      </Fragment>
    );
  }
}
export default Scene;
