import { Floor } from '../../../../models/threeModels/Floor'
import { Hive } from '../../../../models/threeModels/index'
import * as THREE from 'three'
import { calMapOriginDeviation, WSG84TOMercatorCenter } from '../../../../utils/CoordinateTool'
import { getRobotsData, getHivesData } from '@/services/api/aurora/screen-indoor'

export default function hiveStaticControl({ currentHub, prototypes }: any) {
  let buildingId = '0ad080f8-938f-4cda-8aa1-00727f409964'
  if (currentHub.id === 'cefbcf55-f582-4609-8803-dc4b4f6b3607') {
    buildingId = '8260149d-4cca-482b-972f-ae9f700f4503'
  }
  const init = () => {
    const floors: any = []
    // Floor.floors.forEach((floor: any) => {
    //   floors.push(floor.id)
    // })
    Floor.traverse((floor: any) => {
      floors.push(floor.id)
    })
    getInitialData(floors)
  }

  async function getInitialData(floorId: any) {
    const { data } = await getHivesData({
      // buildingId,
      // floorId,
      hubId: currentHub.id,
      page: 0,
      pageSize: 500,
    })
    data.forEach((hiveItem: any) => {
      if (!hiveItem.robot) {
        showHive(hiveItem)
      }
    })
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
  function checkHiveType(mode: any) {
    switch (mode) {
      case 'GUIDE':
        return prototypes['hiveGuide']
      case 'STERILIZATION':
        return prototypes['hiveClean']
      case 'PRIVATE_SHARED':
        return prototypes['hiveMedical4']
      default:
        return prototypes['hiveDelivery6']
    }
  }
  function calMapOutdoorDeviation(item: any, floor: any) {
    const indoorCoor = [3.013267469793206, 0.18684188836577853]
    const dd = [-5.998693788802345, 0.9404211764567036]
    // console.log(calMapOriginDeviation(dd, floor))
    const a = WSG84TOMercatorCenter({ lng: item.location[1], lat: item.location[0] }, [
      117.6158988847576,
      34.07572372171962,
    ])
    //  console.log(calMapOriginDeviation(indoorCoor, floor))
    //  console.log(calMapOriginDeviation([-a[0], a[1]], floor))
    ///  console.log(calMapOriginDeviation([-6, a[0]], floor))

    const cc = [indoorCoor[0] - a[0], indoorCoor[1] - a[1]]
    //   console.log(cc, a)
    //   console.log('cctrans', calMapOriginDeviation(cc, floor))
    //  return [-a[1]+indoorCoor[0],a[0]]
    return cc
  }
  function showHive(item: any) {
    const floor = Floor.floors[item.floorId]
    if (floor && item.coordinates) {
      let geo: any
      if (item.floorId === 'd822a410-efe4-4589-bc69-06974c9050e0') {
        const cc = calMapOutdoorDeviation(item, floor)
        geo = calMapOriginDeviation(cc, floor)
        //   geo = [-1200,200]
        //        console.log(item.name, geo)
      } else if (item.dock && item.dock.qr) {
        const x = Math.sin(item.coordinates[3] - Math.PI) * 35
        const y = Math.cos(item.coordinates[3] - Math.PI) * 35
        // let pos = [item.]
        const pos = calMapOriginDeviation(item.coordinates, floor)
        geo = [pos[0] - x, pos[1] + y]
        //  console.log('guiziPoint',item.name,pos,geo,x,y)
        //     geo = calMapOriginDeviation(item.coordinates, floor)
      } else {
        geo = calMapOriginDeviation(item.coordinates, floor)
      }
      //  let hive = hiveObject.clone()
      const { id, name, coordinates, level, operationMode } = item
      const hive = new Hive({
        id,
        name,
        coordinates,
        position: [geo[0], 0.1, -geo[1]],
        level,
      })
      const prototypeObject = checkHiveType(operationMode)

      hive.object = prototypeObject.clone()
      hive.setPosition([geo[0], 0.1, -geo[1]])
      if (item.coordinates) {
        //  hive.rotationY  = item.coordinates[3]
        if (item.floorId === 'd822a410-efe4-4589-bc69-06974c9050e0') {
          hive.setRotation(item.coordinates[3] + Math.PI)
        } else {
          hive.setRotation(item.coordinates[3] + Math.PI / 2)
        }
      }
      //  const sprite = setSprite(item)
      //   sprite.parent = hive.object
      //   hive.object.children.push(sprite)
      //  sprite.name = 'nameSprite'
      //    setHivePosition(hive,geo)
      hive.setSprite(item)
      floor.robotsObject.add(hive.object)
      floor.staticHives.push(hive)
    }
  }

  init()
}
