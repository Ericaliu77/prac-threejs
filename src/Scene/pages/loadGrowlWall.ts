import * as THREE from "three";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CubeReflectionMapping } from "three";

export default function loadGrowlWall(renderer: any, camera: any, controls: any) {
    let isUserInteracting = false;
    let onPointerDownMouseX = 0
    let onPointerDownMouseY = 0
    let lat = 0
    // let lon = 176.73402572729302-90
    let lon = 354.28940686250036 - 90
    let onPointerDownLon = 0
    let onPointerDownLat = 0
    let phi = 0
    let theta = 6.1835166546884235;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x272727);
    scene.add(new THREE.AxesHelper(1200))
    const loadCylinder = () => {
        const geometry = new THREE.CylinderGeometry(0, 20, 30, 4, 1)
        const material = new THREE.MeshStandardMaterial({
            color: 0xa5a5a5,
            emissive: 0x0d8ca8,
            metalness: 0.51,
            roughness: 0.2,
            wireframe: false,
        })
        const cylinder = new THREE.Mesh(geometry, material)
        //   35.18697738647461 17.330108642578125
        cylinder.position.set(0, 50, 0)
        cylinder.rotateX(Math.PI)
        scene.add(cylinder)
    }
    const loadCube = () => {
        const width = 40
        const height = 40
        const texture = new THREE.TextureLoader().load('texture/grad.png')
        const geometry = new THREE.BoxGeometry(width, 30, height)
        const geometry1 = new THREE.BoxGeometry(width, 80, height)
        // const geometry = new THREE.CylinderGeometry(75, 75, 90, 4, 1, true);
        // const 
        const matDarkBlue = new THREE.MeshBasicMaterial({ color: 0x2d5959 })
        const materialGrad = new THREE.MeshBasicMaterial({ map: texture, color: 0x1aebbf, side: THREE.DoubleSide, transparent: true, opacity: 0.22, alphaTest: 0.01, depthTest: false })
        const materialTransparent = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
        const mesh = new THREE.Mesh(geometry, matDarkBlue)
        const mesh1 = new THREE.Mesh(geometry1, [materialGrad, materialGrad, materialTransparent, materialTransparent, materialGrad, materialGrad])
        mesh.position.y = 15
        mesh1.position.y = 40
        //  scene.add(mesh)
        mesh.rotateY(-Math.PI)
        mesh1.rotation.y = -3.1
       
        scene.add(mesh1)
        scene.add(mesh)
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
    const loadPlane = () => {

    }
    const addL = () => {
        document.addEventListener('mousedown', onDocumentMouseDown, false);

    }
    const onPointerMove = (event: any) => {
        if (event.isPrimary === false) return;

        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
        // console.log(lon, lat)
    }
    const onDocumentMouseDown = (event: any) => {
        const cameraRotation = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ')
        const llon = THREE.MathUtils.radToDeg(cameraRotation.y)
        const llat = THREE.MathUtils.radToDeg(cameraRotation.x)
        console.log(camera.quaternion, cameraRotation)
        console.log(llon, llat)
        console.log(lon - llon)
        if (event.isPrimary === false) return;
        console.log(lon, lat)
        isUserInteracting = true;

        onPointerDownMouseX = event.clientX;
        onPointerDownMouseY = event.clientY;

        onPointerDownLon = lon;
        onPointerDownLat = lat;

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    }
    const onPointerUp = (event: any) => {

        if (event.isPrimary === false) return;

        isUserInteracting = false;

        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    }

    const createCanvas = () => {
        const canvas = document.getElementById('test-canvas')
        console.log(canvas)
        const ctx = canvas.getContext('2d')
        let width
        let rate
        if (ctx) {
            ctx.font = 'Bold 20px Arial'
            const word = 'abc'
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 7
            width = ctx?.measureText(word).width
            rate = width / 300
            const distance = 2
            //   ctx.fillRect(0, 0, 300, 150)
            const rect = { x: 5, y: 5, width: 290, height: 290 }
            const r = 10
            ctx.beginPath();

            ctx.moveTo(rect.x + r, rect.y);
            ctx.lineTo(rect.x + rect.width - r, rect.y);
            ctx.arc(rect.x + rect.width - r, rect.y + r, r, Math.PI / 180 * 270, 0, false);
            ctx.lineTo(rect.x + rect.width, rect.y + rect.height - r);
            ctx.arc(rect.x + rect.width - r, rect.y + rect.height - r, r, 0, Math.PI / 180 * 90, false);
            ctx.lineTo(rect.x + r, rect.y + rect.height);
            ctx.arc(rect.x + r, rect.y + rect.height - r, r, Math.PI / 180 * 90, Math.PI / 180 * 180, false);
            ctx.lineTo(rect.x, rect.y + r);
            ctx.arc(rect.x + r, rect.y + r, r, Math.PI / 180 * 180, Math.PI / 180 * 270, false);

            ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255, 0.05)'
            ctx.fill()
            const texture = new THREE.CanvasTexture(canvas)
            // const texture = createCanvas()
            console.log(texture)
            const geometry = new THREE.PlaneGeometry(70, 70);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, color: 0x1aebbf })
            const plane = new THREE.Mesh(geometry, material)
            plane.rotateX(-Math.PI / 2)
            scene.add(plane)
        }
    }
    const loadModel = () => {

        const loader = new GLTFLoader()

        loader.load('model/light-square.gltf', (gltf) => {
            console.log(gltf.scene)
            scene.add(gltf.scene)
        })

    }
    const getNewPointOnVector = (p1: any, p2: any) => {
        let distAway = 200;
        let vector = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
        let vl = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
        let vectorLength = { x: vector.x / vl, y: vector.y / vl, z: vector.z / vl };
        let v = { x: distAway * vectorLength.x, y: distAway * vectorLength.y, z: distAway * vectorLength.z };
        return { x: p2.x + v.x, y: p2.y + v.y, z: p2.z + v.z };
    }
    function animate() {
        requestAnimationFrame(animate);
        update();
    }
    function update() {

        //     camera.position.x += 0.1
        lat = Math.max(- 85, Math.min(85, lat));
        phi = THREE.MathUtils.degToRad(90 - lat);
        theta = THREE.MathUtils.degToRad(lon);

        const lookatx = 500 * Math.sin(phi) * Math.cos(theta);
        const lookaty = 500 * Math.cos(phi);
        const lookatz = 500 * Math.sin(phi) * Math.sin(theta);
        const { x, y, z } = getNewPointOnVector(camera.position, { x: lookatx, y: lookaty, z: lookatz })
        camera.lookAt(x, y, z);

        //   renderer.render(scene, camera);

    }
    function init() {
        //   controls.enabled = false
        animate()
        addL()
        loadCylinder()
        loadCube()
        createCanvas()
        //    loadModel()
        initLight()
    }
    init()

    return scene

}