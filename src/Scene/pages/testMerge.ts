import * as THREE from "three";
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export default function testMerge(renderer: any, camera: any, controls: any){
    let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x272727);
  function  setElements(){
    const triangles = 5000;

    let geometry = new THREE.BufferGeometry();

    const positions = new Float32Array( triangles * 3 * 3 );
    const normals = new Float32Array( triangles * 3 * 3 );
    const colors = new Float32Array( triangles * 3 * 3 );

    const color = new THREE.Color();

    const n = 800, n2 = n / 2;	// triangles spread in the cube
    const d = 120, d2 = d / 2;	// individual triangle size

    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();

    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();

    for ( let i = 0; i < positions.length; i += 9 ) {

        // positions

        const x = Math.random() * n - n2;
        const y = Math.random() * n - n2;
        const z = Math.random() * n - n2;

        const ax = x + Math.random() * d - d2;
        const ay = y + Math.random() * d - d2;
        const az = z + Math.random() * d - d2;

        const bx = x + Math.random() * d - d2;
        const by = y + Math.random() * d - d2;
        const bz = z + Math.random() * d - d2;

        const cx = x + Math.random() * d - d2;
        const cy = y + Math.random() * d - d2;
        const cz = z + Math.random() * d - d2;

        positions[ i ] = ax;
        positions[ i + 1 ] = ay;
        positions[ i + 2 ] = az;

        positions[ i + 3 ] = bx;
        positions[ i + 4 ] = by;
        positions[ i + 5 ] = bz;

        positions[ i + 6 ] = cx;
        positions[ i + 7 ] = cy;
        positions[ i + 8 ] = cz;

        // flat face normals

        pA.set( ax, ay, az );
        pB.set( bx, by, bz );
        pC.set( cx, cy, cz );

        cb.subVectors( pC, pB );
        ab.subVectors( pA, pB );
        cb.cross( ab );

        cb.normalize();

        const nx = cb.x;
        const ny = cb.y;
        const nz = cb.z;

        normals[ i ] = nx;
        normals[ i + 1 ] = ny;
        normals[ i + 2 ] = nz;

        normals[ i + 3 ] = nx;
        normals[ i + 4 ] = ny;
        normals[ i + 5 ] = nz;

        normals[ i + 6 ] = nx;
        normals[ i + 7 ] = ny;
        normals[ i + 8 ] = nz;

        // colors

        const vx = ( x / n ) + 0.5;
        const vy = ( y / n ) + 0.5;
        const vz = ( z / n ) + 0.5;

        color.setRGB( vx, vy, vz );

        colors[ i ] = color.r;
        colors[ i + 1 ] = color.g;
        colors[ i + 2 ] = color.b;

        colors[ i + 3 ] = color.r;
        colors[ i + 4 ] = color.g;
        colors[ i + 5 ] = color.b;

        colors[ i + 6 ] = color.r;
        colors[ i + 7 ] = color.g;
        colors[ i + 8 ] = color.b;

    }

    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    geometry.computeBoundingSphere();

    let material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
        side: THREE.DoubleSide, vertexColors: true
    } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
  }
  function initLight() {
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
  }

  function setCube(){
    new THREE.BufferGeometryLoader()
    .load( 'model/suzanne_buffergeometry.json', function ( geometry ) {

       const material = new THREE.MeshNormalMaterial();

        geometry.computeVertexNormals();
        const geometries = [];
        const matrix = new THREE.Matrix4();

        for ( let i = 0; i < 2200; i ++ ) {

            randomizeMatrix( matrix );

            const instanceGeometry = geometry.clone();
            instanceGeometry.applyMatrix4( matrix );

            geometries.push( instanceGeometry );

        }

        const mergedGeometry = mergeBufferGeometries( geometries );

        scene.add( new THREE.Mesh( mergedGeometry, material ) );
   //     console.time( api.method + ' (build)' );

        // switch ( api.method ) {

        //     case Method.INSTANCED:
        //         makeInstanced( geometry );
        //         break;

        //     case Method.MERGED:
               
        //         break;

        //     case Method.NAIVE:
        //         makeNaive( geometry );
        //         break;

        // }

        // console.timeEnd( api.method + ' (build)' );

    } );

}
const randomizeMatrix = function () {

    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    return function ( matrix: { compose: (arg0: THREE.Vector3, arg1: THREE.Quaternion, arg2: THREE.Vector3) => void; } ) {

        position.x = Math.random() * 40 - 20;
        position.y = Math.random() * 40 - 20;
        position.z = Math.random() * 40 - 20;

        rotation.x = Math.random() * 2 * Math.PI;
        rotation.y = Math.random() * 2 * Math.PI;
        rotation.z = Math.random() * 2 * Math.PI;

        quaternion.setFromEuler( rotation );

        scale.x = scale.y = scale.z = Math.random() * 1;

        matrix.compose( position, quaternion, scale );

    };

}();
setCube();
  initLight();
    scene.add(new THREE.AxesHelper(200));
    return scene;
}