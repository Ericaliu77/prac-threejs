import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'umi'
import * as THREE from 'three'
import { throttle } from 'lodash'
import {
  loadBigRobot,
  loadBuildingArea,
  loadXuzhouInside,
  BlockDisplay,
  LightSetter,
  RobotDisplay,
  DeviceControlPanel,
  animationControl,
  GetMachineObject,
} from './components/index'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import InteriorListener from './listen/InteriorListener'
import { Button, Modal } from 'antd'
import {
  BigRobot,
  Floor,
  Pointer,
  Scene,
  Building,
  OutdoorArea,
} from '../../models/threeModels/index'
import { NavigationStateStr } from '@/constants'
import eventBus from '@/utils/eventBus'
import { moveRobot } from '@/services/api/aurora/screen-indoor'
import css from './index.less'
import { ScreenMenuKeyEnum } from '../../models/screen'

const prototypes = {}
let raf: any
let stats: any
let sceneNow: any
const move: any = {}
const scenes: any = [
  {
    name: 'IndoorArea',
    fn: loadXuzhouInside,
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

let robots: any = {}
let rendererNow: any
export const ThreeScene = (props: any) => {
  const [sceneName, setSceneName] = useState<any>()
  const [autoRotate, setAutoRotate] = useState<any>(true)
  const [refresh, setRefresh] = useState<any>()
  const [bigRobotItem, setBigRobotItem] = useState<any>()
  const [prototypesDone, setPrototypesDone] = useState<boolean>(false)
  const [showScene, setShowScene] = useState<any>(false)
  const sceneNameRef = useRef()
  const clock = new THREE.Clock()
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
    if (process.env.UMI_ENV === 'deploy') {
      initSceneSetter()
    }
    GetMachineObject({ setMachineObjects })
    eventBus.on('bigRobotShow', (data) => {
      setBigRobotItem(data)
      //  setDisplayWindow(true)
    })
    return () => {
      if (rendererNow) {
        //      unmount()
      }
    }
  }, [])
  const getObjects = (value: any, name: any) => {
    const item = scenes.find((i: any) => {
      return i.name === name
    })
    item.objects.push(value)
  }
  function initScene() {
    for (let i = 0; i < scenes.length; i += 1) {
      const item = scenes[i]
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x272727)
      item.fn({
        renderer,
        camera,
        controls,
        scene,
        composer,
        currentHub,
        reLoad: reflashWindow,
        addObjects: getObjects,
        addUpdates: addUpdateFun,
      })
      item.scene = scene
    }
    setToScene('IndoorArea')
    //    listenVisible()
  }
  function reflashWindow(value: any) {
    if (value === 'loadInside') {
      setRefresh(true)
    }
  }
  function addUpdateFun(callback: any, sceneName: any) {
    const item = scenes.find((i: any) => {
      return i.name === sceneName
    })
    item.updates.push(callback)
  }

  function cameraControl(sceneName: any) {
    switch (sceneName) {
      case 'IndoorArea':
        controls.enablePan = true
        controls.autoRotateSpeed = 1
        controls.autoRotate = true
        if (currentHub.id === 'e90d7310-959c-4948-bf09-c67e93600848') {
          camera.position.set(200, 1400, 3100)
        } else {
          camera.position.set(900, 3400, 6100)
        }
        controls.target.set(0, 250, 0)
        controls.maxDistance = Infinity
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
  useEffect(() => {
    controls.autoRotate = autoRotate
  }, [autoRotate])
  function setAnimation(sceneName: any, action: any) {
    animationControl({
      sceneName,
      socket,
      sceneNow,
      robots,
      prototypes,
      currentHub,
      action,
    })
  }
  function clear(sceneName: any) {
    robots = {}
    setAnimation(sceneName, 'clear')
    // unlistenSockets('leave')
    if (sceneName === 'IndoorArea') {
      Floor.traverse((floor: any) => {
        floor.clearMachines()
      })
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
      } else if (value === 'RobotExhibit') {
        clear(sceneName)
        //   setAnimation(value, 'clear')
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
  const setScreen = () => {
    if (renderer) {
      document.getElementById('big-3dScene')?.appendChild(renderer.domElement)
      //     window.addEventListener('pointermove', throttle(onmousemove, 100))
      // document.getElementById('big-3dScene')?.addEventListener('pointerup', onPointerUp)
      window.addEventListener('resize', onWindowResize)

      //    setRender()
      animate()
    }
  }

  function animate() {
    raf = requestAnimationFrame(animate)

    controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
    raycaster.setFromCamera(mouse, camera)
    raycasterClick.setFromCamera(mouse, camera)
    process.env.NODE_ENV !== 'production' && stats.update()
    renderer.render(sceneNow, camera)

    const delta = clock.getDelta()

    for (const item in robots) {
      if (robots[item].mixer) {
        robots[item].mixer.update(delta)
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
  useEffect(() => {
    if (renderer) {
      rendererNow = renderer
      init()
      setScreen()
    }
  }, [renderer])
  const activateScreen = () => {
    setShowScene(true)
    initSceneSetter()
  }
  function setMachineObjects(datas: any) {
    datas.forEach((data: any) => {
      prototypes[data.name] = data
    })
    setPrototypesDone(true)
    //
    //  checkObject(sceneNameRef.current)
  }
  useEffect(() => {
    sceneNameRef.current = sceneName
  }, [sceneName])
  useEffect(() => {
    if (prototypesDone) {
      setAnimation(sceneNameRef.current, 'set')
    }
  }, [prototypesDone])
  const backToHome = () => {
    if (sceneName === 'IndoorArea') {
      cameraControl('IndoorArea')
    } else {
      setToScene('IndoorArea')
    }
  }
  const handleAutoRotate = () => {
    setAutoRotate(!autoRotate)
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
    <div style={{ position: 'relative' }}>
      <div className={css['big-3dScene']} id="big-3dScene"></div>
      {!showScene && process.env.UMI_ENV !== 'deploy' ? (
        <div className={css['scene-but']}>
          <Button onClick={activateScreen}>开启3d地图界面</Button>
        </div>
      ) : null}
      {sceneName === 'RobotExhibit' ? (
        <RobotDisplay bigRobotItem={bigRobotItem} camera={camera} controls={controls} />
      ) : null}
      {sceneName === 'IndoorArea' ? (
        <BlockDisplay currentHub={currentHub} refresh={refresh} />
      ) : null}
      {/* {selectedItem && (
            <DeviceControlPanel selectedItem={selectedItem} closeControlModal={closeControlModal} />
          )} */}
      {/* <DeviceControlPanel  /> */}

      {/* {sceneName === 'bigRobot'?  <LightSetter
          scene = {sceneNow}
           sceneName = {sceneName}/>
        :null} */}
      {/* <canvas id="robotInfo-window"></canvas> */}
    </div>
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
