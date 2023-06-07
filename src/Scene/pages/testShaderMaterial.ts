// import * as THREE from "three";
// // import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils'

// export default function testShaderMaterial(renderer: any, camera: any,controls: any) {
//     const scene = new THREE.Scene();
//     const radius = 100, segments = 68, rings = 38;
//     let length1 :any
//     let sphere : any
//     const vertexShader = 
//         "attribute float size;"+
//         "attribute vec3 ca;"+
//         "varying vec3 vColor;"+
//         "void main() {"+
//         "vColor = ca;"+
//         "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );"+
//         "gl_PointSize = size * ( 300.0 / -mvPosition.z );"+
//         "gl_Position = projectionMatrix * mvPosition;"+
//         "}"
//     const fragmentShader = 
//         "uniform vec3 color;"+
//         "uniform sampler2D pointTexture;"+
//         "varying vec3 vColor;"+
//         "void main() {"+
//         "vec4 color = vec4( color * vColor, 1.0 ) * texture2D( pointTexture, gl_PointCoord );"+
//         "gl_FragColor = color;"+
//         "}"
//     init()
//     animate()
//     function init(){
//         let sphereGeometry = new THREE.SphereGeometry( radius, segments, rings );
//         let boxGeometry = new THREE.BoxGeometry( 0.8 * radius, 0.8 * radius, 0.8 * radius, 10, 10, 10 );
//         sphereGeometry.deleteAttribute( 'normal' );
//         sphereGeometry.deleteAttribute( 'uv' );

//         boxGeometry.deleteAttribute( 'normal' );
//         boxGeometry.deleteAttribute( 'uv' );

//         // sphereGeometry = BufferGeometryUtils.mergeVertices( sphereGeometry );
//         // boxGeometry = BufferGeometryUtils.mergeVertices( boxGeometry );

//         // const combinedGeometry = BufferGeometryUtils.mergeBufferGeometries( [ sphereGeometry, boxGeometry ] );
//      //   const positionAttribute = combinedGeometry.getAttribute( 'position' );

//         let colors : any = [];
//         const sizes = [];

//         const color = new THREE.Color();
//         const vertex = new THREE.Vector3();

//         length1 = sphereGeometry.getAttribute( 'position' ).count;

//         for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {

//             vertex.fromBufferAttribute( positionAttribute, i );

//             if ( i < length1 ) {

//                 color.setHSL( 0.01 + 0.1 * ( i / length1 ), 0.99, ( vertex.y + radius ) / ( 4 * radius ) );

//             } else {

//                 color.setHSL( 0.6, 0.75, 0.25 + vertex.y / ( 2 * radius ) );

//             }

//             color.toArray( colors, i * 3 );

//             sizes[ i ] = i < length1 ? 10 : 40;

//         }

//         const geometry = new THREE.BufferGeometry();
//         geometry.setAttribute( 'position', positionAttribute );
//         geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
//         geometry.setAttribute( 'ca', new THREE.Float32BufferAttribute( colors, 3 ) );
//         console.log(geometry)
//         console.log(positionAttribute)
//         console.log(new THREE.Float32BufferAttribute( colors, 3 ),colors)

//         const texture = new THREE.TextureLoader().load( 'texture/disc.png' );
//         texture.wrapS = THREE.RepeatWrapping;
//         texture.wrapT = THREE.RepeatWrapping;

//         const material = new THREE.ShaderMaterial( {

//             uniforms: {
//                 color: { value: new THREE.Color( 0xffffff ) },
//                 pointTexture: { value: texture }
//             },
//             vertexShader: vertexShader,
//             fragmentShader: fragmentShader,
//             transparent: true
//         } );

//         //

//         sphere = new THREE.Points( geometry, material );
//         console.log(sphere)
//         scene.add( sphere );
//     }
//     function sortPoints() {

//         const vector = new THREE.Vector3();

//         const matrix = new THREE.Matrix4();
//         matrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
//         matrix.multiply( sphere.matrixWorld );

//         //

//         const geometry = sphere.geometry;

//         let index = geometry.getIndex();
//         const positions = geometry.getAttribute( 'position' ).array;
//         const length = positions.length / 3;

//         if ( index === null ) {

//             const array = new Uint16Array( length );

//             for ( let i = 0; i < length; i ++ ) {

//                 array[ i ] = i;

//             }

//             index = new THREE.BufferAttribute( array, 1 );

//             geometry.setIndex( index );

//         }

//         const sortArray = [];

//         for ( let i = 0; i < length; i ++ ) {

//             vector.fromArray( positions, i * 3 );
//             vector.applyMatrix4( matrix );
//             sortArray.push( [ vector.z, i ] );

//         }

//         function numericalSort( a: any, b: any ) {

//             return b[ 0 ] - a[ 0 ];

//         }

//         sortArray.sort( numericalSort );

//         const indices = index.array;

//         for ( let i = 0; i < length; i ++ ) {

//             indices[ i ] = sortArray[ i ][ 1 ];

//         }

//         geometry.index.needsUpdate = true;

//     }
//     function render() {

//         const time = Date.now() * 0.005;

//         sphere.rotation.y = 0.02 * time;
//         sphere.rotation.z = 0.02 * time;

//         const geometry = sphere.geometry;
//         const attributes = geometry.attributes;

//         for ( let i = 0; i < attributes.size.array.length; i ++ ) {

//             if ( i < length1 ) {

//                 attributes.size.array[ i ] = 16 + 12 * Math.sin( 0.1 * i + time );

//             }

//         }

//         attributes.size.needsUpdate = true;

//         sortPoints();

//         renderer.render( scene, camera );

//     }
//     function animate() {

//         requestAnimationFrame( animate );

//         render();

//     }
//     return scene
// }