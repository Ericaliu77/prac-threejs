import * as THREE from "three";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "../reCode/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { FirstPersonControls } from "../FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
const MeshLineMaterial = require("three.meshline").MeshLineMaterial;
const MeshLine = require("three.meshline").MeshLine;

export default function loadWankeInside(renderer: any, camera: any, controls: any) {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x272727);
  
    let robotModel: any
    let floorWidth = 3000;
    let floorHeight = 2000;
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
        const object = createElevator()
        scene.add(object)
        scene.add(groundPlane);
      }
      function AngleToRadian(angle: any) {
        const radian = angle * (Math.PI / 180);
        return radian;
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
         lGeometry.setColors([color.r,color.g,color.b,color.r,color.g,color.b,color.r,color.g,color.b,color.r,color.g,color.b])
        const plane = new THREE.Mesh(geometry, material);
        let matLine = new LineMaterial({
          color: 0xffffff,
              linewidth: 5, // in world units with size attenuation, pixels otherwise
              vertexColors: true,
              //resolution:  // to be set by renderer, eventually
              dashed: false,
              worldUnits: true
        });
       // matLine.color = color;
  
        let line = new Line2(lGeometry, matLine);
        line.computeLineDistances();
        line.scale.set( 1, 1, 1 );
        //   scene.add(line);
        console.log(line);
        //  plane.rotateX(-Math.PI/2)
        console.log(plane.geometry);
        plane.position.set(316.5, 50, 116.8);
        scene.add(plane);
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
        scene.add(house26.wallsObject);
        scene.add(house26.blockObject);
      }
      function loadFloorModel(){
        const loader = new GLTFLoader();
        loader.load("robot/floor27.gltf", (gltf) => {
            gltf.scene.position.set(0,200,0)
        //    gltf.scene.scale.set(10,10,10)
            scene.add(gltf.scene)
            console.log(gltf.scene)
        })
      }
 
      function initLight() {
        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(0, -50, 0);
        scene.add(dirLight1);
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);
        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        light.position.set(-10, 50, -10);
        scene.add(light);
      }
    
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
              let radian = AngleToRadian(180);
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
              scene.add(obj);
              const helper = new THREE.Box3Helper(
                bbox,
                new THREE.Color(0xffff00)
              );
              scene.add(helper);
  
              //  scene.add(sprite);
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
  
              window.addEventListener("pointerup", function abc(event) {
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
      function createElevator() {
        const cubeGeometry = new THREE.BoxGeometry(31.02 * 2, 600, 40.11 * 2)
        const params = {
          color: 0x77fbd1,
          transmission: 0.2,
          envMapIntensity: 1,
          lightIntensity: 1,
          exposure: 1,
        }
        const material1 = new THREE.MeshPhysicalMaterial({
          color:0xededed,
          metalness: 0,
          roughness: 0,
          //  alphaMap: texture,
          alphaTest: 0.3,
          depthWrite: false,
          transmission: params.transmission, // use material.transmission for glass materials
          opacity: 0.44, // set material.opacity to 1 when material.transmission is non-zero
          transparent: true,
          side: THREE.FrontSide,
        })
    
        const material = new THREE.MeshPhongMaterial({
          //  map: texture1,
          color: 0xe6f7fa,
          emissive: 0xe6f7fa,
          emissiveIntensity: 0.4,
           side:THREE.DoubleSide,
          transparent: true,
          opacity: 0.72,
      //    alphaTest: 0.1,
        })
        const cube = new THREE.Mesh(cubeGeometry, material1)
        cube.position.set(-6.66 * 2, 300, 46.045 * 2)
    
        return cube
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
        scene.add(line2);
      }
  //    moveRobotLine();
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
          window.removeEventListener("pointerup", callback);
          //console.log(geox, geoz, lookatx, lookatz);
          //   camera.position.set(posx, 80, posz + 10);
          robotAnimation(obj);
        //  _this.setSceneCss()
          controls.target.set(lookatx, 10, lookatz);
       //   firstPersonView();
        //   pointerlockView()
        //    setTimeout(()=>{
        //      document .getElementById("scene-container")?.removeChild(rendererCss.domElement);
        //    },5000)
          //   camera.lookAt(scene.position)
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
   //  move();
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
      function calOrigin(){
        let point1 = [ -1.276746845741381, 0.6019565636577489]
        let point1L = [ 34.075723563979594,117.61593727509205]
        let point2 = [ 14.445212091000256,-1.6348778238585249,]
        let point2L = [34.075723251997154,117.61592311761811]
        const dis1 = Math.sqrt((point1[0]-point2[0])*(point1[0]-point2[0])+(point1[1]-point2[1])*(point1[1]-point2[1]))
      }
      function init(){
        loadFloorModel()
       //    loadmove();
     initLight();
    createFloor();
     createWalls();
     setRobotModel();
      }
    init()
     scene.add(new THREE.AxesHelper(200));
      return scene
}
