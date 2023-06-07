// import * as THREE from "three";
// import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
// import { LineMaterial } from "../reCode/LineMaterial"
// import { Line2 } from "three/examples/jsm/lines/Line2.js";
// import { GeometryUtils } from 'three/examples/jsm/utils/GeometryUtils.js'
// import { AxesHelper, DoubleSide, LoaderUtils } from "three";
// import { EdgesGeometry, LineBasicMaterial, LineSegments } from "three";

// export default function testFatLine(renderer: any, camera: any, controls: any) {
//     let scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x272727);
//     let floorWidth = 3000;
//     let fL: any
//     let floorHeight = 2000;
//     function createLine(){
//         var positions = [];
//         var colors = [];

//         var points = GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );

// 				var spline = new THREE.CatmullRomCurve3( points );
// 				var divisions = Math.round( 12 * points.length );
// 				var color = new THREE.Color();

// 				for ( var i = 0, l = divisions; i < l; i ++ ) {

// 					var point = spline.getPoint( i / l );
// 					positions.push( point.x, point.y, point.z );

// 					color.setHSL( i / l, 1.0, 0.5 );
// 					colors.push( color.r, color.g, color.b );

// 				}


// 				// Line2 ( LineGeometry, LineMaterial )

// 				var geometry = new LineGeometry();
// 				geometry.setPositions( positions );
// 		//		geometry.setColors( colors );

// 				const matLine = new LineMaterial( {
// 					color: 0x15e298,
// 					linewidth: 10, // in world units with size attenuation, pixels otherwise
// 					vertexColors:false,
// 					//resolution:  // to be set by renderer, eventually
// 					dashed: false,
// 					worldUnits: true

// 				} );

// 			const	line = new Line2( geometry, matLine );
// 				line.computeLineDistances();
// 				line.scale.set( 1, 1, 1 );
// 				scene.add( line );
       
//        const animate=()=>{
//         requestAnimationFrame(animate)
//         matLine.resolution.set(window.innerWidth, window.innerHeight);
//         }
//        animate()
//     }

   
//     function createFloor() {
//         const loader = new THREE.TextureLoader();
//         let gMap = loader.load("./texture/point.png");
//         gMap.wrapS = THREE.RepeatWrapping;
//         gMap.wrapT = THREE.RepeatWrapping;
//         gMap.repeat.set(120, 80);
//         let groundPlane;
//         let boxProjectedMat = new THREE.MeshBasicMaterial({
//           color: 0xffffff,
//           map: gMap,
//         });
//         boxProjectedMat.transparent = true;
//         //      boxProjectedMat.opacity = 0.5
//         groundPlane = new THREE.Mesh(
//           new THREE.PlaneGeometry(floorWidth, floorHeight),
//           boxProjectedMat
//         );
//         groundPlane.rotateX(-Math.PI / 2);
//         groundPlane.position.set(0, -2, 0);
//         scene.add(groundPlane);
       
//       }
//       const initLight = () => {
//         const dirLight1 = new THREE.DirectionalLight(0xffffff)
//         dirLight1.position.set(0, -50, 0)
//         scene.add(dirLight1)
//         const ambientLight = new THREE.AmbientLight(0x222222)
//         scene.add(ambientLight)
//         const light = new THREE.HemisphereLight(0xd9d9d9, 0x444444, 0.92)
//         light.position.set(-10, 50, -10)
//         scene.add(light)
//       }
//       function drawCleanArea(){
//         const clear_area_polygon = [
//           [10,20],
//           [30,0],
//           [30,10],
//           [45,30],
//           [45,40],
//           [10,40]
//         ]
//         const shape = new THREE.Shape()
//         clear_area_polygon.forEach((geo: any,index: any)=>{
//           if(index === 0){
//             shape.moveTo(-geo[0],geo[1])
//           }else{
//             shape.lineTo(-geo[0],geo[1])
//           }
//         })
//         const geometry = new THREE.ShapeGeometry(shape)
//         const material = new THREE.MeshBasicMaterial({color:0x00ff00,side:DoubleSide})
//         const mesh = new THREE.Mesh(geometry,material)
//         mesh.position.set(0,1,0)
//         mesh.rotateX(Math.PI/2)
//         scene.add(mesh)
//       }
//      function init(){
//       scene.add(new THREE.AxesHelper(200));
//          initLight()
//          createFloor()  
//        //  createLine()
//          drawCleanArea()
//       }
//       init()
      
      
//       return scene;
// }