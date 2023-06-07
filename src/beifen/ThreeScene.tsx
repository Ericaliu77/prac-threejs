import React, { useEffect, useState, useRef, Fragment, useCallback } from 'react'
import { connect } from 'umi'
import * as THREE from 'three'
import { throttle } from 'lodash'
import { disposeObjects } from '../../utils/ThreeTool'
import TWEEN from '@tweenjs/tween.js'
import {
  loadBigRobot,
  loadBuildingArea,
  loadInside,
  FloorDisplay,
  RobotDisplay,
  DeviceControlPanel,
  animationControl,
  GetMachineObject,
  InteriorListener,
} from './components/index'
import { ThreeSetter } from '../../models/threeModels/ThreeSetter'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { Button } from 'antd'
import {
  BigRobot,
  Floor,
  Pointer,
  Scene,
  Building,
  OutdoorArea,
  Waypoint,
} from '../../models/threeModels/index'
import eventBus from '@/utils/eventBus'
import { showrobotInfoWindow, clearrobotInfoWindow } from './components/tools/painter'
import css from './index.less'
import { ScreenMenuKeyEnum } from '../../models/screen'

const prototypes = {}
let raf: any
let stats: any
let sceneNow: any
const scenes: any = [
  {
    name: 'BuildingArea',
    fn: loadBuildingArea,
    scene: null,
    objects: [],
    updates: [],
  },
  {
    name: 'IndoorArea',
    fn: loadInside,
    scene: null,
    objects: [],
    updates: [],
  },
  {
    name: 'RobotExhibit',
    fn: loadBigRobot,
    scene: null,
    objects: [],
    updates: [],
  },
]
const mouse = new THREE.Vector2(2, 2)
const raycaster = new THREE.Raycaster()
const raycasterClick = new THREE.Raycaster()
let INTERSECTED: any
let robots: any = {}
let rendererNow: any
let socketNow: any

