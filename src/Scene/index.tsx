import React, { Component, Fragment } from "react";
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {loadWankeInside,testFatLine,loadSmoke,loadIndoor,testShaderMaterial} from './pages/index'
import {showRobot} from './showRobot'
import css from './index.less'

let renderer: any;
let camera: any;
let sceneNow: any;
let controls: any;
let stats = Stats()

class Scene extends Component {
    componentDidMount() {
        this.init();
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

        controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
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
   //     controls.maxPolarAngle = Math.PI / 2;
        document
            .getElementById("scene-container")
            ?.appendChild(renderer.domElement);
        document
            .getElementById("scene-container")
            ?.appendChild(stats.domElement);
        sceneNow = loadSmoke(renderer, camera)
    // sceneNow = testShaderMaterial(renderer,camera,controls)
        this.animate();
    }
    animate = () => {
        requestAnimationFrame(this.animate);

        stats.update()
        //  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        renderer.render(sceneNow, camera);
 
        //console.log(sceneCss)
        window.addEventListener("resize", this.onWindowResize);
    };
    onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    cameraAuto() {
        // console.log("11111111");
        // const _this = this;
        // let t0 = new Date().getTime();
        // console.log(controls);
        // // controls.autoRotateSpeed = 0.1;
        // controls.autoRotate = true;
        // controls.update();

        // function animatecamera() {
        //   controls.update();

        //   //let radian = _this.AngleToRadian(10);
        //   camera.rotateY(1);

        //   camera.lookAt(scene.position);
        //   console.log(camera.lookAt);
        //   renderer.render(scene, camera);
        //   // requestAnimationFrame(animatecamera);
        //   controls.target = new THREE.Vector3(0, -100, 0);
        // }

        // animatecamera()
    }
    cameraStop() {
        controls.autoRotate = false;
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
