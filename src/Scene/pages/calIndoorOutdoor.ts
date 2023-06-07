import * as THREE from "three";

export default function calIndoorOutdoor() {

    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x272727);
    scene.add(new THREE.AxesHelper(1200));
    const waypoints = {
        waypoint1: {
            coordinates: [
                -0.874772573302335,
                -0.00800858652127159,
                -1.55026542435115,
                -1.91683075937569,
                0.00902860115933228,
                0.00655739567130894,
                -0.818229654138186,
                0.574783192179469

            ],
            indoorCoordinates: [
                5.778543428995684,
                -12.471078329793198,
                0,
                2.9913481807423405,
                0,
                0,
                0.9971796515229127,
                0.07505159950755448
            ],
        },
        waypoint2: {
            coordinates: [
                1.512322315838,
                0.533131285103963,
                -1.56911816454441,
                -2.00204583744994,
                0.0147917601448093,
                0.00934349597670181,
                -0.841895405242082,
                0.539357052004535

            ],
            indoorCoordinates: [
                7.413166306034508,
                -14.720985102711786,
                0,
                3.0187165891579526,
                0,
                0,
                0.9981132776842464,
                0.06139938851821298
            ],
        },
        waypoint3: {
            coordinates: [
                0.742440807103833,
                -1.14591891437795,
                -1.58157627164708,
                -1.96297084405222,
                0.0106055435723167,
                0.00536795456022568,
                -0.831274527158189,
                0.55573498001053

            ],
            indoorCoordinates: [
                5.258623526270005,
                -14.344861898012507,
                0,
                3.0050818158629085,
                0,
                0,
                0.9976715031090423,
                0.06820243312481036

            ],
        }
    }
    function calTran() {
        const { waypoint1, waypoint2, waypoint3 } = waypoints
        const rate1 = calRate(waypoint1, waypoint2)
        const rate2 = calRate(waypoint2, waypoint3)
        const rate3 = calRate(waypoint3, waypoint1)
        const diffX3 = waypoint2.coordinates[0] - waypoint1.coordinates[0]
        const diffY3 = waypoint2.coordinates[1] - waypoint1.coordinates[1]

        const endX = diffX3 * rate3[0] + waypoint1.indoorCoordinates[0]
        const endY = diffY3 * rate3[1] + waypoint1.indoorCoordinates[1]
        console.log(diffX3,diffY3)

        console.log(rate1, rate2, rate3)
        console.log('end', endX, endY)


    }
    function calRate(p1: any, p2: any) {
        const diffX1 = p2.indoorCoordinates[0] - p1.indoorCoordinates[0]
        const diffY1 = p2.indoorCoordinates[1] - p1.indoorCoordinates[1]
        const diffX2 = p2.coordinates[0] - p1.coordinates[0]
        const diffY2 = p2.coordinates[1] - p1.coordinates[1]


        const rateX = diffX1 / diffX2
        const rateY = diffY1 / diffY2

        return [rateX, rateY]

    }
    function calTT1( point1: any,point2: any){
        const { waypoint1, waypoint2, waypoint3 } = waypoints


        //以waypoint1为新原点  waypoint.indoorCoordinates = [0,0]

        //waypoint2相对于waypoint1原点坐标系为
        const point1X = point2.coordinates[0]-point1.coordinates[0]
        const point1Y = point2.coordinates[1]-point1.coordinates[1]

        //旋转角
        const angle1 = (point1.coordinates[3]-point1.indoorCoordinates[3]);
     
        //旋转后  waypoint2坐标
        const point1XX = point1X * Math.cos(angle1)+point1Y * Math.sin(angle1);
        const point1YY = point1Y * Math.cos(angle1)-point1X * Math.sin(angle1);
        console.log(angle1)
    
        const diffX1 = point1XX
        const diffY1 = point1YY
        const diffX2 = point2.indoorCoordinates[0] - point1.indoorCoordinates[0]
        const diffY2 = point2.indoorCoordinates[1] - point1.indoorCoordinates[1]


        const rateX = diffX1 / diffX2
        const rateY = diffY1 / diffY2

        
    }
    function calTT( point1: any,point2: any){
        const { waypoint1, waypoint2, waypoint3 } = waypoints


        //以waypoint1为新原点  waypoint.indoorCoordinates = [0,0]
      //  const[ox,oy] = [waypoint1.indoorCoordinates[0],waypoint1.indoorCoordinates[1]];
        //waypoint2相对于waypoint1原点坐标系为
        const point1X = point2.indoorCoordinates[0]-point1.indoorCoordinates[0]
        const point1Y = point2.indoorCoordinates[1]-point1.indoorCoordinates[1]
        console.log('pp',point1X,point1Y)
        //旋转角
        //const angle1 = -(point1.indoorCoordinates[3]-point1.coordinates[3]);
        const angle1 = 1.8791697730180994
        //旋转后  waypoint2坐标
        const point1XX = point1X * Math.cos(angle1)+point1Y * Math.sin(angle1);
        const point1YY = point1Y * Math.cos(angle1)-point1X * Math.sin(angle1);
        console.log(angle1)
    
        const diffX1 = point1XX
        const diffY1 = point1YY
        const diffX2 = point2.coordinates[0] - point1.coordinates[0]
        const diffY2 = point2.coordinates[1] - point1.coordinates[1]


        const rateX = diffX1 / diffX2
        const rateY = diffY1 / diffY2
        
        console.log(diffX1,diffX2,diffY1,diffY2)
        console.log(rateX,rateY,'new');


        
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
    const loadGound = () => {
        const loader = new THREE.TextureLoader()

        const url = "floor/floor1.png"
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
            side: THREE.DoubleSide,
            opacity: 0.91,
        })
        const groundPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(1314, 1175),
            boxProjectedMat,
        )
        groundPlane.rotateX(-Math.PI / 2)

        groundPlane.position.set(0, 0, 0)

        scene.add(groundPlane)
        return groundPlane
    }
    function init() {
        loadGound()
        initLight()
        calTran()
        calTT(waypoints.waypoint2,waypoints.waypoint1)
        calTT(waypoints.waypoint2,waypoints.waypoint3)
        calTT1(waypoints.waypoint2,waypoints.waypoint1)
        calTT1(waypoints.waypoint2,waypoints.waypoint3)
    }
    init()

    return scene
}