export const ThreeScene = (props: any) => {
  const [showScene, setShowScene] = useState<any>(true)
  const [bigRobotItem, setBigRobotItem] = useState<any>()
  const [displayWindow, setDisplayWindow] = useState<boolean>(false)
  const [prototypesDone, setPrototypesDone] = useState<boolean>(false)
  const [sceneName, setSceneName] = useState<any>()
  const [autoRotate, setAutoRotate] = useState<any>(true)
  const [selectedItem, setSelectedItem] = useState<any>()
  const clock = new THREE.Clock()
  const mouseSelected = useRef()
  const sceneNameRef = useRef()
  const currentHubRef = useRef()
  const selectedItemRef = useRef()
  const {
    renderer,
    camera,
    initSceneSetter,
    socket,
    clearState,
    composer,
    currentHub,
    menuKey,
    menuCount,
    controls,
  } = props

  useEffect(() => {
    if (process.env.UMI_ENV === 'deploy' || showScene) {
   //  initSceneSetter()
      testinit()
      GetMachineObject({ setMachineObjects })
    }
    eventBus.on('bigRobotShow', (data) => {
      setBigRobotItem(data)
      setDisplayWindow(true)
    })
    listenSelectItem()
    return () => {
      if (rendererNow) {
        unmount()
      }
    }
  }, [])
  useEffect(() => {
    if (ThreeSetter.rendererA) {
      console.log(ThreeSetter.rendererA)
    }
  }, [ThreeSetter])
  function testinit() {
    ThreeSetter.init()
  }
  function listenSelectItem() {
    eventBus.on('selectRobot', (id) => {
      console.log(id, sceneNameRef.current)
      if (sceneNameRef.current === 'IndoorArea') {
        // selectedItem(robots[id])
        //  InteriorListener({
        //   robots,
        //   camera,
        //   controls,
        //   event: id,
        //   raycaster,
        //   selectedItem: selectedItemRef.current,
        //   pointerSelected,
        //   renderer: rendererNow,
        //   addUpdates: addUpdateFun,
        //   scene: sceneNow,
        //   action:'listTrigger'
        // })
      }
    })
  }
  useEffect(() => {
    if (socket) {
      socketNow = socket
    }
  }, [socket])
  function setMachineObjects(datas: any) {
    datas.forEach((data: any) => {
      prototypes[data.name] = data
    })
    setPrototypesDone(true)
    //
    //  checkObject(sceneNameRef.current)
  }
  useEffect(() => {
    if (currentHubRef.current) {
      //   setShowScene(false)
      setAnimation(sceneNameRef.current, 'clear', currentHubRef.current)
      currentHubRef.current = currentHub

      //   unmount()
      changeCurrentHub(currentHub)
    } else {
      currentHubRef.current = currentHub
    }
  }, [currentHub])
  useEffect(() => {
    if (prototypesDone) {
      setAnimation(sceneNameRef.current, 'set')
    }
  }, [prototypesDone])
  useEffect(() => {
    sceneNameRef.current = sceneName
  }, [sceneName])

  useEffect(() => {
    selectedItemRef.current = selectedItem
  }, [selectedItem])

  function changeCurrentHub(currentHub: any) {
    const ss = scenes.find((i: any) => {
      return i.name === 'BuildingArea'
    })
    const sInside = scenes.find((i: any) => {
      return i.name === 'IndoorArea'
    })

    Building.dispose()
    Floor.disposeFloor()
    OutdoorArea.disposeOutdoorArea()
    disposeObjects(ss.scene)
    disposeObjects(sInside.scene)
    // disposeLights(scenes[2].scene)
    initScene('change')
    backToHome()
    setAnimation(sceneNameRef.current, 'set')
    //    setToScene('BuildingArea')
  }
  function unmount() {
    unListenEventListener()
    setAnimation(sceneNameRef.current, 'clear')
    Scene.scenes = []
    setSceneName('')
    sceneNow = undefined
    cancelAnimationFrame(raf)

    const ss = scenes.find((i: any) => {
      return i.name === 'BuildingArea'
    })
    Building.dispose()
    Floor.disposeFloor()
    OutdoorArea.disposeOutdoorArea()

    BigRobot.dispose()
    scenes.forEach((item: any) => {
      const { scene } = item
      disposeObjects(scene)
    })

    clearRenderer(rendererNow)
    clearState()
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  }

  useEffect(() => {
    if (bigRobotItem) {
      setToScene('RobotExhibit')
      //   setBigRobotItem(undefined)
    }
  }, [bigRobotItem])
  const closeControlModal = () => {
    setSelectedItem(undefined)
  }

  const buildingClick = (event: any) => {
    const meshs: any = []
    const build = Building.buildings.find((i: any) => {
      return i.name === 'centerBuilding'
    })
    if (build) {
      if (event.button === 0) {
        const mesh = build.object
        Building.buildings.forEach((item: any) => {
          meshs.push(item.object)
        })
        const intersects = raycaster.intersectObjects(meshs, true)

        if (intersects.length > 0) {
          if (intersects[0].object === mesh) {
            setToScene('IndoorArea')
          }
        }
      }
    }
  }

  const init = () => {
    initScene()
    stats = Stats()
    if (process.env.NODE_ENV !== 'production') {
      document.getElementById('big-3dScene')?.appendChild(stats.domElement)
    }
  }
  const onmousemove = useCallback(
    (event: any) => {
      // const renderer = rendererNow
      if (renderer) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        //  console.log(mouse)
        const scenename: any = sceneNameRef.current
        switch (scenename) {
          case 'BuildingArea':
            onMouseBuilding()
            break
          case 'IndoorArea':
            onMouseRobot()
            break
          default:
            null
        }
      }
    },
    [renderer],
  )
  const onPointerUp = useCallback(
    (event: any) => {
      if (renderer) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

        const scenename: any = sceneNameRef.current
        switch (scenename) {
          case 'BuildingArea':
            buildingClick(event)
            break
          case 'IndoorArea':
            InteriorListener({
              robots,
              camera,
              controls,
              event,
              raycaster,
              selectedItem: selectedItemRef.current,
              pointerSelected,
              renderer: rendererNow,
              addUpdates: addUpdateFun,
              scene: sceneNow,
            })
            //   robotClick(event)
            break
          default:
            null
        }
      }
    },
    [renderer],
  )
  function setScreen() {
    if (renderer) {
      document.getElementById('big-3dScene')?.appendChild(renderer.domElement)
      document.addEventListener('pointermove', onmousemove, true)
      document.getElementById('big-3dScene')?.addEventListener('pointerup', onPointerUp)
      window.addEventListener('resize', onWindowResize)
      animate()
    }
  }
  function unListenEventListener() {
    document.removeEventListener('pointermove', onmousemove, true)
    document.getElementById('big-3dScene')?.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('resize', onWindowResize)
  }
  useEffect(() => {
    if (renderer) {
      rendererNow = renderer
      init()
      setScreen()
    }
  }, [renderer])

  function clearRenderer(renderer: any) {
    renderer.dispose()
    //   renderer.forceContextLoss()
    // renderer.context = null
    // renderer.domElement = null
    renderer = null
  }
  function getObjects(value: any, name: any) {
    const item = scenes.find((i: any) => {
      return i.name === name
    })
    item.objects.push(value)
  }
  function initScene(value = 'initial') {
    let length = scenes.length - 1
    if (value === 'change') {
      length = scenes.length - 1
    }
    for (let i = 0; i < length; i += 1) {
      const item = scenes[i]
      if (!item.scene) {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x272727)
        item.scene = scene
      }
      item.fn({
        renderer,
        camera,
        controls,
        scene: item.scene,
        composer,
        currentHub: currentHubRef.current,
        addObjects: getObjects,
        addUpdates: addUpdateFun,
      })
    }
    setToScene('BuildingArea')
    listenVisible()
  }
  function pointerSelected(item: any) {
    setSelectedItem(item)
  }
  function addUpdateFun(callback: any, sceneName: any, action: any) {
    const scene = scenes.find((i: any) => {
      return i.name === sceneName
    })
    if (action === 'add') {
      scene.updates.push(callback)
    } else if (action === 'remove') {
      const i = scene.updates.indexOf(callback)
      scene.updates.splice(i, 1)
    }
  }

  function onMouseRobot() {
    if (!sceneNow) return
    const interItem = checkRobotItem()

    if (interItem) {
      INTERSECTED = interItem

      if (interItem.type === 'robot') {
        showrobotInfoWindow(interItem.object)
        return
      }
      if (interItem.type === 'waypoint' && interItem.object instanceof Waypoint) {
        interItem.object.changeMaterial('mousein')
      }
    } else {
      if (INTERSECTED) {
        switch (INTERSECTED.type) {
          case 'robot':
            clearrobotInfoWindow()
            break
          case 'waypoint':
            INTERSECTED.object.changeMaterial('mouseleave')
            break
          default:
        }
      }
      INTERSECTED = null
    }
  }
  function setAnimation(sceneName: any, action: any, currentHub = currentHubRef.current) {
    animationControl({
      sceneName,
      socket: socketNow,
      robots,
      prototypes,
      currentHub,
      action,
    })
  }
  function checkRobotItem() {
    const intersects = raycaster.intersectObjects(sceneNow.children, true)

    let checkValue: any

    function checkParent(object: any, robotItem: any) {
      if (object.parent) {
        if (object.parent === robotItem) {
          checkValue = object.parent
        } else {
          checkParent(object.parent, robotItem)
        }
      } else {
        return false
      }
    }

    if (intersects.length > 0) {
      if (intersects[0].object.userData.type === 'waypoint') {
        const waypoint = Waypoint.onMouseMove(intersects[0].object.userData.id)
        if (waypoint) {
          return { object: waypoint, type: 'waypoint' }
        }
      } else {
        for (const item in robots) {
          if (Object.prototype.hasOwnProperty.call(robots, item)) {
            const robotItem = robots[item]
            if (robots[item].object) {
              checkParent(intersects[0].object, robotItem.object)
              if (checkValue) {
                return { object: robots[item], type: 'robot' }
              }
            }
          }
        }
      }
    }
    return false
  }
  function listenVisible() {
    document.addEventListener('visibilitychange', function () {
      // 页面变为不可见时触发
      if (document.visibilityState === 'hidden') {
        clear(sceneNameRef.current)
      }
      // 页面变为可见时触发
      if (document.visibilityState === 'visible') {
        setAnimation(sceneNameRef.current, 'set')
        //      connectSocket(sceneNameRef.current)
      }
    })
  }
  function drawRobotPointer(robot: any) {
    const pointer = robot.object.children.find((i: any) => {
      return i.name === 'pointer'
    })
    if (!pointer) {
      const p = new Pointer({})
      p.setPosition(90)
      p.object.parent = robot.object
      robot.object.children.push(p.object)

      // sceneNow.add(p.object)
      mouseSelected.current = p
    }
  }
  function clearRobotPointer() {
    if (mouseSelected.current && !selectedItem) {
      const pointer = mouseSelected.current

      if (pointer) {
        const robot = pointer.object.parent
        const index = robot.children.indexOf(pointer.object)
        robot.remove(pointer.object)
        // robot.children.splice(index,1)
        pointer.dispose()
        mouseSelected.current = undefined
      }
    }
  }

  function onMouseBuilding() {
    //   console.log(renderer)
    const build = Building.buildings.find((build: any) => {
      return build.name === 'centerBuilding'
    })

    if (build) {
      const mesh = build.object

      const intersects = raycaster.intersectObjects([mesh])

      if (intersects.length > 0) {
        if (intersects[0].object === mesh) {
          const originColor: any = {}
          mesh.material.color.getHSL(originColor)
          const color = new THREE.Color()
          color.setHSL(originColor.h, originColor.s, 1)

          mesh.material.color = color
        }
      } else {
        mesh.material.color = new THREE.Color(0x5adbc9)
      }
    }
  }

  function animate() {
    raf = requestAnimationFrame(animate)

    controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
    raycaster.setFromCamera(mouse, camera)
    raycasterClick.setFromCamera(mouse, camera)
    process.env.NODE_ENV !== 'production' && stats.update()
    renderer.render(sceneNow, camera)
    TWEEN.update()
    const delta = clock.getDelta()

    for (const item in robots) {
      if (robots[item].mixer) {
        robots[item].mixer.update(delta)
      }
    }
    if (sceneNameRef.current === 'BuildingArea') {
      const { robots } = OutdoorArea.outdoorArea
      for (const item in robots) {
        if (robots[item].mixer) {
          robots[item].mixer.update(delta)
        }
      }
    }
    const sceneItem = scenes.find((i: any) => {
      return i.name === sceneNameRef.current
    })

    if (sceneItem) {
      sceneItem.updates.forEach((fn: any) => {
        fn()
      })
    }
    if (selectedItemRef.current) {
      const id = selectedItemRef.current.id

      // console.log(selectedItem?.updateTime)

      if (robots[id] && robots[id].updateTime !== selectedItemRef.current.updateTime)
        setSelectedItem({ ...robots[id] })
    }
  }
  function cameraControl(sceneName: any) {
    const currentHub = currentHubRef.current
    switch (sceneName) {
      case 'IndoorArea':
        controls.enablePan = true
        if (currentHub.id === 'e90d7310-959c-4948-bf09-c67e93600848') {
          camera.position.set(200, 1400, 3100)
        } else {
          camera.position.set(900, 3400, 6100)
        }
        controls.target.set(0, 250, 0)
        controls.maxDistance = Infinity
        break
      case 'BuildingArea':
        controls.enablePan = true
        controls.enableRotate = true
        controls.autoRotateSpeed = 1
        controls.autoRotate = true
        eventBus.emit('setThreeViewIconSwitch', true)
        setAutoRotate(true)
        controls.maxDistance = 4000
        if (currentHub.id === 'e90d7310-959c-4948-bf09-c67e93600848') {
          camera.position.set(1000, 280, 1000)
        } else {
          camera.position.set(500, 180, 500)
        }
        controls.target.set(0, 0, 0)
        break
      case 'RobotExhibit':
        camera.fov = 45
        controls.enablePan = false
        controls.autoRotateSpeed = 2
        camera.position.set(30, 4, 0)
        controls.target.set(0, 0, 0)
        controls.maxDistance = 200
        break
      default:
        null
    }
  }

  function setToScene(value: any) {
    const item = scenes.find((i: any) => {
      return i.name === value
    })
    if (value !== sceneName) {
      sceneNow = item.scene
      setSceneName(item.name)

      cameraControl(item.name)

      if (item.name === 'IndoorArea') {
        setAnimation(value, 'set')
        setBigRobotItem(undefined)
      } else if (value === 'BuildingArea') {
        setAnimation(value, 'set')
        setBigRobotItem(undefined)
      } else {
        clear(sceneName)
        //   setAnimation(value, 'clear')
      }
    }
  }

  function backToHome() {
    setSelectedItem(undefined)
    if (sceneName === 'BuildingArea') {
      cameraControl('BuildingArea')
    } else {
      setToScene('BuildingArea')
      setDisplayWindow(false)
    }
  }
  function clear(sceneName: any) {
    robots = {}
    setAnimation(sceneName, 'clear')
    // unlistenSockets('leave')
    if (sceneName === 'IndoorArea') {
      Floor.traverse((floor: any) => {
        floor.clearMachines()
      })
    } else if (sceneName === 'BuildingArea') {
      OutdoorArea.outdoorArea.clearMachines()
    }
  }
  useEffect(() => {
    if (controls) {
      controls.autoRotate = autoRotate
    }
  }, [autoRotate])

  const handleAutoRotate = () => {
    setAutoRotate(!autoRotate)
  }
  const activateScreen = () => {
    setShowScene(true)
    GetMachineObject({ setMachineObjects })
    initSceneSetter()
  }
  useEffect(() => {
    if (menuKey === ScreenMenuKeyEnum.autoRotate) {
      handleAutoRotate()
    }
    if (menuKey === ScreenMenuKeyEnum.backHome) {
      backToHome()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuKey, menuCount])

  return (
    <Fragment>
      <div className={css['big-3dScene']} id="big-3dScene"></div>
      {!showScene && process.env.UMI_ENV !== 'deploy' ? (
        <div className={css['scene-but']}>
          <Button onClick={activateScreen}>开启3d地图界面</Button>
        </div>
      ) : null}
      {sceneName === 'RobotExhibit' ? (
        <RobotDisplay bigRobotItem={bigRobotItem} camera={camera} controls={controls} />
      ) : null}

      {sceneName === 'IndoorArea' ? <FloorDisplay currentHub={currentHub} /> : null}
      {selectedItem && (
        <DeviceControlPanel selectedItem={selectedItem} closeControlModal={closeControlModal} />
      )}
      {/* <DeviceControlPanel  /> */}

      {/* {sceneName === 'bigRobot'?  <LightSetter
      scene = {sceneNow}
       sceneName = {sceneName}/>
    :null} */}
      {/* <canvas id="robotInfo-window"></canvas> */}
    </Fragment>
  )
}

const mapStateToProps = ({ sceneSetter, mqtt, user, screen }: any) => ({
  renderer: sceneSetter.renderer,
  camera: sceneSetter.camera,
  controls: sceneSetter.controls,
  scenes: sceneSetter.scenes,
  composer: sceneSetter.composer,
  socket: mqtt.socket,
  currentHub: user.currentHub,
  menuKey: screen.menuKey,
  menuCount: screen.menuCount,
})

const mapDispatchToProps = (dispatch: any) => ({
  initSceneSetter() {
    dispatch({
      type: 'sceneSetter/initSceneSetter',
    })
  },
  clearState() {
    dispatch({
      type: 'sceneSetter/clearState',
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ThreeScene)
