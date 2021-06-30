import { useSelector } from 'umi'
import {
  robotsAnimation,
  elevatorControl,
  outsideRobotsAnimation,
  hiveStaticControl,
  XuzhourobotsAnimation
} from '../index'

// const prototypes = {}

export default function AnimationControl({
  sceneName,
  socket,
  sceneNow,
  currentHub,
  robots,
  prototypes,
  action,
}: any) {
  init()
 
  function init() {
    switch (action) {
      case 'set':
    //    checkObject()
        break
      case 'clear':
   //     unlistenSockets('clear')
        break
      default:
    //    unlistenSockets('clear')
    }
  }
  function checkObject() {
    if (prototypes.candleLight) {
      connectSocket(sceneName)
    }
  }

  function unlistenSockets(sceneName: any) {
    const unlistenInside = () => {
      const baseRobotUrl = '/robot-info-production/'
      const baseHiveUrl = '/hive-info-production/'
      const baseElevator = '/active-production/Elevator/'
      // Floor.traverse((floor: any) => {
      //   if (socket) {
      socket.unListen(baseHiveUrl + currentHub.id + '/#')
      socket.unListen(baseRobotUrl + currentHub.id + '/#')
      //     socket.unListen(baseElevator + currentHub.id+'/#')
      //   }
      // })
    }
    const unlistenOutside = () => {
      const topic = '/robot-info-production/'
      socket.unListen(topic + currentHub.id + '/outdoor/#')
    }
    switch (sceneName) {
      case 'IndoorArea':
        unlistenOutside()
        break
      case 'BuildingArea':
        unlistenInside()
        break
      case 'RobotExhibit':
        unlistenOutside()
        unlistenInside()
        break
      default:
        unlistenOutside()
        unlistenInside()
    }
  }
  function connectSocket(sceneName: any) {
    unlistenSockets(sceneName)
    // socket.unListen(topicOfRobotOnFloor)
    if (sceneName === 'IndoorArea') {
      console.log(currentHub.id)
      if(currentHub.id === "ad0aece3-6520-4b2e-b038-4a5b0ddcb57c"){
        XuzhourobotsAnimation({
          socket,
          robots,
          currentHub,
          prototypes,
        })
      }else{
        robotsAnimation({
          socket,
          robots,
          currentHub,
          prototypes,
        })
      }
   
      hiveStaticControl({
        prototypes,
        currentHub,
      })
      // elevatorControl({
      //   socket,currentHub
      // })
    } else if (sceneName === 'BuildingArea') {
      outsideRobotsAnimation({
        scene: sceneNow,
        socket,
        currentHub,
        prototypes,
      })
    }
  }
}

