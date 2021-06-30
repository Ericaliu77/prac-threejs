import * as THREE from 'three'
import { Scene, Floor, Elevator } from '../../../../models/threeModels/index'
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
  // reLoad: any
}
let cylinder: any
export default function loadInside(props: loadInsideProps) {
  const { scene, currentHub } = props
  const sceneA = new Scene({
    name: 'inside',
    scene,
    objects: [],
  })
  if (currentHub.id === 'cefbcf55-f582-4609-8803-dc4b4f6b3607') {
    scene.background = new THREE.Color(0x0d1c20)
  }

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
  const initLight2 = () => {
    const spotLight = new THREE.SpotLight(0xffffff, 0.2)
    spotLight.position.set(-1000, 1800, -1000)

    spotLight.castShadow = true

    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    spotLight.shadow.camera.near = 500
    spotLight.shadow.camera.far = 4000
    spotLight.shadow.camera.fov = 30

    scene.add(spotLight)
  }
  function createCylinder() {
    const geometry = new THREE.CylinderGeometry(0, 20, 30, 4, 1)

    const material = new THREE.MeshStandardMaterial({
      color: 0xa5a5a5,
      emissive: 0x15e298,
      metalness: 0.71,
      roughness: 0.1,
      wireframe: false,
    })

    cylinder = new THREE.Mesh(geometry, material)
    //   35.18697738647461 17.330108642578125
    cylinder.position.set(0, 0, 0)
    cylinder.rotateX(Math.PI)
    scene.add(cylinder)
  }

  const createTorus = (floor: any) => {
    const geometry = new THREE.TorusGeometry(70, 24, 8, 100)
    const material = new THREE.MeshPhongMaterial({ color: 0xa8f0d9, side: THREE.DoubleSide })
    const torus = new THREE.Mesh(geometry, material)
    torus.position.set(-69.385 * 2, 22, 202.535 * 2)
    torus.rotation.x = Math.PI / 2
    // torus.rotation.y = 3*Math.PI/4
    floor.wallsObject.add(torus)
  }
  async function createFloorsB() {
    let index = 0
    const { data } = await axios.get('bigScreen/building/xiliIndoor.json')
    const { buildingId } = data
    for (let i = 0; i < data.floors.length; i += 1) {
      const floorData = data.floors[i]
      const { id, level, name, floorName, imageWidth, imageHeight, origin } = floorData
      const object = new THREE.Object3D()
      Floor.mapType = 'none'
      const floor = new Floor({
        id,
        origin,
        buildingId,
        offset: floorData.offset || [0, 0, 0],
        name,
        level: Number(level),
        width: imageWidth,
        height: imageHeight,
        floorName,
        scene,
        // mapType: 'none',
        //    object: floor.objects
      })
      floor.object = object
      Floor.addFloor(floor)
      let baseUrl: any = 'https://cti-device-map.oss-cn-shenzhen.aliyuncs.com/production/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/map/'
      }
      const url = 'bigScreen/building/xilihospital/' + floorData.imageName
      const planeMap = createPlaneMap(floor, url)

      if (floorData.datumPoint) {
        calibrateFloor(floorData, planeMap, object)
      } else {
        object.add(planeMap)
      }
      floor.planeMap = planeMap
      floor.object.position.y = index
      floor.floorHeight = index

      floor.addToScene(scene)
      index += 500
    }
  }
  function calibrateFloor(floorData: any, planeMap: any, object: any) {
    const { offset, datumPoint } = floorData
    const { datumOffset, radian } = datumPoint
    planeMap.position.set(-offset[0] * 2, 0, offset[1] * 2)
    object.add(planeMap)
    object.rotateY(radian)
    object.position.x = datumOffset[0] * 2
    object.position.z = -datumOffset[1] * 2
  }
  async function createFloors() {
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
          const mesh = createBlock(geos, height, floor)
          floor.wallsObject.add(mesh)
        })
        floorData.elevatorGeos.forEach((elegeo: any): any => {
          const sprite = createElevatorSprite(elegeo)
          floor.elevatorSpriteObejct.add(sprite)
        })
        //  loadWayPoint(f, data)
        if (floor.level === 27) {
          createTorus(floor)
          createShape(floor)
          loadLogo(floor)
        }
        //     loadWayPoint(floor, data)
        floorData.dockData && loadDockModel(floorData.dockData, floor.docksObject, floor)
        floor.wallsObject.add(floor.elevatorSpriteObejct)

        floor.wallsObject.add(groundPlane)
        floor.wallsObject.rotateY(Math.PI)
        //  floor.elevatorSpriteObejct.rotateY(Math.PI)
        floor.planeMap = planeMap
        if (floor.level === 27) {
          loadSunLightInside(floor)
          loadFloorModel(floor)
          //    floor.object.add(floor.wallsObject)
        } else {
          floor.object.add(floor.wallsObject)
        }

        floor.object.position.y = i
        //   floor.object.add(floor.wallsObject)
        floor.addToScene(scene)
        //  scene.add(floor.objects)
        i += 500
        // scene.add(house26.blockObject)
      }
    }
    loadElevator(insideDatas.data.elevators)
  }
  function loadElevator(eleDatas: any) {
    for (const index in eleDatas) {
      if (eleDatas.hasOwnProperty(index)) {
        const item = eleDatas[index]
        const object = createElevator(item)
        //   Floor.ElevatorObject.add(object)
        if (item.id) {
          const elevator = new Elevator({
            name: index,
            id: item.id,
          })
          elevator.object = object
          Elevator.addElevator(elevator)
        }
      }
    }

    Floor.ElevatorObject.position.set(0, 0, 0)
    Floor.ElevatorObject.rotateY(Math.PI)
    scene.add(Floor.ElevatorObject)
  }
  function loadFloorModel(floor: any) {
    gltfloader.load('bigScreen/building/floor27.gltf', (gltf) => {
      //   scene.add(gltf.scene)
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const height = box.max.z - box.min.z
      const width = box.max.x - box.min.x
      const yheight = box.max.y - box.min.y
      const floorHeight = 636 * 2
      const floorWidth = 1152 * 2
      const rateX = floorWidth / width
      const rateY = 70 / yheight
      const rateZ = floorHeight / height
      gltf.scene.scale.set(rateX, rateY, rateZ)
      gltf.scene.position.set(46, (rateY * yheight) / 2 - 10, 36)
      floor.floorModelObject = new THREE.Object3D()
      floor.floorModelObject.add(gltf.scene)
      const groundPlane = createFloorGround(floor)
      floor.floorModelObject.add(groundPlane)
      floor.object.add(floor.floorModelObject)

      return gltf.scene
    })
  }

  function createElevator(item: any) {
    const texture = new THREE.TextureLoader().load('bigScreen/texture/arrow-right.png')
    texture.wrapS = THREE.RepeatWrapping // 每个都重复
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 1)
    texture.needsUpdate = true
    texture.center = new THREE.Vector2(0.5, 0.5)
    texture.rotation = Math.PI / 2
    const { geos, size } = item
    const cubeGeometry = new THREE.BoxGeometry(size[0] * 2, 550, size[1] * 2)
    const params = {
      color: 0x77fbd1,
      transmission: 0.7,
      envMapIntensity: 1,
      lightIntensity: 1,
      exposure: 1,
    }
    const material1 = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.5,
      roughness: 0.5,
      //  alphaMap: texture,
      alphaTest: 0.1,
      envMapIntensity: params.envMapIntensity,
      depthWrite: true,
      transmission: params.transmission, // use material.transmission for glass materials
      opacity: 0.449, // set material.opacity to 1 when material.transmission is non-zero
      transparent: true,
      side: THREE.FrontSide,
    })

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0x9bc7b9,
      // specular:0x8fbbef,
      // side:THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      //      alphaTest: 0.01,
    })
    const material2 = new THREE.MeshBasicMaterial({
      //      map: texture,
      color: 0x9bc7b9,
      // specular:0x8fbbef,
      // side:THREE.DoubleSide,
      transparent: true,
      opacity: 0.72,
      //      alphaTest: 0.01,
    })

    const cube = new THREE.Mesh(cubeGeometry, [
      material,
      material,
      material2,
      material,
      material,
      material,
    ])
    cube.position.set(geos[0] * 2, 265, geos[1] * 2)
    //   console.log(cube)
    return cube
  }
  function loadLogo(floor: any) {
    const text = 'CANDELA'
    const bevelEnabled = true

    let font: any

    const fontName = 'optimer' // helvetiker, optimer, gentilis, droid sans, droid serif
    const fontWeight = 'bold' // normal bold
    const height = 20
    const size = 40
    const hover = 30
    const curveSegments = 4
    const bevelThickness = 2
    const bevelSize = 1.5
    const mirror = false
    const loader = new THREE.FontLoader()
    loader.load('bigScreen/texture/helvetiker_bold.typeface.json', (response: any) => {
      font = response
      const textGeo = new THREE.TextGeometry(text, {
        font,
        size,
        height,
        curveSegments,
        bevelThickness,
        bevelSize,
        bevelEnabled,
      })
      const materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
      ]
      textGeo.computeBoundingBox()
      const mesh = new THREE.Mesh(textGeo, materials)
      mesh.position.set(-17, 20, 280.93 * 2)
      mesh.rotateY(Math.PI)
      floor.wallsObject.add(mesh)
      //
      //  return mesh
      ///  floor.object.add(mesh)
    })
  }

  function loadSunLightInside(floor: any) {
    const geo = [218.26 * 2, 1, -259.93 * 2]
    gltfloader.load('bigScreen/robot/sunLight-inside-processed.gltf', (gltf) => {
      gltf.scene.renderOrder = 8
      gltf.scene.rotateY(Math.PI)
      gltf.scene.position.set(geo[0], geo[1], geo[2])
      gltf.scene.scale.set(0.87, 0.87, 0.87)
      floor.object.add(gltf.scene)
    })
  }

  function loadWayPoint(floor: any, datas: any) {
    const waypoints = datas.filter((i: any) => {
      return i.floorName === floor.level.toString() && i.indoorCoordinates
    })
    floor.waypointObject.visible = false
    waypoints.forEach((point: any) => {
      const sprite = setSprite(point)
      const waypoint = buildWayPoint(point, floor)
      waypoint.userData.waypointId = point.id
      waypoint.name = point.name
      sprite.parent = waypoint
      waypoint.children.push(sprite)
      floor.waypointObject.add(waypoint)
    })
  }

  function buildWayPoint(point: any, floor: any) {
    const geo = calMapOriginDeviation(point.indoorCoordinates, floor)

    const geometry = new THREE.BoxGeometry(30, 30, 30)
    const material = new THREE.MeshNormalMaterial({})
    const waypoint = new THREE.Mesh(geometry, material)

    waypoint.position.set(geo[0], 1, -geo[1])
    return waypoint
  }
  function setSprite(item: any) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let rate: any
    let width: any
    if (ctx) {
      ctx.font = 'Bold 20px Arial'
      const word = item.name
      width = ctx?.measureText(word).width
      rate = width / 300
      const distance = 2
      //   ctx.fillRect(0, 0, 300, 150)

      canvas.width = width
      canvas.height = 30
      ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'
      ctx.font = 'Bold 20px Arial'
      ctx.fillText(word, distance, 14 + 2)
      const rateH = 30 / width
    }

    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: true })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.center = new THREE.Vector2(0.5, 0)

    sprite.position.set(0, 40, 0)
    // 300px*150px  100  50
    const scaleX = rate * 100
    const scaleY = (rate * 100 * 30) / width
    sprite.scale.set(scaleX, scaleY, 1)
    sprite.renderOrder = 100

    return sprite
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
  function createElevatorSprite(geo: any) {
    const texture = new THREE.TextureLoader().load('bigScreen/texture/elevator.png')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let rate: any
    if (ctx) {
      ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'
      ctx.font = 'Bold 20px Arial'

      const word = 'lift'
      const width = ctx?.measureText(word).width
      rate = width / 300

      //   ctx.drawImage(img,0,0,150,150)
      ctx.fillText(word, 2, 14 + 2)
    }
    // var texture = new THREE.Texture(canvas)
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture })

    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.center = new THREE.Vector2(0.5, 0)
    sprite.position.set(geo[0] * 2, 90, geo[1] * 2)
    sprite.scale.set(20, 20, 1)
    sprite.renderOrder = 1
    return sprite
  }

  function createBlock(geos: any, height: any, floor: any) {
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
    // house26.wallsObject.add(cube)
    return cube
  }

  function createShape(floor: any) {
    const material = new THREE.MeshLambertMaterial({
      color: 0xa8f0d9,
      emissive: 0x272727,
      opacity: 0.72,
      transparent: true,
    })
    const extrudeSettings = {
      depth: 70,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    }
    const roundedRectShape = new THREE.Shape()

      .moveTo(0, 0)
      .lineTo(0, 54.19 * 2)
      .lineTo(323.44 * 2, 54.19 * 2)
      .lineTo(323.44 * 2, 32.99 * 2)
      .lineTo(32.99 * 2, 32.99 * 2)
      .quadraticCurveTo(0, 21.2 * 2, 0, 0)

    const x = -251.26 * 2
    const y = 70
    const z = 246.74 * 2
    const rx = Math.PI / 2
    const ry = Math.PI / 2
    const rz = 0
    const s = 1

    const geometry = new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings)

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    // mesh.rotateY(Math.PI)
    mesh.rotateX(Math.PI / 2)
    // mesh.rotateZ(Math.PI)
    //  mesh.rotation.set(rx, ry, rz)
    mesh.scale.set(s, s, s)

    floor.wallsObject.add(mesh)
    return mesh
    //     scene.add(roundedRectShape)

    // let geometry = new THREE.ShapeGeometry( shape );
  }
  function loadDockModel(dockData: any, docksObject: any, floor: any) {
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    cubeTextureLoader.setPath('bigScreen/texture/skybox/')
    // 六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
    const cubeTexture = cubeTextureLoader.load([
      'px.jpg',
      'nx.jpg',
      'py.jpg',
      'ny.jpg',
      'pz.jpg',
      'nz.jpg',
    ])
    let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
    if (process.env.NODE_ENV === 'development') {
      baseUrl = '/oss/screen/'
    }
    gltfloader.load(baseUrl + 'model_data/pile-inside-processed.gltf', (gltf) => {
      gltf.scene.renderOrder = 8
      gltf.scene.traverse((mesh: any) => {
        if (mesh.material) {
          if (mesh.material.metalness > 0) {
            mesh.material.envMap = cubeTexture
          }
        }
        // scene.add(mesh)
      })
      // scene.add(dockData.objects)
      // gltf.scene.rotateY(0.04123733767196778)
      createDock(gltf.scene, floor)
      // scene.add(gltf.scene)
    })
    function createDock(model: any, floor: any) {
      for (let i = 0; i < dockData.length; i += 1) {
        const item = dockData[i]
        const geo = calMapOriginDeviation(item.coordinates, floor)
        const dockItem = model.clone()
        dockItem.position.set(geo[0], 0, -geo[1])
        dockItem.rotateY(item.coordinates[2] + Math.PI / 2)

        docksObject.add(dockItem)
      }
      sceneA.objects.push(docksObject)
    }
  }

  async function init() {
    //   createWalls()
    // loadDockModel()
    currentHub.id === 'cefbcf55-f582-4609-8803-dc4b4f6b3607' ? createFloorsB() : createFloors()
    //    scene.add(new THREE.AxesHelper(1200))
    //  let obj = setRobotModel()
  }
  init()
  initLight()
  // initLight2()

  // return {robotObject}
}
