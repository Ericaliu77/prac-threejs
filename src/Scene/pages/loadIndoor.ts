import * as THREE from "three";
import axios from 'axios'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

export default function loadIndoor(renderer: any, camera: any, controls: any) {
  // const originX = 583.4130150008825
  // const originY = 468.9536147392264b

  //   const originX = -371.40754000000004 
  // const originY =-799.75512
  const originX = -336.43027232515874//-311.20070000000004//-371.40754000000004 
  const originY = 33.19811237870715// -799.75512
  // const originX = -371.40754000000004 
  //    -387.3309957071118,19.807563250729345
  // const originY =  -799.75512
  // const originRadian = -3.0947359966999843
  const originRadian = -0.08492663955195406//0.031260143839263156
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x272727);
  scene.add(new THREE.AxesHelper(1200));
  const testBox = () => {
    let object = new THREE.Object3D()
    object.position.set(0, 0, 0)
    let cubeGeometry = new THREE.BoxGeometry(40, 700, 50);
    const material = new THREE.MeshBasicMaterial({
      //  map: texture1,
      color: 0xc7ecf2,
      // specular:0x8fbbef,
      //side:THREE.DoubleSide,
      transparent: true,
      opacity: 0.42,
      //      alphaTest: 0.01,
    });
    let angle = 90;
    let cube = new THREE.Mesh(cubeGeometry,
      material)
    object.add(cube)
    scene.add(object)
    //    cube.rotateY(Math.PI / 2)

    object.position.set(originX, 350, -originY)
    setInterval(() => {
      //   object.rotateY(0.01)
      //object.rotation.y+=0.01
      //     object.rotateOnWorldAxis(new THREE.Vector3(0,1,0),Math.PI/2)
    }, 100)
    cube.updateWorldMatrix(true, true)
    //  rotateAroundWorldAxis(cube,new THREE.Vector3(0, 1, 0), Math.PI / 2)
    //    cube.rotateAroundWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
  };

  testBox()
  const getIndoorDatasN = async () => {
    const insideDatas = await axios.get('floor/info1.json')
    // console.log(insideDatas.data.floors)
    const { floors } = insideDatas.data

    for (let i = 0; i < 2; i += 1) {
      const floor = floors[i]
      const [diffX, diffY] = calOriginTrans(floor)
      console.log(diffX, diffY)
      let object = new THREE.Object3D()
      let groundMap = loadGound(floor, i, [diffX, diffY])
      object.position.set(0, 0, 0)
      // groundMap.rotateX(-Math.PI / 2)
      //reCheckPosition(groundMap, floor)
      if (floor.floorName !== '01楼') {
        // object.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
        let radian = floor.elevators[0].indoorCoordinates[3]
        //   console.log(radian - originRadian,-radian + originRadian)
        object.rotateY(originRadian - radian)
        console.log(originRadian - radian)
        object.position.set(originX, 0, -originY)
        // console.log(originX,0,-originY)
      } else {
        //   reCheckPosition(groundMap, floor)
      }
      object.add(groundMap)
      scene.add(object)
    }
    camera.position.set(0, 1200, 0)
  }

  function reCheckPosition(groundMap: any, floor: any) {

    const [diffX, diffY] = calOriginTrans(floor)
    let height = groundMap.position.y

    // 

    let radian = floor.elevators[0].indoorCoordinates[3]

    if (floor.floorName !== '01楼') {
      //  groundMap.position.set(-diffX,height,diffY)
      //  groundMap.position.set(originX-diffX,height,diffY-originY)
      let diffO = 1
      //    groundMap.rotateY(new THREE.Vector3(0, 1, 0), radian - originRadian)
      //  calTransDistance(floor,[diffX,-diffY],radian-originRadian)

    }
    groundMap.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), radian - originRadian)
    // groundMap.rotateY(radian)
    groundMap.rotateX(-Math.PI / 2)
  }

  function calOriginTrans(floor: any) {
    const x = floor.origin[0] / floor.resolution
    const y = floor.origin[1] / floor.resolution
    const xO = floor.imageWidth / 2
    const yO = floor.imageHeight / 2
    const diffX = xO - Math.abs(x)
    const diffY = yO - Math.abs(y)
    const eleX = floor.elevators[0].indoorCoordinates[0] / floor.resolution
    const eleY = floor.elevators[0].indoorCoordinates[1] / floor.resolution
    const x1 = eleX - x - xO
    const y1 = eleY - y - yO
    console.log('elev', eleX, eleY, x1, y1)
    console.log(diffX, diffY)
    //const diffX = 
    return [x1, y1]
  }
  const loadGound = (floor: any, index: any, offset: any) => {
    const loader = new THREE.TextureLoader()

    const url = "floor/" + floor.imageName
    let gMap = loader.load(url)
    gMap.wrapS = THREE.RepeatWrapping
    gMap.wrapT = THREE.RepeatWrapping
    gMap.repeat.set(1, 1)
    const boxProjectedMat = new THREE.MeshPhongMaterial({
      map: gMap,
      // emissive:0xa8a7a7,
      // emissiveIntensity:0.51,
      //   map: gMap,
      transparent: true,
      opacity: 0.91,
    })
    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(floor.imageWidth, floor.imageHeight),
      boxProjectedMat,
    )
    // floor.id === "3ad5df7a-b87f-42d8-8030-d7f0d92551eb" && groundPlane.rotateY(Math.PI/2)
    let radian = floor.elevators[0].indoorCoordinates[3]
    //  groundPlane.rotateY(radian)
    //   groundPlane.rotateX(-Math.PI / 2)

    // groundPlane.rotateY(Math.PI)

    groundPlane.rotateX(-Math.PI / 2)
    if (floor.id === "9e93da0f-d616-4563-92da-3a4d004f347b") {
      groundPlane.position.set(0, index * 500, 0)
    } else {
      groundPlane.position.set(-offset[0], index * 500, offset[1])
    }

    //  floor.level === 27 && groundPlane.position.set(-46, -2.01, -36)
    //    scene.objects.push(groundPlane)
    groundPlane.renderOrder = 2
    // scene.add(groundPlane)
    return groundPlane
  }
  function checkRadian(floor: any) {
    let radian = floor.elevators[0].indoorCoordinates[3]
  }
  function calOriginLTrans(point1: any, point2: any, point1L: any, point2L: any, MerPoint1: any, MerPoint2: any) {
    const difX1 = Math.abs(point1[0] - point2[0])
    const difY1 = Math.abs(point1[1] - point2[1])
    const difX2 = Math.abs(point1L[0] - point2L[0])
    const difY2 = Math.abs(point1L[1] - point2L[1])
    const diffX2 = Math.abs(MerPoint1[0] - MerPoint2[0])
    const diffY2 = Math.abs(MerPoint1[1] - MerPoint2[1])
    const rateX = difX2 / difX1
    const rateY = difY2 / difY1
    const a = Math.abs(point1[0]) * rateX
    const b = Math.abs(point1[1]) * rateY
    const aa = Math.abs(point2[0]) * rateX
    const bb = Math.abs(point2[1]) * rateY
    const orginX1 = point1L[0] + a
    const orginY1 = point1L[1] - b
    const orginX2 = point2L[0] - aa
    const orginY2 = point2L[1] + bb
    // const rateX = diffX2/difX1
    // const rateY = diffY2/difY1
    // const a = Math.abs(point1[0])*rateX
    // const b = Math.abs(point1[1])*rateY
    // const aa = Math.abs(point2[0])*rateX
    // const bb = Math.abs(point2[1])*rateY
    // const orginX1 = MerPoint1[0]+a
    // const orginY1 = MerPoint1[1]-b 
    // const orginX2 = MerPoint2[0]-aa
    // const orginY2 = MerPoint2[1]+bb 
    console.log('difX', difX1, difX2, diffX2)
    console.log('difY', difY1, difY2, diffY2)
    console.log('rate', rateX, rateY)
    console.log('origin', orginX1, orginY1, orginX2, orginY2)
  }
  testCal()
  function testCal() {
    let location1 = [34.075722988746286, 117.61590131074021]
    let coordinate1 = [3.013267469793206, 0.18684188836577853]

    let location2 = [34.075723413176796, 117.61591570292198]
    let coordinate2 = [1.7841253398223245, 0.29993394425704967]

    let location3 = [34.075723290655596, 117.61592610477156]
    let coordinate3 = [0.5591712847953989, 0.4082172141329945]

    let location4 = [34.07572439116103, 117.61594099395855]
    let coordinate4 = [-0.7564640011526729, 0.5449893642988224]

    function teset(loca1: any, coor1: any, loca2: any, coor2: any, loca3: any, coor3: any) {
      let a = (loca1[0] - loca2[0]) / (coor1[0] - coor2[0])
      let b = (loca1[1] - loca2[1]) / (coor1[1] - coor2[1])

      let A = (coor1[0] - coor2[0]) / (loca1[0] - loca2[0])
      let B = (coor1[1] - coor2[1]) / (loca1[1] - loca2[1])

      let location_origin = [loca1[0] - a * coor1[0], loca1[1] - b * coor1[1]]
      let coordinate_origin = [coor1[0] - A * loca1[0], coor1[1] - B * loca1[1]]
      let cc = 0
      let test3 = [A * (loca3[0] - loca1[0]), (loca3[1] - loca1[1]) * B]
      let test33 = [A * (loca3[0] - loca1[0]), (loca3[1] - loca1[1]) * B]
      console.log("test3", test3, loca3)
      console.log('cc', cc)
      console.log(`factor: [${[a, b]}]`)
      console.log(`origin: [${location_origin}]`)
      console.log(`FACTOR: [${[A, B]}]`)
      console.log(`ORIGIN: [${coordinate_origin}]`)

      function ndt2gps(x: number, y: number) {
        const fx = a;//-3.8494384749396615e-7;
        const fy = b;//0.0001032053751769962;
        const gx = location_origin[0];//34.075724099964866;
        const gy = location_origin[1];//117.61588474812673;

        return [gx + fx * x, gy + fy * y];
      }

      function gps2ndt(lat: number, lon: number) {
        const fx = A;//-2688028.973883969
        const fy = B;//9025.162045335941
        const gx = coordinate_origin[0];//91596533.71306151
        const gy = coordinate_origin[1];//-1061502.381595782

        return [gx + fx * lat, gy + fy * lon];
      }
      const ll = [34.07569368366657, 117.61557034387587]

      console.log(ndt2gps(coor3[0], coor3[1]))
      console.log(loca3)
      console.log(gps2ndt(loca3[0], loca3[1]))
      console.log(coor3, 'll', loca3)
      console.log(gps2ndt(ll[0], ll[1]))
      console.log(coor3, 'll', ll)
    }

    // teset(location1, coordinate1, location2, coordinate2, location3, coordinate3)
    // teset(location1, coordinate1, location4, coordinate4, location3, coordinate3)
  }
  function calOrigin() {
    const point1 = [-0.7564640011526729, 0.5449893642988224]
    let point1L = [34.07572424096615, 117.61594066164662,]
    let point2 = [0.5591712847953989, 0.4082172141329945,]
    let point2L = [34.075723290655596, 117.61592610477156]
    const point3 = [1.7841253398223245, 0.29993394425704967,]
    const point3L = [34.075723266986444, 117.6159138839323]
    const point4 = [3.013267469793206, 0.18684188836577853]
    const point4L = [34.07572372171962, 117.6158988847576]
    let MerPoint1 = WSG84TOMercator({
      lng: point1L[1],
      lat: point1L[0]
    })
    let MerPoint2 = WSG84TOMercator({
      lng: point2L[1],
      lat: point2L[0]
    })
    let MerPoint3 = WSG84TOMercator({
      lng: point3L[1],
      lat: point3L[0]
    })
    let MerPoint4 = WSG84TOMercator({
      lng: point4L[1],
      lat: point4L[0]
    })
    let calPoint1 = point1
    let calPoint2 = point4
    let calPointL1 = point1L
    let calPointL2 = point4L
    const dis1 = Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
    const dis2 = Math.sqrt(Math.pow(point1L[0] - point2L[0], 2) + Math.pow(point1L[1] - point2L[1], 2))
    const dis3 = Math.sqrt(Math.pow(MerPoint1[0] - MerPoint2[0], 2) + Math.pow(MerPoint1[1] - MerPoint2[1], 2))
    calOriginLTrans(point1, point4, point1L, point4L, MerPoint1, MerPoint4)
    console.log('dis', dis1, dis2, dis3)

  }
  function WSG84TOMercator(geo: any) {
    const lon = geo.lng
    const { lat } = geo
    const x = (lon * 20037508.34) / 180
    let y = (Math.PI / 180.0) * lat
    const tmp = Math.PI / 4.0 + y / 2.0
    y = (20037508.3427892 * Math.log(Math.tan(tmp))) / Math.PI

    return [x, y]
  }
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
  getIndoorDatasN()
  // calOrigin()
  initLight()
  //  loadData()
  return scene;
}