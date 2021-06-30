/* smoke.js */
import * as THREE from "three";
import {ParticleEngine} from '../reCode/ParticleEngine'
import {Tween} from '../reCode/Tween'
import {ParticleEngineExamples} from '../reCode/ParticleEngineExamples'
export default function loadSmoke(renderer: any, camera: any) {
 
  const smokeParticles: any = [];
  const clock = new THREE.Clock();
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x272727);
  scene.add(new THREE.AxesHelper(1200));

  const meshGeometry = new THREE.BoxGeometry(200, 200, 200);
  const meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xaa6666,
    wireframe: false
  });
  const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
const engine = new ParticleEngine()
  let cubeSineDriver = 0;
  init();
  function init() {
    initLight()
    initGround()
 
     initSmoke()
     animate()
  }
  function initLight() {
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);
  }
  function initGround() {
    // FLOOR
    var floorTexture = new THREE.TextureLoader().load('texture/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, map: floorTexture, side: THREE.DoubleSide });
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -10.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.BoxGeometry(4000, 4000, 4000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

  }

  function initSmoke(){
     const texture = new THREE.TextureLoader().load('texture/smokeparticle.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
    engine.setValues(ParticleEngineExamples.smoke)
    console.log(texture)
    engine.initialize(scene);
  }
 function animate(){
   requestAnimationFrame(animate)
   var dt = clock.getDelta();
   engine.update( dt * 0.5 );	
 }
  return scene
}

