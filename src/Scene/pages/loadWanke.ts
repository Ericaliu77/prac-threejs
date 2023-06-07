import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { EdgesGeometry, LineBasicMaterial, LineSegments, Vector2 } from "three";
 import { mergeBufferAttributes } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

import axios from "axios";
const MeshLine = require("three.meshline").MeshLine;

const MeshLineMaterial = require("three.meshline").MeshLineMaterial;
const MeshLineRaycast = require("three.meshline").MeshLineRaycast;
export default function loadWanke(renderer: any, camera: any, controls: any) {
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x272727);
  let center = [113.942669, 22.580153];
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
  function loadGround() {
    const loader = new THREE.TextureLoader();
    let gMap = loader.load("./texture/point.png");
    gMap.wrapS = THREE.RepeatWrapping;
    gMap.wrapT = THREE.RepeatWrapping;
    gMap.repeat.set(300, 200);
    let groundPlane;
    let boxProjectedMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: gMap,
    });
    boxProjectedMat.transparent = true;
    //      boxProjectedMat.opacity = 0.5
    groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5000, 3000),
      boxProjectedMat
    );
    groundPlane.rotateX(-Math.PI / 2);
    groundPlane.position.set(0, -2, 0);
    console.log(groundPlane);
    scene.add(groundPlane);
    //     render();
  }
  function loadRoad() {
    const linegeo = axios.get("./wanke/wanke-TopRoad-1.json").then((res) => {
      let { geometries } = res.data;

      const material = new THREE.LineBasicMaterial({
        color: "#6E9092",
        linewidth: 1,
        transparent: true,
        opacity: 0.5,
      });
      geometries.forEach((geomatery: any) => {
        let points = geomatery.coordinates;
        let transPoints: any = [];
        points.forEach((geo: any) => {
          let geoM = WSG84TOMercatorCenter(geo, center);

          let newGeo = new THREE.Vector3(geoM[0], -1, geoM[1]);
          transPoints.push(newGeo);
        });

        const geometry = new THREE.BufferGeometry().setFromPoints(transPoints);
        const line = new THREE.Line(geometry, material);
        line.rotateX(Math.PI);
        scene.add(line);
      });
    });
  }
  async function loadLine() {
    let texture = new THREE.TextureLoader().load("texture/gline.png");
    let texture1 = new THREE.TextureLoader().load("texture/green-line.png");
    const linegeo = await axios.get("./wanke/wanke-moveRoad.json");
    const linegeo1 = await axios.get("./wanke/wanke-moveRoad2.json");
    let { geometries } = linegeo.data;
    let geometries2 = linegeo1.data.geometries;
    console.log(geometries2);
    createRoadLine(geometries, texture);
    //  createRoadLine(geometries2,texture1)
  }
  function createRoadLine(geometries: any, texture: any) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
    texture.needsUpdate = true;
    texture.repeat.set(1, 1);
    const materia4 = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      // transparent: true,
      opacity: 0.9,
    });
    for (let i = 0; i < 26; i++) {
      let geoArr: any = [];
      geometries[i].coordinates.forEach((geo: any) => {
        let pos = WSG84TOMercatorCenter(geo, center);
        geoArr.push(new THREE.Vector3(pos[0], -4, pos[1]));
      });
      let curve = new THREE.CatmullRomCurve3(geoArr); // 曲线路径
      let tubularSegments = geometries[i].coordinates.length;
      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        tubularSegments,
        3,
        16
      );
      let mesh = new THREE.Mesh(tubeGeometry, materia4);
      mesh.rotateX(Math.PI);
      scene.add(mesh);
    }

    const move = () => {
      texture.offset.x -= 0.0056;
      requestAnimationFrame(move);
    };
    move();
  }

  function setRender() {
    renderer.render(scene, camera);
    window.addEventListener("resize", onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function loadBuilding() {
    const buildinggeo = axios
      .get("wanke/wanke-building 2.json")
      .then((res) => {
        let data = res.data;
        for (let i = 0; i < data.features.length; i++) {
          let b = data.features[i];
          let geos = b.geometry.coordinates[0];
          let height = b.properties.height;

      createBuilding(geos, height);
        
          //      console.log(geos,height)
        }
      });
  }
  function loadBuildingTest(){
    const buildingObject: any = []
    const pos: any = []
    const materialB = new THREE.MeshPhongMaterial({
      emissive: 0x07272d,
      emissiveIntensity: 0.4,
      color: 0x51c0b0,
      transparent: true,
      opacity: 0.92,
      shininess: 30,
    })
    const buildinggeo = axios
    .get("wanke/wanke-building 2.json")
    .then((res) => {
      const { data } = res
      const centerId = data.centerId
      console.log(data.features.length)
     // for (let i = 0; i < data.features.length; i += 1) {
      for (let i = 999; i < 2137; i += 1) {
        const item = data.features[i]
        const { height } = item.properties
        const geos = item.geometry.coordinates[0]
        const { objectid } = item.properties

        pos.push(geos)
        if (objectid !== centerId) {
          const geometry = createBuildingTest(geos, height)
          if(i>2130){
            console.log(geometry.attributes)
          }
        geometry.computeBoundingSphere();
          buildingObject.push(geometry)
        }
      }
      setTimeout(()=>{
        const mergedGeometry = mergeBufferGeometries(buildingObject,false)
       
        const mesh = new THREE.Mesh(mergedGeometry, materialB.clone())
        // mesh.rotateZ(Math.PI)
        mesh.rotateX(-Math.PI / 2)
        createBuildingEdgeLine(mesh)

        // Building.addToBuildings(build)
        scene.add(mesh)
        return mesh
      },200)
      
        //      console.log(geos,height)
      }
    );
  }
  function createBuildingTest(geos: any, height: any) {
    
    const points: THREE.Vector2[] | undefined = [];
    geos.forEach((geo: any, index: number) => {
      const [x, z] = WSG84TOMercatorCenter(geo, center)
      points.push(new Vector2(x,z))
      if (index === 0) {
   //     shape.moveTo(parseFloat(x.toString()), parseFloat(z.toString()))
      }
  //    shape.lineTo(parseFloat(x.toString()), parseFloat(z.toString()))
    })
    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
    }
    const shape = new THREE.Shape(points)
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    return geometry
  }

  const createBuilding = (geos: any, height: any) => {
    const shape = new THREE.Shape();

    geos.forEach((geo: any, index: number) => {
      let [x, z] = WSG84TOMercatorCenter(geo, center);

      if (index === 0) {
        shape.moveTo(x, z);
      }
      shape.lineTo(x, z);
    });
    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const texture1 = new THREE.TextureLoader().load(
      "./texture/building-bluetable.png"
    );
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(1, 0.41);
    const texture2 = new THREE.TextureLoader().load(
      "./texture/building-bluetop.png"
    );
    texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(0.1, 0.1);
    const material2 = new THREE.MeshBasicMaterial({
      map: texture1,
    });
    let materialB = new THREE.MeshPhongMaterial({
        //      specular: 0xb21e2d,
        emissive: 0x1F8468,
        color: 0x5e5e5e,
        //        color: _this.getColor(height),
        transparent: true,
        opacity: 0.92,
        //map: texttrue2,
        //        specularMap:texttrue2,
        //  shininess:30
      });
    const material3 = new THREE.MeshBasicMaterial({ map: texture2 });
    const mesh = new THREE.Mesh(geometry, materialB);
    mesh.rotateX(-Math.PI / 2);
    createBuildingEdgeLine(mesh)
    scene.add(mesh);
    return mesh
  };
  const createBuildingEdgeLine = (mesh: any) => {
    let lineMaterial = new LineBasicMaterial({
      color: "#6E9092",
      transparent: true,
      linewidth: 5,
      opacity: 1.0,
    });
    //解决z-flighting
    lineMaterial.polygonOffset = true;
    lineMaterial.depthTest = true;
    lineMaterial.polygonOffsetFactor = 1;
    lineMaterial.polygonOffsetUnits = 1.0;
    let edges = new EdgesGeometry(mesh.geometry, 1);
    let lines = new LineSegments(edges, lineMaterial);
    lines.rotateX(-Math.PI / 2);
    scene.add(lines);
  };
  function test() {
    const shape = new THREE.Shape();
    const length = 12,
      width = 8;
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);

    console.log(shape);
    const extrudeSettings = {
      depth: 4,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({
      color: "#02A1E2",
      transparent: false,
      opacity: 0.6,
    });
    const material1 = new THREE.MeshBasicMaterial({
      color: "#3480C4",
      transparent: true,
      opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    console.log(mesh);
    scene.add(mesh);
  }
  // animate()
  // test();
  loadBuildingTest();
  initLight();
  loadGround();
  loadRoad();
  loadLine();
  scene.add(new THREE.AxesHelper(200));
  return scene;
}
function WSG84TOMercatorCenter(geo: any, center: any) {
  let geoTrans = WSG84TOMercator(geo);
  let centerTrans = WSG84TOMercator(center);
  let x = geoTrans[0] - centerTrans[0];
  let y = geoTrans[1] - centerTrans[1];
  return [x, y];
}
function WSG84TOMercator(geo: any) {
  const lon = geo[0];
  const lat = geo[1];
  let x = (lon * 20037508.34) / 180;
  var y = (Math.PI / 180.0) * lat;
  var tmp = Math.PI / 4.0 + y / 2.0;
  y = (20037508.3427892 * Math.log(Math.tan(tmp))) / Math.PI;

  return [x, y];

  //let y = Math.log(Math.tan((90+lat)*Math.PI/360))/（Math.PI/360）*20037508.34/180
}

function mergeBufferGeometries( geometries: THREE.BufferGeometry[], useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new THREE.BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none
    //

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		// gather .userData

		mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
		mergedGeometry.userData.mergedUserData.push( geometry.userData );

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeBufferAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}
  console.log(mergedGeometry)

	return mergedGeometry;

}

