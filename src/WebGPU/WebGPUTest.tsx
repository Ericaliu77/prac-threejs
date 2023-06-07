import React, { Fragment, useCallback, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import WebGPU from 'three/examples/jsm/capabilities/WebGPU';
import WebGPURenderer from './models/WebGPURenderer.js';
import css from './index.less';
// import { viewportSharedTexture } from "three/examples/jsm/nodes/display/ViewportSharedTextureNode"
import { checker, color, float, MeshStandardNodeMaterial, oscSine, toneMapping, uv, vec3, viewportTopLeft } from "three/examples/jsm/nodes/Nodes";

let scene: any;
let camera: any;
let renderer: any;
let controls: any;
let portals: any;
let rotate = true;
const clock = new THREE.Clock();

const WebGPUTest = () => {

  const init = async () => {
    // if (WebGPU.isAvailable() === false) {

    //   document.body.appendChild(WebGPU.getErrorMessage());

    //   throw new Error('No WebGPU support');

    // }

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 0, -300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(renderer.domElement);

    renderer = await new WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    // renderer.toneMappingNode = toneMapping(THREE.LinearToneMapping, .15, 0xffffff);


    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    scene.background = new THREE.Color('lightblue');
    const light = new THREE.SpotLight(0xffffff, 1);
    light.power = 2000;
    camera.add(light);
    controls = new OrbitControls(camera, renderer.domElement);
    document
      .getElementById("scene-container2")
      ?.appendChild(renderer.domElement);

  };

  const loadGeometry = () => {
    // addBackdropSphere(viewportSharedTexture().bgr.hue(oscSine().mul(Math.PI)));
    // addBackdropSphere(viewportSharedTexture().rgb.oneMinus());
    // addBackdropSphere(viewportSharedTexture().rgb.saturation(0));
    // addBackdropSphere(viewportSharedTexture().rgb.saturation(10), oscSine());
    // addBackdropSphere(viewportSharedTexture().rgb.overlay(checker(uv().mul(10))));
    // addBackdropSphere(viewportSharedTexture(viewportTopLeft.mul(40).floor().div(40)));
    // addBackdropSphere(viewportSharedTexture(viewportTopLeft.mul(80).floor().div(80)).add(color(0x0033ff)));
    addBackdropSphere(vec3(0, 0, viewportSharedTexture().b));
  }
  function addBackdropSphere(backdropNode: any, backdropAlphaNode = null) {
    const geometry = new THREE.SphereGeometry(.3, 32, 16);

    portals = new THREE.Group();
    scene.add(portals);
    const distance = 1;
    const id = portals.children.length;
    const rotation = THREE.MathUtils.degToRad(id * 45);

    const material = new MeshStandardNodeMaterial({ color: 0x0066ff });
    material.roughnessNode = float(.2);
    material.metalnessNode = float(0);
    // material.backdropNode = backdropNode;
    material.backdropAlphaNode = backdropAlphaNode;
    material.transparent = true;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.cos(rotation) * distance,
      1,
      Math.sin(rotation) * distance
    );

    portals.add(mesh);

  }


  /* 窗口变动触发 */
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }


  const animate = useCallback(() => {
    // requestAnimationFrame(animate);
    // renderer.render(scene, camera);

    const delta = clock.getDelta();

    // if ( mixer ) mixer.update( delta );

    // if (rotate) portals.rotation.y += delta * 0.5;

    renderer.render(scene, camera);
  }, [])

  useEffect(() => {
    init();
    // loadGeometry()
    // animate();
  }, [])
  return (
    <Fragment>
      <div id="scene-container2" className={css["scene-container"]}></div>
    </Fragment>
  );

}


export default WebGPUTest;
