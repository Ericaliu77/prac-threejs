import { useEffect } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Robot } from '../../../../models/threeModels/index'
import * as THREE from 'three'

export default function GetMachineObject({ setMachineObjects }: any) {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('bigScreen/robot/draco/')
  dracoLoader.setDecoderConfig({ type: 'js' })
  dracoLoader.preload()
  const setCandleLightModel = () => {
    return new Promise((resolve) => {
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      //    gltfloader.load(baseUrl + 'model_data/lightAB-2-processed.glb', (gltf) => {
      gltfloader.load('bigScreen/robot/candleLight-inside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'candleLight'
        const bbox = new THREE.Box3().setFromObject(gltf.scene)
       // console.log(bbox)
        //  setRobotObject(gltf.scene)
        //  onMouseRobot()
        resolve(gltf.scene)
      })
    })
  }

  const setHiveModel = () => {
    return new Promise((resolve) => {
      const hive = new Robot({
        name: 'hiveModel',
        type: 'hive',
      })
      Robot.addRobots(hive)
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/hiveDelivery6-inside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'hiveDelivery6'
        //   setHiveObject(gltf.scene)
        hive.object = gltf.scene
        resolve(gltf.scene)
      })
    })
  }
  const loadHiveVacuum = () => {
    return new Promise((resolve) => {
      const hive = new Robot({
        name: 'hiveModel',
        type: 'hive',
      })
      Robot.addRobots(hive)
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/hiveVacuum-outside-onRobot-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'hiveVacuum'
        //   setHiveObject(gltf.scene)
        hive.object = gltf.scene
        resolve(gltf.scene)
      })
    })
  }
  const loadHiveVacuumInside = () => {
    return new Promise((resolve) => {
      const hive = new Robot({
        name: 'hiveModel',
        type: 'hive',
      })
      Robot.addRobots(hive)
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/hiveVacuum-inside-onRobot-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'hiveVacuumInside'
        //   setHiveObject(gltf.scene)
        hive.object = gltf.scene
        resolve(gltf.scene)
      })
    })
  }
  const loadHiveGuide = () => {
    return new Promise((resolve) => {
      const hive = new Robot({
        name: 'hiveModel',
        type: 'hive',
      })
      Robot.addRobots(hive)
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/hiveGuide-inside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'hiveGuide'
        //   setHiveObject(gltf.scene)
        hive.object = gltf.scene
        resolve(gltf.scene)
      })
    })
  }
  const loadHiveClean = () => {
    return new Promise((resolve) => {
      const hive = new Robot({
        name: 'hiveModel',
        type: 'hive',
      })
      Robot.addRobots(hive)
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/hiveSterilization-inside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'hiveClean'
        //   setHiveObject(gltf.scene)
        hive.object = gltf.scene
        resolve(gltf.scene)
      })
    })
  }
  const loadHiveMedical4 = () => {
    return new Promise((resolve) => {
      const hive = new Robot({
        name: 'hiveModel',
        type: 'hive',
      })
      Robot.addRobots(hive)
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/hiveMedical4-inside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'hiveMedical4'
        //   setHiveObject(gltf.scene)
        hive.object = gltf.scene
        resolve(gltf.scene)
      })
    })
  }
  const setSunCleanModel = () => {
    return new Promise((resolve) => {
      const sun = new Robot({
        name: 'sunPrototype',
        type: 'sunClean',
      })
      Robot.addRobots(sun)

      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/sunClean-outside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'sunClean'
        const bbox = new THREE.Box3().setFromObject(gltf.scene)
    //    console.log(bbox)
        //   setHiveObject(gltf.scene)
        sun.object = gltf.scene
       
        resolve(gltf.scene)
      })
    })
  }
  const setSunCleanModelInside = () => {
    return new Promise((resolve) => {
      const sun = new Robot({
        name: 'sunPrototype',
        type: 'sunClean',
      })
      Robot.addRobots(sun)

      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/sunClean-inside-processed.gltf', (gltf) => {
        gltf.scene.renderOrder = 8
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.name = 'sunCleanInside'
        const bbox = new THREE.Box3().setFromObject(gltf.scene)
       // console.log(bbox)
        //   setHiveObject(gltf.scene)
        sun.object = gltf.scene
        
        resolve(gltf.scene)
      })
    })
  }
  function loadSunLightModel() {
    return new Promise((resolve) => {
      const gltfloader = new GLTFLoader()
      gltfloader.setDRACOLoader(dracoLoader)
      let baseUrl: any = 'https://cti-radiance-assets.oss-cn-shenzhen.aliyuncs.com/'
      const localUrl: any = 'bigScreen/robot/'
      if (process.env.NODE_ENV === 'development') {
        baseUrl = '/oss/screen/'
      }
      gltfloader.load('bigScreen/robot/sunLight-inside-processed.gltf', (gltf) => {
        // gltf.scene.scale.set(0.87, 0.87, 0.87)
        gltf.scene.name = 'sunLight'
        resolve(gltf.scene)
      })
    })
  }

  async function init() {
    Promise.all([
      setCandleLightModel(),
      setHiveModel(),
      loadHiveGuide(),
      loadHiveClean(),
      loadHiveVacuum(),
      loadHiveVacuumInside(),
      loadHiveMedical4(),
      setSunCleanModel(),
      setSunCleanModelInside(),
      loadSunLightModel(),
    ]).then((results) => {
      setMachineObjects(results)
    })
  }

  init()
}
