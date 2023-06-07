import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const clock = new THREE.Clock();
export default function testShadow({renderer,camera}){

        let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x272727);
    scene.add(new THREE.AxesHelper(200));

        function loadDeviceModel() {
             const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('robot/draco/')
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.preload();
        const gltfloader = new GLTFLoader();
        gltfloader.setDRACOLoader(dracoLoader);
        const url = 'model/QD6003.gltf';
        gltfloader.load(url, (gltf) => {
            gltf.scene.position.set(0, 0, 0);
            gltf.scene.scale.set(0.1, 0.1, 0.1);
gltf.scene.traverse((mesh)=>{
    mesh.castShadow = true;

})
            scene.add(gltf.scene)

        })
        }
        function loadObject(){
            let geometry = new THREE.TorusKnotGeometry( 25, 8, 75, 20 );
				let material = new THREE.MeshPhongMaterial( {
					color: 0xff0000,
					shininess: 150,
					specular: 0x222222
				} );

				const torusKnot = new THREE.Mesh( geometry, material );
				torusKnot.scale.multiplyScalar( 1 / 18 );
				torusKnot.position.y = 3;
				torusKnot.castShadow = true;
				torusKnot.receiveShadow = true;
				scene.add( torusKnot );
        }
     function initLight() {
        scene.add( new THREE.AmbientLight( 0x404040 ) );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      const   spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.name = 'Spot Light';
        spotLight.angle = Math.PI / 5;
        spotLight.penumbra = 0.3;
        spotLight.position.set( 50, 50, 5 );
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 8;
        spotLight.shadow.camera.far = 300;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        // scene.add( spotLight );

        // scene.add( new THREE.CameraHelper( spotLight.shadow.camera ) );

        const  dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.name = 'Dir. Light';
        dirLight.position.set( 50, 50, 50 );
        dirLight.castShadow = true;
        // dirLight.shadow.blurSamples = 20
        // dirLight.shadow.radius = 20

        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 300;
        dirLight.shadow.camera.right = 15;
        dirLight.shadow.camera.left = - 15;
        dirLight.shadow.camera.top	= 15;
        dirLight.shadow.camera.bottom = - 15;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add( dirLight );
        scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

     }
     function loadGround(){
      const  material = new THREE.MeshPhongMaterial( {
            color: 0xa0adaf,
            shininess: 150,
            specular: 0x111111
        } );
      const  geometry = new THREE.BoxGeometry( 100, 0.15, 100 );

        const ground = new THREE.Mesh( geometry, material );
        ground.scale.multiplyScalar( 3 );
        ground.castShadow = false;
        ground.receiveShadow = true;
        scene.add( ground );
     }
     const test =()=>{
      const curve = new THREE.QuadraticBezierCurve(
      //  new THREE.Vector2( -10, 0 ),
      // new THREE.Vector2( 20, 15 ),
      // new THREE.Vector2( 10, 0 )
      {x: 597.4761102069284, y: -86.18181818181802},
      {x: 51.12569814278958, y: 34.94013401275921},
      {x: 597.4761102069284, y: 3.81818181818187}
      );
      const points = curve.getPoints( 50 );
        const point1 = curve.getPoint(0.25)
        const point2 = curve.getPoint(0.75)

        console.log(point1,point2)
        const gbox = new THREE.BoxGeometry( 1, 1, 1 ); 
        const mabox = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const cube1 = new THREE.Mesh( gbox, mabox ); 
        const cube2 = new THREE.Mesh( gbox, mabox ); 

        cube1.position.set(point1.x,point1.y,0)
        cube2.position.set(point2.x,point2.y,0)

        scene.add( cube1 );
        scene.add( cube2 );

      const geometry = new THREE.BufferGeometry().setFromPoints( points );

      const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
      
      // Create the final object to add to the scene
      const curveObject = new THREE.Line( geometry, material );
      scene.add(curveObject)
     }
loadGround()
loadObject()
        initLight();
    loadDeviceModel()
    test();
    return scene;
}