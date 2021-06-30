import * as THREE from "three";
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
export default function loadPCD(renderer: any, camera: any, controls: any) {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x272727);
    scene.add(new THREE.AxesHelper(200));

    const loadData=()=>{
        const loader = new PCDLoader();
				loader.load( 'pcd/fz_shangxiahang.pcd', function ( points: any ) {
                    points.rotateX(Math.PI/2)
					scene.add( points );
                    console.log(points)
					const center = points.geometry.boundingSphere.center;
				//	controls.target.set( center.x, center.y, center.z );
				//	controls.update();

				} );
    }
    loadData()
    return scene;
}