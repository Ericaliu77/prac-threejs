import React, { Component, Fragment } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
const MeshLine = require("three.meshline").MeshLine;
const MeshLineMaterial = require("three.meshline").MeshLineMaterial;
const MeshLineRaycast = require("three.meshline").MeshLineRaycast;
const css = require("./index.less");
let scene: any;
let camera: any;
let renderer: any;
let controls: any;
let guiControls: any;
var texture_left: any;
var texture_up: any;
let texture:any
class AnimateLine extends Component {
  componentDidMount() {
    //    this.initThree();
    this.init();
    this.initContent();
    this.animate();
    this.loadmove()
    // this.initScene2();
  }
  init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 0, -300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x0c0c0c));

    var spotLight1 = new THREE.SpotLight(0xffffff);
    spotLight1.position.set(-400, -400, -400);

    var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(400, 400, 400);

    scene.add(spotLight1);
    scene.add(spotLight2);
    controls = new OrbitControls(camera, renderer.domElement);
    document
      .getElementById("scene-container2")
      ?.appendChild(renderer.domElement);
   
  };

  initContent=()=> {
    
    texture_left = new THREE.TextureLoader().load("./texture/gline.png");
    texture_up = new THREE.TextureLoader().load("./texture/arrow-up.png");

    texture_left.wrapS = THREE.RepeatWrapping;
    texture_left.wrapT = THREE.RepeatWrapping;

    texture_up.wrapS = THREE.RepeatWrapping;
    texture_up.wrapT = THREE.RepeatWrapping;

    texture_left.repeat.x = 1;
    texture_left.repeat.y = 1;

    texture_up.repeat.x = 20;
    texture_up.repeat.y = 2;

    var planeGeometry = new THREE.PlaneGeometry(400, 1);
    var planeGeometry1 = new THREE.PlaneGeometry(400, 20);
    var plane_left = new THREE.MeshBasicMaterial({
        map : texture_left,
        transparent:true,
        side :THREE.DoubleSide
    });
  //  plane_left.color = new THREE.Color(0x00ff00);
    
  //  plane_left.side = THREE.DoubleSide;

    var plane_up = new THREE.MeshBasicMaterial();
    plane_up.color = new THREE.Color(0x00ff00);
    plane_up.map = texture_up;
    plane_up.transparent = true;
    plane_up.side = THREE.DoubleSide;

    let _plane_left = new THREE.Mesh(planeGeometry, plane_left);
    _plane_left.translateY(10);
    scene.add(_plane_left);

    let _plane_up = new THREE.Mesh(planeGeometry1, plane_up);
    _plane_up.translateY(-10);
    scene.add(_plane_up);
   

    //this.removeLoading();
  }
   loadmove=()=> {
    let curve;
    const l:any = [];
    const pointList = [
      [-20, 5, -10],
      [30, 5, -15],
      [10, 5, 20],
      [40, 5, 40],
    ];
    pointList.forEach((e) =>
      l.push(new THREE.Vector3(e[0], e[1], e[2]))
    );
    curve = new THREE.CatmullRomCurve3(l) // 曲线路径
    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      5,
      1,
      8
    );
    texture = new THREE.TextureLoader().load("texture/gline.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
    texture.needsUpdate = true;
    texture.repeat.set(1, 1);
    texture.offset.set(0.2,0.5);
    console.log(texture)
    // const material = new MeshLineMaterial({
    //   map: texture,
    //   useMap: true,
    //   lineWidth: 2,
    //   sizeAttenuation: true,
    //   transparent: true,
     
    //   // dashArray: 0.8, // 破折号之间的长度和间距。(0 -无破折号)
    //   // dashRatio: 0.5, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
    //   dashOffset: 0,
    //   blending: THREE.AdditiveBlending,
    // });

    const  materia4 = new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide,transparent:true})
    let mesh =  new THREE.Mesh(tubeGeometry, materia4);
    scene.add(mesh)
    setInterval(() => {
      texture.offset.x -= 0.0076;
      console.log(texture.offset)
    }, 100);
  }

  /* 移除加载元素 */

  /* 窗口变动触发 */
  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /* 数据更新 */
  update() {
    //   stats.update();
   // controls.update();

    // 设置纹理偏移
    console.log(texture_left)
    if (texture_left) {
      texture_left.offset.x -= 0.02;
      texture_up.offset.y -= 0.02;
    }
    if(texture){
        texture.offset.x -= 0.02;
    }
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    renderer.render(scene, camera);
    this.update();
  };

  render() {
    return (
      <Fragment>
        <div id="scene-container2" className={css["scene-container"]}></div>
      </Fragment>
    );
  }
}
export default AnimateLine;
