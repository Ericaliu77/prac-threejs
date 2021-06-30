import FormItem from 'antd/lib/form/FormItem'
import * as THREE from 'three'
import { Hive } from './Hive'

export class Floor {
  static floors: any = {}
  static ElevatorObject = new THREE.Object3D()
  static mapType: any = 'floorModel' // 楼层样式 '3d'/'2d'/'none'/'floorModel
  id: string
  width: any
  scene: any
  height: any
  offset: any[] = []
  robots: any = {}
  origin: any[] = []
  robotsObject: any
  staticHives: any[] = []
  hivesObject: any
  animationTraceObejct: any
  wallsObject: any
  floorModelObject: any
  name: string
  object: any
  floorHeight: any
  level: number
  floorName: string
  parent: any // 楼栋
  visible: any
  docksObject: any
  waypointObject: any
  planeMap: any
  hiveDatas: any = []
  waypoints: any = []
  elevatorSpriteObejct: any
  buildingId: any
  constructor({
    name,
    object,
    level,
    visible = true,
    origin = [0, 0, 0],
    offset = [0, 0],
    id,
    width,
    height,
    scene,
    floorName,
    floorHeight = 0,
    //   mapType = '3d',
    buildingId,
  }: any) {
    this.id = id
    this.name = name
    this.object = object
    this.level = level
    this.visible = visible
    this.offset = offset
    this.width = width
    this.floorName = floorName
    this.origin = origin
    this.height = height
    //    this.mapType = mapType
    this.buildingId = buildingId
    this.floorHeight = floorHeight
    this.robotsObject = new THREE.Object3D()
    this.docksObject = new THREE.Object3D()
    this.animationTraceObejct = new THREE.Object3D()
    this.waypointObject = new THREE.Object3D()
    this.wallsObject = new THREE.Object3D()
    //   this.floorModelObject = new THREE.Object3D()
    this.elevatorSpriteObejct = new THREE.Object3D()
    this.scene = scene
  }
  static traverse = (fn: any) => {
    for (const floorId in Floor.floors) {
      if (Object.prototype.hasOwnProperty.call(Floor.floors, floorId)) {
        const floor = Floor.floors[floorId]
        if (floor) {
          fn(floor)
        }
      }
    }
  }
  static addFloor = (item: any) => {
    Floor.floors[item.id] = item
  }
  setVisible = (value: boolean) => {
    value ? this.scene.add(this.object) : this.scene.remove(this.object)
  }

  addToScene = (scene: any) => {
    // this.robotsObject.position.y = this.object.position.y
    // this.docksObject.position.y = this.object.position.y
    // this.animationTraceObejct.position.y = this.object.position.y
    // this.waypointObject.position.y = this.object.position.y
    this.docksObject.name = 'docksObject'
    this.animationTraceObejct.name = 'animationTraceObejct'
    this.robotsObject.name = 'robotsObject'
    this.object.name = this.floorName
    this.object.add(this.docksObject)
    this.object.add(this.animationTraceObejct)
    this.object.add(this.robotsObject)
    scene.add(this.object)
    // scene.add(this.waypointObject)
  }
  flyTo = (camera: any, controls: any) => {
    const { x, y, z } = this.object.position
    const offsetX = this.planeMap.position.x
    const offsetY = this.planeMap.position.y
    const offsetZ = this.planeMap.position.z
    //    console.log(x - offsetX, y + this.height * 2.2, z - offsetZ)
    camera.position.set(x - offsetX, y + this.height * 2.2, z - offsetZ)
    controls.target.set(x - offsetX, y, z - offsetZ)
  }
  setDockVisible = (value: any) => {
    this.docksObject.visible = value
  }
  addStaticHive = (data: any, hiveObject: any, geo: any) => {
    const { id, name, level, coordinates } = data
    const hive = new Hive({
      id,
      name,
      level,
      coordinates,
    })
    hive.object = hiveObject.clone()
    hive.setPosition(geo)
    if (data.coordinates) {
      hive.rotationY = coordinates[3]
      hive.setRotation(coordinates[3] + Math.PI / 2)
      hive.setSprite(data)
    }
    this.robotsObject.add(hive.object)
    this.staticHives.push(hive)
    return hive.object
  }
  removeStaticHive = (hiveId: any) => {
    const hive = this.staticHives.find((item: any) => {
      return item.id === hiveId
    })
    const i = this.staticHives.indexOf(hive)
    if (i >= 0) {
      this.staticHives.splice(i, 1)
      this.robotsObject.remove(hive.object)
    }
  }
  addRobotItem = (robotItem: any, a?: any) => {
    // this.robots.push(robotItem)
    this.robots[robotItem.id] = robotItem
    if (robotItem.object) {
      this.robotsObject.add(robotItem.object)
      //   this.robotsObject.add(robotItem.edgeline)
    }
  }
  setOnlyWayPoint = (value: boolean) => {
    if (value) {
      this.scene.add(this.waypointObject)
      this.scene.remove(this.robotsObject)
      this.scene.add(this.animationTraceObejct)
    } else {
      this.scene.remove(this.waypointObject)
      this.scene.add(this.robotsObject)
      this.scene.remove(this.animationTraceObejct)
    }
  }
  removeRobot = (robotData: any) => {}
  clearMachines = () => {
    this.robots = []
    this.staticHives = []

    this.robotsObject.children.forEach((item: any) => {
      this.robotsObject.remove(item)
    })
    this.animationTraceObejct.children.forEach((item: any) => {
      this.animationTraceObejct.remove(item)
    })
  }
  static changeMapType = (key: any) => {
    Floor.traverse((floor: any) => {
      floor.setMapType(Floor.mapType, key)
    })
    Floor.mapType = key
  }
  setMapType = (before: any, after: any) => {
    switch (before) {
      case 'floorModel':
        if (this.floorModelObject) {
          this.object.remove(this.floorModelObject)
        } else {
          this.object.remove(this.wallsObject)
        }
        break
      case '3d':
        this.object.remove(this.wallsObject)
        break
      case '2d':
        this.object.remove(this.planeMap)
        break
      default:
    }
    switch (after) {
      case 'floorModel':
        if (this.floorModelObject) {
          this.object.add(this.floorModelObject)
        } else {
          this.object.add(this.wallsObject)
        }
        break
      case '3d':
        this.object.add(this.wallsObject)
        break
      case '2d':
        this.object.add(this.planeMap)
        break
      default:
    }
  }
}
