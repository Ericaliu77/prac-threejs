import React, { Component, Fragment } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "./OrbitControls";
import { FirstPersonControls } from "./FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import {CSS3DRenderer,CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";
import { getHistoryData } from "./getHistoryData";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";
import axios from "axios";
import geolist from "./geolist.json";
import { showRobots } from "./showRobot";
import { loadWanke } from "./pages/loadWanke";
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

let historyData: any;
let robotModel: any;
let robotHistoryData: any;
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

    renderer.domElement.style.position = 'absolute';
  //  renderer.domElement.style.zIndex = 1;
    renderer.domElement.style.top = 0

    rendererCss = new CSS3DRenderer();
    rendererCss.setSize(window.innerWidth, window.innerHeight);
    rendererCss.domElement.style.position = 'absolute';
    renderer.setClearColor(0x000000, 0)
    rendererCss.domElement.style.zIndex = 1;
    rendererCss.domElement.style.top = 0;
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
   

    // sceneNow = loadWanke(renderer,camera,controls)
    this.setSceneCss()
    this.initScene2();
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
    //  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    this.setRender();
  };
  setRender() {
    renderer.render(sceneNow, camera);
    rendererCss.render(sceneCss, camera);
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
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      render();
    }
    function render() {
      raycaster.setFromCamera(mouse, camera);

      document.addEventListener("mousemove", onMouseMove);
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
  }
  async initScene2() {
    const _this = this;
    scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0x272727);
    sceneNow = scene2;
    let floorWidth = 3000;
    let floorHeight = 2000;
   // robotHistoryData = await getHistoryData();
    let house26: any = {
      houseWidth: 1140,
      houseHeight: 553,
      angle: 45,
      walls: [
        {
          size: { x: 1140, y: 70, z: 2 },
          position: { x: 0, y: 35, z: 276.5 }, //上外墙
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 553 },
          position: { x: -570, y: 35, z: 0 }, //右外墙
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 1140, y: 70, z: 2 },
          position: { x: 0, y: 35, z: -276.5 }, //下外墙
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 553 },
          position: { x: 570, y: 35, z: 0 }, //左外墙
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 159.7 },
          position: { x: 63, y: 35, z: 196.65 }, //a1
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 507, y: 70, z: 2 },
          position: { x: 316.5, y: 35, z: 116.8 }, //a2
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 159.7 },
          position: { x: -157, y: 35, z: 196.65 }, //b1
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 413, y: 70, z: 2 },
          position: { x: -363.5, y: 35, z: 116.8 }, //b2
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 179.15 },
          position: { x: 426.88, y: 35, z: -8.375 }, //c1
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 462.5, y: 70, z: 2 },
          position: { x: 195.63, y: 35, z: 81.2 }, //c2
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 462.5, y: 70, z: 1 },
          position: { x: 195.63, y: 35, z: -97.95 }, //c3
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 336.5, y: 70, z: 2 },
          position: { x: -270.35, y: 35, z: 81.2 }, //d1
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 179.15 },
          position: { x: -438.6, y: 35, z: -8.375 }, //d2
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 336.5, y: 70, z: 2 },
          position: { x: -270.35, y: 35, z: -97.95 }, //d3
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 107, y: 70, z: 1 },
          position: { x: -516.5, y: 35, z: 81.2 }, //e1
          rotate: { x: 0, y: 0, z: 0 },
        },

        {
          size: { x: 107, y: 70, z: 2 },
          position: { x: -516.5, y: 35, z: -98.8 }, //e2
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 180 },
          position: { x: -463, y: 35, z: -8.8 }, //e3
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 646.35, y: 70, z: 2 },
          position: { x: 202.075, y: 35, z: -139.5 }, //f1
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 65.08, y: 70, z: 2 },
          position: { x: -93.35, y: 35, z: -214.69 }, //f2
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 61.81 },
          position: { x: -125.89, y: 35, z: -245.595 }, //f3
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 93.83 },
          position: { x: 525.25, y: 35, z: -186.415 }, //f4
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 364, y: 70, z: 2 },
          position: { x: -388, y: 35, z: -139.5 }, //g1
          rotate: { x: 0, y: 0, z: 0 },
        },
        {
          size: { x: 2, y: 70, z: 137 },
          position: { x: -206, y: 35, z: -208 }, //g2
          rotate: { x: 0, y: 0, z: 0 },
        },
      ],

      blocks: [
        {
          geos: [
            [426.88, 81.2],
            [-35.62, 81.2],
            [-35.62, 57.7],
            [-22.17, 57.7],
            [-22.17, 66.1],
            [8.85, 66.1],
            [8.85, 25.99],
            [-22.17, 25.99],
            [-22.17, 34.39],
            [-35.62, 34.39],
            [-35.62, -1.13],
            [-22.17, -1.13],
            [-22.17, 7.27],
            [8.85, 7.27],
            [8.85, -32.84],
            [-22.17, -32.84],
            [-22.17, -24.44],
            [-35.62, -24.44],
            [-35.62, -59.94],
            [-22.17, -59.94],
            [-22.17, -51.54],
            [8.85, -51.54],
            [8.85, -91.5],
            [-22.17, -91.5],
            [-22.17, -83.1],
            [-35.62, -83.1],
            [-35.62, -97.95],
            [426.88, -97.95],
          ],
          height: 70,
        },
        {
          geos: [
            [-102.5, 81.2],
            [-102.5, 57.7],
            [-115.95, 57.7],
            [-115.95, 66.1],
            [-146.97, 66.1],
            [-146.97, 25.99],
            [-115.95, 25.99],
            [-115.95, 34.39],
            [-102.5, 34.39],
            [-102.5, -1.13],
            [-115.95, -1.13],
            [-115.95, 7.27],
            [-146.97, 7.27],
            [-146.97, -32.84],
            [-115.95, -32.84],
            [-115.95, -24.44],
            [-102.5, -24.44],
            [-102.5, -59.94],
            [-115.95, -59.94],
            [-115.95, -51.54],
            [-146.97, -51.54],
            [-146.97, -91.5],
            [-115.95, -91.5],
            [-115.95, -83.1],
            [-102.5, -83.1],

            [-102.5, -97.95],
            [-438.5, -97.95],
            [-438.5, 81.2],
          ],
          height: 70,
        },
        // {
        //   size: { x: 336.5, y: 70, z: 2 },
        //   position: { x: -270.35, y: 35, z: 81.2 }, //d1
        //   rotate: { x: 0, y: 0, z: 0 },
        // },
        // {
        //   size: { x: 2, y: 70, z: 179.15 },
        //   position: { x: -438.6, y: 35, z: -8.375 }, //d2
        //   rotate: { x: 0, y: 0, z: 0 },
        // },
        // {
        //   size: { x: 336.5, y: 70, z: 2 },
        //   position: { x: -270.35, y: 35, z: -97.95 }, //d3
        //   rotate: { x: 0, y: 0, z: 0 },
        // },
      ],
    };
    let mixer: any;
    let camMixer: any;
    house26.wallsObject = new THREE.Object3D();
    house26.blockObject = new THREE.Object3D();
    function createFloor() {
      const loader = new THREE.TextureLoader();
      let gMap = loader.load("./texture/point.png");
      gMap.wrapS = THREE.RepeatWrapping;
      gMap.wrapT = THREE.RepeatWrapping;
      gMap.repeat.set(120, 80);
      let groundPlane;
      let boxProjectedMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: gMap,
      });
      boxProjectedMat.transparent = true;
      //      boxProjectedMat.opacity = 0.5
      groundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(floorWidth, floorHeight),
        boxProjectedMat
      );
      groundPlane.rotateX(-Math.PI / 2);
      groundPlane.position.set(0, -2, 0);
      scene2.add(groundPlane);
      render();
    }

    function generateTexture() {
      const canvas = document.createElement("canvas");
      //const canvas = document.getElementById('test')as HTMLCanvasElement
      canvas.width = 5;
      canvas.height = 5;

      const context = canvas?.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, 5, 5);
      }
      return canvas;
      //}
    }
    function createBlock(geos: any, height: any) {
      const shape = new THREE.Shape();
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9c9c9c });

      let points: any = [];
      geos.forEach((geo: any, index: number) => {
        let [x, z] = geo;

        if (index === 0) {
          shape.moveTo(x * 2, -z * 2);
        }
        shape.lineTo(x * 2, -z * 2);
        points.push(new THREE.Vector3(x * 2, -z * 2, 4.01));
      });
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const extrudeSettings = {
        depth: height,
        bevelEnabled: false,
      };
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshLambertMaterial({
        color: 0x77e3fb,
        emissive: 0x272727,
        opacity: 0.72,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      let edges = new EdgesGeometry(mesh.geometry, 1);
      let lines = new LineSegments(edges, lineMaterial);

      mesh.rotateX(-Math.PI / 2);
      lines.rotateX(-Math.PI / 2);
      //house26.blockObject.add(lines);
      house26.blockObject.add(mesh);
    }
    function createBox(
      width: any,
      height: any,
      depth: any,
      x: any,
      y: any,
      z: any
    ) {
      const params = {
        color: 0x77e3fb,
        transmission: 0.2,
        envMapIntensity: 1,
        lightIntensity: 1,
        exposure: 1,
      };
      let cubeGeometry = new THREE.BoxGeometry(width * 2, height, depth * 2);
      const texture = new THREE.CanvasTexture(generateTexture());
      const texture1 = new THREE.TextureLoader().load(
        "./texture/lightblue.png"
      );
      //texture.magFilter = THREE.NearestFilter;
      texture.wrapT = THREE.RepeatWrapping;
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      const material1 = new THREE.MeshPhysicalMaterial({
        color: params.color,
        metalness: 0,
        roughness: 0,
        alphaMap: texture,
        alphaTest: 0.5,

        envMapIntensity: params.envMapIntensity,
        depthWrite: false,
        transmission: params.transmission, // use material.transmission for glass materials
        opacity: 1, // set material.opacity to 1 when material.transmission is non-zero
        transparent: true,
        side: THREE.DoubleSide,
      });
      const color = new THREE.Color();
      color.setHSL(0.5, 0.85, 0.52);
      material1.color = color;
      const material = new THREE.MeshBasicMaterial({
        //  map: texture1,
        color: 0xc7ecf2,
        // specular:0x8fbbef,
        //side:THREE.DoubleSide,
        transparent: true,
        opacity: 0.42,
        //      alphaTest: 0.01,
      });

      //    material.transparent = true;
      //material.opacity = 0.15;
      let angle = 90;
      let cube = new THREE.Mesh(cubeGeometry, [
        material,
        material,
        material1,
        material1,
        material,
        material,
      ]);
      cube.position.x = x * 2;
      cube.position.y = y;
      cube.position.z = z * 2;
      cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
      cube.renderOrder = 8;
      house26.wallsObject.add(cube);
    }
    function createShape() {
      const geometry = new THREE.PlaneGeometry(507, 40);
      const texture1 = new THREE.TextureLoader().load(
        "./texture/lightblue.png"
      );

      const material = new THREE.MeshPhongMaterial({
        map: texture1,
        //color:'#855918',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.72,
      });
      const lGeometry = new LineGeometry();
      const color = new THREE.Color();
      color.setHSL(0.5, 0.85, 0.52);
      lGeometry.setPositions([
        63,
        50,
        116.8,
        63,
        0,
        116.8,
        570,
        0,
        116.8,
        570,
        50,
        116.8,
        63,
        50,
        116.8,
      ]);
      //  lGeometry.setColors([color.r,color.g,color.b,color.r,color.g,color.b,color.r,color.g,color.b,color.r,color.g,color.b])
      const plane = new THREE.Mesh(geometry, material);
      let matLine = new LineMaterial({
        linewidth: 5, // in pixels
        //  vertexColors: true,
        //resolution:  // to be set by renderer, eventually
        dashed: false,
      });
      matLine.color = color;

      let line = new Line2(lGeometry, matLine);
      line.computeLineDistances();

      //   scene2.add(line);
      console.log(line);
      //  plane.rotateX(-Math.PI/2)
      console.log(plane.geometry);
      plane.position.set(316.5, 50, 116.8);
      scene2.add(plane);
      plane.renderOrder = 6;

      matLine.resolution.set(window.innerWidth, window.innerHeight);
    }
    //  createShape();

    function createWalls() {
      house26.walls.forEach((wall: any) => {
        let { size, position } = wall;
        createBox(size.x, size.y, size.z, position.x, position.y, position.z);
      });
      house26.blocks.forEach((block: any) => {
        let { geos, height } = block;
        createBlock(geos, height);
      });
      scene2.add(house26.wallsObject);
      scene2.add(house26.blockObject);
    }
    function render() {
      renderer.render(sceneNow, camera);
      console.log(renderer)
    }
    function initLight() {
      const dirLight1 = new THREE.DirectionalLight(0xffffff);
      dirLight1.position.set(0, -50, 0);
      scene2.add(dirLight1);
      const ambientLight = new THREE.AmbientLight(0x222222);
      scene2.add(ambientLight);
      const light = new THREE.HemisphereLight(0xffffbb, 0x444444, 1);
      light.position.set(-10, 50, -10);
      scene2.add(light);
    }
    const setdModel = () => {
      const dracoLoader = new DRACOLoader();
      const gltfloader = new GLTFLoader();
      dracoLoader.setDecoderPath("bigScreen/robot/draco/");
      dracoLoader.setDecoderConfig({ type: "js" });
      dracoLoader.preload();
      gltfloader.setDRACOLoader(dracoLoader);
    };
    const setRobotModel = () => {
      //const loader = new OBJLoader();
      new MTLLoader().load("robot/untitled.mtl", (materials) => {
        materials.preload();
        //  console.log(robotHistoryData);
        new OBJLoader()
          .setMaterials(materials)
          .load("robot/untitled.obj", (obj) => {
            console.log(obj);
            robotModel = obj;
            obj.renderOrder = 8;

            let angles = [2.94214979679245, -3.078996825218302];
            //168.5727660514802，-176.41352321918833
            obj.position.set(-120, 1, -50);
            let sprite = setRobotSprite();
            sprite.parent = obj;
            obj.children.push(sprite);
            let radian = _this.AngleToRadian(180);
            //
            let timedif = (1618034150897 - 1618034149896) / 1000;
            console.log(radian);
            obj.rotateY(2.94214979679245);
            //   console.log(-geo[0], 1, geo[1]);
            let bbox = new THREE.Box3().setFromObject(obj);
            let x = bbox.max.x - bbox.min.x;
            let y = bbox.max.y - bbox.min.y;
            let z = bbox.max.z - bbox.min.z;
            console.log(obj);
            scene2.add(obj);
            const helper = new THREE.Box3Helper(
              bbox,
              new THREE.Color(0xffff00)
            );
            scene2.add(helper);

            //  scene2.add(sprite);
            let geos = [
              -718.7387977677266,
              -1,
              -242.5958072000721,
              -120,
              1,
              -250,
              -120,
              1,
              -50,
            ];
            // let geos = [

            // ]
            //    let timeDif = (robotHistoryData[1].updateTime - robotHistoryData[0].updateTime)/1000

            // setTimeout(() => {

            // }, 4000);

            window.addEventListener("click", function abc(event) {
              mouseclick(event, obj, abc);
            });
          });
      });
    };
    const setRobotSprite = () => {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
        ctx.font = "Bold 14px Arial";
        let word = "namename";
        let distance = 2;
        ctx.fillText(word, distance, 14 + 2);
      }

      var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.center = new THREE.Vector2(0, 0);
      sprite.position.set(0, 150, 0);
      sprite.scale.set(40, 20, 1);
      return sprite;
    };
    function robotAnimation(object: any) {
      let geo = [
        -718.7387977677266,
        70,
        -242.5958072000721,
        -120,
        70,
        -250,
        -120,
        70,
        -50,
      ];
      let geos = [
        -718.7387977677266,
        -1,
        -242.5958072000721,
        -120,
        -1,
        -250,
        -120,
        -1,
        -50,
      ];
      const positionKF = new THREE.VectorKeyframeTrack(
        ".position",
        [0, 10, 20],
        geos
      );
      const capositionKF = new THREE.VectorKeyframeTrack(
        ".position",
        [0, 10, 20],
        geo
      );

      const colorKF = new THREE.ColorKeyframeTrack(
        ".material.color",
        [0, 1, 2],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        THREE.InterpolateDiscrete
      );
      const yAxis = new THREE.Vector3(0, 1, 0);
      // const qInitial = new THREE.Quaternion().setFromAxisAngle(
      //   yAxis,
      //   angles[0]
      // );
      //  const qFinal = new THREE.Quaternion().setFromAxisAngle(yAxis, angles[1]);
      // const quaternionKF = new THREE.QuaternionKeyframeTrack(
      //   ".quaternion",
      //   [0, 1, 2],
      //   [
      //     qInitial.x,
      //     qInitial.y,
      //     qInitial.z,
      //     qInitial.w,
      //     qFinal.x,
      //     qFinal.y,
      //     qFinal.z,
      //     qFinal.w,
      //     qInitial.x,
      //     qInitial.y,
      //     qInitial.z,
      //     qInitial.w,
      //   ]
      // );
      const clip = new THREE.AnimationClip("Action", -1, [
        //      quaternionKF,
        positionKF,
      ]);
      const camClip = new THREE.AnimationClip("Action", -1, [capositionKF]);

      // setup the THREE.AnimationMixer
      mixer = new THREE.AnimationMixer(object);
      camMixer = new THREE.AnimationMixer(camera);
      // create a ClipAction and set it to play
      const clipAction = mixer.clipAction(clip);
      const camClipAction = camMixer.clipAction(camClip);
      clipAction.loop = THREE.LoopOnce;
      clipAction.clampWhenFinished = true;
      clipAction.play();
      camClipAction.loop = THREE.LoopOnce;
      camClipAction.clampWhenFinished = true;
      camClipAction.play();
    }

    function moveRobotLine() {
      const material = new MeshLineMaterial({
        //  map: texture,
        color: new THREE.Color(0x4f463),
        useMap: false,
        lineWidth: 18,
        sizeAttenuation: true,
        transparent: true,
        //   near: camera.near,
        //   far: camera.far,
        // dashArray: 0.8, // 破折号之间的长度和间距。(0 -无破折号)
        // dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
        //dashOffset: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const points = [];
      points.push(
        new THREE.Vector3(-718.7387977677266, -1, -242.59580720007216)
      );
      points.push(new THREE.Vector3(-120, 1, -250));
      points.push(new THREE.Vector3(-120, 1, -50));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const meshLine = new MeshLine();
      meshLine.setPoints(points);
      const line = new THREE.Mesh(meshLine.geometry, material);
      console.log(line);
      let matLine = new LineMaterial({
        color: 0x4f463,
        linewidth: 15, // in pixels
        dashed: false,
      });
      matLine.resolution.set(window.innerWidth, window.innerHeight);
      const lGeometry = new LineGeometry();
      lGeometry.setPositions([
        -718.7387977677266,
        -1,
        -242.5958072000721,
        -120,
        1,
        -250,
        -120,
        1,
        -50,
      ]);

      let line2 = new Line2(lGeometry, matLine);
      line2.computeLineDistances();
      line2.scale.set(1, 1, 1);
      scene2.add(line2);
    }
    moveRobotLine();
    function mouseclick(event: any, obj: any, callback: any) {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      let geox = obj.position.x;
      let geoz = obj.position.z;
      let posx = geox - 18 * Math.cos(-0.029946280723348373);
      let posz = geoz + 18 * Math.sin(-0.029946280723348373);
      let lookatx = geox - 100 * Math.cos(-0.029946280723348373);
      let lookatz = geoz + 100 * Math.sin(-0.029946280723348373);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersect = raycaster.intersectObjects(obj.children);
      if (intersect.length > 0) {
        window.removeEventListener("click", callback);
        //console.log(geox, geoz, lookatx, lookatz);
        //   camera.position.set(posx, 80, posz + 10);
        robotAnimation(obj);

        //controls.target.set(lookatx, 10, lookatz);
     //   firstPersonView();
         pointerlockView()
        //   camera.lookAt(scene2.position)
      } else {
      }
    }
    const firstPersonView = () => {
      const time = performance.now();
      console.log("firstPersonView");
      controls.dispose()
      controls = new FirstPersonControls(camera, renderer.domElement);
      controls.dragToLook = true;
      controls.movementSpeed = 150;
   //   controls.lookSpeed = 0.1;
      const clock = new THREE.Clock();
      const animateControls = () => {
        requestAnimationFrame(animateControls);
           controls.update( clock.getDelta() )
      };
        animateControls();
    };
    const pointerlockView = () => {
      const time = performance.now();
      console.log("firstPersonView");
      controls = new PointerLockControls(camera, renderer.domElement);
      controls.lock();
      controls.movementSpeed = 150;
      controls.lookSpeed = 0.1;
      const clock = new THREE.Clock();
      const animateControls = () => {
        requestAnimationFrame(animateControls);
        //   controls.update( clock.getDelta() )
      };
      //  animateControls();
    };

    //x: -718.7387977677266, y: 1, z: -242.59580720007216

    //point1  x:-100  y = 1  z = -100

    const clock = new THREE.Clock();
    const move = () => {
      requestAnimationFrame(move);
      const delta = clock.getDelta();
      if (mixer) {
        //console.log(delta)
        mixer.update(delta);

        let geo = robotModel.position;
        if (controls.isLocked) {
          camera.position.set(geo.x, geo.y + 100, geo.z);
        }

        // camMixer.update(delta)
      }

      //  renderer.render( scene, camera );
    };
    move();
    function loadmove() {
      let curve;
      const l: any = [];
      const pointList = [
        [-20, 5, -10],
        [30, 5, -15],
        [10, 5, 20],
        [40, 5, 40],
      ];
      pointList.forEach((e) => l.push(new THREE.Vector3(e[0], e[1], e[2])));
      curve = new THREE.CatmullRomCurve3(l); // 曲线路径
      const tubeGeometry = new THREE.TubeGeometry(curve, 50, 1, 8);
      let texture = new THREE.TextureLoader().load("texture/gline.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
      texture.needsUpdate = true;
      texture.repeat.set(1, 1);
      texture.offset.set(0.2, 0.5);
      // texture.matrixAutoUpdate = true
      console.log(texture);
      const path = [
        [-110, -50, 0],
        [50, 50, 50],
        [10, -50, 10],
        [50, 100, 100],
        [50, 100, 111],
      ];
    }

    loadmove();
    render();
    initLight();
    // initLigh2();
    createFloor();
    createWalls();
    setRobotModel();
    scene2.add(new THREE.AxesHelper(200));
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
