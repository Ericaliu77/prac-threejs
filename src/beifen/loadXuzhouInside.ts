import * as THREE from 'three'
import { Scene, Floor, Elevator, Block } from '../../../../models/threeModels/index'
import { EdgesGeometry, LineSegments } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { calMapOriginDeviation } from '../../../../utils/CoordinateTool'
import axios from 'axios'

interface loadInsideProps {
  renderer: any
  camera: any
  controls: any
  scene: any
  composer: any
  currentHub: any
  reLoad: any
}
//
export default function loadInside(props: loadInsideProps) {
  const { scene, currentHub, reLoad } = props
  const sceneA = new Scene({
    name: 'inside',
    scene,
    objects: [],
  })
  Scene.addScenes(sceneA)
  const dracoLoader = new DRACOLoader()
  const gltfloader = new GLTFLoader()

  dracoLoader.setDecoderPath('bigScreen/robot/draco/')
  dracoLoader.setDecoderConfig({ type: 'js' })
  dracoLoader.preload()
  gltfloader.setDRACOLoader(dracoLoader)
  const initLight = () => {
    const dirLight1 = new THREE.DirectionalLight(0xffffff)
    dirLight1.position.set(0, -50, 0)
    scene.add(dirLight1)
    const ambientLight = new THREE.AmbientLight(0x222222)
    scene.add(ambientLight)
    const light = new THREE.HemisphereLight(0xd9d9d9, 0x444444, 0.92)
    light.position.set(-10, 50, -10)
    scene.add(light)
  }
  function calibrateFloor(floorData: any, planeMap: any, floor: any) {
    const { offset, datumPoint } = floorData
    const { datumOffset, radian } = datumPoint
    planeMap.position.set(-offset[0] * 2, 0, offset[1] * 2)
    // floor.wallsObject.position.set(-offset[0], 0, -offset[1])
    floor.object.add(planeMap)
    //  floor.object.rotateY(radian)
    floor.object.position.x = datumOffset[0] * 2
    floor.object.position.z = -datumOffset[1] * 2
  }
  const testBox = () => {
    const originX = -336.43027232515874
    const originY = 33.19811237870715
    const object = new THREE.Object3D()
    object.position.set(0, 0, 0)
    const cubeGeometry = new THREE.BoxGeometry(40, 700, 50)
    const material = new THREE.MeshBasicMaterial({
      //  map: texture1,
      color: 0xc7ecf2,
      // specular:0x8fbbef,
      // side:THREE.DoubleSide,
      transparent: true,
      opacity: 0.42,
      //      alphaTest: 0.01,
    })
    const cube = new THREE.Mesh(cubeGeometry, material)
    object.add(cube)
    scene.add(object)
    //    cube.rotateY(Math.PI / 2)

    object.position.set(originX * 2, 350, -originY * 2)

    cube.updateWorldMatrix(true, true)
    //  rotateAroundWorldAxis(cube,new THREE.Vector3(0, 1, 0), Math.PI / 2)
    //    cube.rotateAroundWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
  }

  // testBox()
  async function createFloors() {
    const { data } = await axios.get('bigScreen/xuzhou/inside.json')
    const { floors } = data
    for (let i = 0; i < data.blocks.length; i += 1) {
      const blockData = data.blocks[i]
      const { floors } = data.blocks[i]
      const { id, name } = blockData
      const object = new THREE.Object3D()

      const block = new Block({
        id,
        name,
        // width: imageWidth,
        // height: imageHeight,
      })
      block.scene = scene
      block.object = object

      block.object.position.set(i * 4000, 0, 0)
      floors.forEach((floorData: any, index: any) => {
        const { id, imageHeight, imageWidth, origin, imageUrl, floorName } = floorData
        const floor = new Floor({
          id,
          floorName,
          origin,
          name: floorName,
          width: imageWidth,
          height: imageHeight,
          offset: floorData.offset || [0, 0, 0],
        })
        const floorObject = new THREE.Object3D()
        floor.object = floorObject
        //   const url = 'bigScreen/xuzhou/' + imageUrl
        const planeMap = new THREE.Object3D()
        //      floor.planeMap = planeMap
        //  floor.object.add(planeMap)
        if (floorData.datumPoint) {
          calibrateFloor(floorData, planeMap, floor)
        } else {
          floor.object.add(planeMap)
        }
        if (floorData.floorName === '1') {
          floor.object.position.y = 0
        } else if (floorData.floorName === '2') {
          floor.object.position.y = 500
        }
        Floor.addFloor(floor)
        floor.addToScene(scene)
      })
      //  const planeMap = createPlaneMap(block, url)
      //  block.planeMap = planeMap
      //    block.object.add(planeMap)
      block.addToScene(scene)
      Block.addBlock(block)
    }
    floors.forEach((floorData: any, index: any) => {
      const { id, imageHeight, imageWidth, origin, imageUrl, floorName, walls, blocks } = floorData
      const floor = new Floor({
        id,
        floorName,
        origin,
        name: floorName,
        width: imageWidth,
        height: imageHeight,
      })
      const floorObject = new THREE.Object3D()
      floor.object = floorObject
      const url = 'bigScreen/xuzhou/' + imageUrl
      const planeMap = createPlaneMap(floor, url)
      if (floorData.datumPoint) {
        calibrateFloor(floorData, planeMap, floor)
      } else {
        floor.object.add(planeMap)
      }
      floor.planeMap = planeMap
      // floor.object.add(planeMap)
      floor.object.position.y = index * 500
      walls.forEach((wall: any) => {
        const { position, size } = wall
        const radian = Math.atan2(position[1].z - position[0].z, position[1].x - position[0].x)
        const centerR = [(position[0].x + position[1].x) / 2, (position[0].z + position[1].z) / 2]
        const center = [centerR[0] - imageWidth / 2, centerR[1] - imageHeight / 2]
        const cube = createBox(size.x, 30, size.z, center[0], 15, center[1])
        cube.rotateY(-radian)
        floor.wallsObject.add(cube)
      })
      // if(floorData.datumPoint){
      //   floor.wallsObject.position.set(-offset[0] * 2, 0, offset[1] * 2)
      // }
      blocks?.forEach((block: any) => {
        const { geos } = block
        const pos: any = []
        geos.forEach((geo: any) => {
          pos.push([geo[0] - imageWidth / 2, geo[1] - imageHeight / 2])
        })
        const height = 50
        const mesh = createBlock(pos, height)

        floor.wallsObject.add(mesh)
      })
      floor.object.add(floor.wallsObject)
      floor.addToScene(scene)
    })

    reLoad('loadInside')
  }
  function setAllFloors(floor: any, level: any) {
    if (level === '1') {
      Floor.floors['62f1831b-2b6c-4aed-9b57-4e1b55c05fb'] = floor
      Floor.floors['8d733cfd-78ad-431c-a775-83775da08932'] = floor
    } else if (level === '2') {
      Floor.floors['8afb61a2-4506-4e75-af0d-3f51e668c2d6'] = floor
      Floor.floors['738fb7e6-06ae-4ce6-8762-59eb3e34d63a'] = floor
    }
  }
  async function createFloorsB() {
    const datas: any = {
      hubId: 'e90d7310-959c-4948-bf09-c67e93600848',
      buildingId: '0ad080f8-938f-4cda-8aa1-00727f409964',
      intention: 'MOVE',
      pageSize: 500,
    }

    //   const { data } = await getWayPoint(datas)
    let i = 0
    const insideDatas = await axios.get('bigScreen/building/inside.json')

    for (const index in insideDatas.data.floors) {
      if (insideDatas.data.floors.hasOwnProperty(index)) {
        const floorData = insideDatas.data.floors[index]
        const { id, level, name, floorName, houseWidth, houseHeight, origin } = floorData
        const object = new THREE.Object3D()
        const floor = new Floor({
          id,
          origin,
          // name:floorName,
          buildingId: insideDatas.data.buildingId || '',
          name,
          level,
          width: houseWidth,
          height: houseHeight,
          floorName,
          //    object: floor.objects
        })
        floor.scene = scene
        floor.object = object
        Floor.addFloor(floor)
        const url = 'bigScreen/building/floor' + floor.level + '.png'
        const groundPlane = createFloorGround(floor)

        const planeMap = createPlaneMap(floor, url)
        floorData.walls.forEach((wall: any) => {
          const { size, position } = wall
          const mesh = createBox(
            size.x,
            floorData.height,
            size.z,
            position.x,
            floorData.height / 2,
            position.z,
          )
          floor.wallsObject.add(mesh)
        })
        floorData.blocks.forEach((block: any) => {
          const { geos, height } = block
          const mesh = createBlock(geos, height)
          floor.wallsObject.add(mesh)
        })
        // floorData.elevatorGeos.forEach((elegeo: any): any => {
        //   const sprite = createElevatorSprite(elegeo)
        //   floor.elevatorSpriteObejct.add(sprite)
        // })
        //  loadWayPoint(f, data)
        if (floor.level === 27) {
          //     createTorus(floor)
          //     createShape(floor)
          //    loadLogo(floor)
        }
        //     loadWayPoint(floor, data)
        // floorData.dockData && loadDockModel(floorData.dockData, floor.docksObject, floor)
        floor.wallsObject.add(floor.elevatorSpriteObejct)

        floor.wallsObject.add(groundPlane)
        floor.wallsObject.rotateY(Math.PI)
        //  floor.elevatorSpriteObejct.rotateY(Math.PI)
        floor.planeMap = planeMap
        if (floor.level === 27) {
          //    loadSunLightInside(floor)
          //  loadFloorModel(floor)
          //    floor.object.add(floor.wallsObject)
        } else {
          //     floor.object.add(floor.wallsObject)
        }

        floor.object.position.y = i
        floor.object.add(floor.wallsObject)
        floor.addToScene(scene)
        //  scene.add(floor.objects)
        i += 500
        // scene.add(house26.blockObject)
      }
    }
    reLoad('loadInside')
    //   loadElevator(insideDatas.data.elevators)
  }
  function createBlock(geos: any, height: any) {
    const shape = new THREE.Shape()
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9c9c9c })

    const points: any = []
    geos.forEach((geo: any, index: number) => {
      const [x, z] = geo

      if (index === 0) {
        shape.moveTo(x * 2, -z * 2)
      }
      shape.lineTo(x * 2, -z * 2)
      points.push(new THREE.Vector3(x * 2, -z * 2, 4.01))
    })
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
    }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    const material = new THREE.MeshLambertMaterial({
      color: 0xa8f0d9,
      emissive: 0x272727,
      opacity: 0.72,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    const edges = new EdgesGeometry(mesh.geometry, 1)
    const lines = new LineSegments(edges, lineMaterial)
    mesh.renderOrder = 2
    mesh.rotateX(-Math.PI / 2)
    // house26.blockObject.add(lines);
    //  house26.blockObject.add(mesh)
    return mesh
  }

  function createFloorGround(floor: any) {
    const boxProjectedMat = new THREE.MeshPhongMaterial({
      color: 0x272727,
      // emissive:0xa8a7a7,
      // emissiveIntensity:0.51,
      //   map: gMap,
      transparent: true,
      opacity: 0.91,
    })
    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(floor.width * 2, floor.height * 2),
      boxProjectedMat,
    )
    groundPlane.rotateX(Math.PI / 2)
    groundPlane.rotateY(Math.PI)
    groundPlane.position.set(0, -2.01, 0)
    floor.level === 27 && groundPlane.position.set(-46, -2.01, -36)
    sceneA.objects.push(groundPlane)
    groundPlane.renderOrder = 2
    return groundPlane
  }
  function createPlaneMap(floor: any, url: any) {
    const loader = new THREE.TextureLoader()

    loader.crossOrigin = ''
    const gMap = loader.load(url)
    gMap.wrapS = THREE.RepeatWrapping
    gMap.wrapT = THREE.RepeatWrapping
    gMap.repeat.set(1, 1)

    const boxProjectedMat = new THREE.MeshPhongMaterial({
      //  color: 0x272727,
      // emissive:0xa8a7a7,
      // emissiveIntensity:0.51,
      alphaTest: 0.1,
      map: gMap,

      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.79,
    })
    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(floor.width * 2, floor.height * 2),
      boxProjectedMat,
    )
    groundPlane.rotateX(-Math.PI / 2)
    // groundPlane.rotateY(Math.PI)
    groundPlane.position.set(0, -2.01, 0)
    floor.level === 27 && groundPlane.position.set(46, -2.01, 36)
    sceneA.objects.push(groundPlane)
    groundPlane.renderOrder = 2
    // scene.add(groundPlane)
    return groundPlane
  }
  function createBox(width: any, height: any, depth: any, x: any, y: any, z: any) {
    const params = {
      color: 0x77fbd1,
      transmission: 0.2,
      envMapIntensity: 1,
      lightIntensity: 1,
      exposure: 1,
    }
    const cubeGeometry = new THREE.BoxGeometry(width * 2, height, depth * 2)
    const material1 = new THREE.MeshPhysicalMaterial({
      color: params.color,
      metalness: 0,
      roughness: 0,
      //  alphaMap: texture,
      alphaTest: 0.5,
      envMapIntensity: params.envMapIntensity,
      depthWrite: false,
      transmission: params.transmission, // use material.transmission for glass materials
      opacity: 1, // set material.opacity to 1 when material.transmission is non-zero
      transparent: true,
      side: THREE.DoubleSide,
    })

    const material = new THREE.MeshBasicMaterial({
      //  map: texture1,
      color: 0xc7ecf2,
      // specular:0x8fbbef,
      // side:THREE.DoubleSide,
      transparent: true,
      opacity: 0.42,
      //      alphaTest: 0.01,
    })
    const cube = new THREE.Mesh(cubeGeometry, [
      material,
      material,
      material1,
      material1,
      material,
      material,
    ])
    cube.position.x = x * 2
    cube.position.y = y
    cube.position.z = z * 2
    //  cube.rotation.y += angle * Math.PI //-逆时针旋转,+顺时针
    cube.renderOrder = 4
    return cube
  }
  async function init() {
    //   createWalls()
    // loadDockModel()
    createFloors()
    //    scene.add(new THREE.AxesHelper(1200))
    //  let obj = setRobotModel()
  }
  init()
  initLight()
}
