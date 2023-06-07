import * as THREE from "three";

export default function waypointObject(renderer: any, camera: any, controls: any) {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x272727);
    scene.add(new THREE.AxesHelper(200));
    function initLight() {
        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(1, 1, 1);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x002288);
        dirLight2.position.set(-1, -1, -1);
        scene.add(dirLight2);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
    }
    function createModel() {
        const poseObject = new THREE.Object3D()
        const geometryT = new THREE.CylinderGeometry(0, 6, 6, 4);
        const geometryB = new THREE.CylinderGeometry(6, 0, 12, 4);
        const material = new THREE.MeshNormalMaterial({});
        const cylinderT = new THREE.Mesh(geometryT, material);
        cylinderT.position.set(0, 3, 0)
        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true });

        let wireframeT = new THREE.Mesh(geometryT, wireframeMaterial);
        cylinderT.add(wireframeT)
        const cylinderB = new THREE.Mesh(geometryB, material);
        cylinderB.position.set(0, -6, 0)
        let wireframeB = new THREE.Mesh(geometryB, wireframeMaterial);
        cylinderB.add(wireframeB)
        poseObject.add(cylinderT);
        poseObject.add(cylinderB)
        scene.add(poseObject)
    }
    function create() {

        const arcShapeDown = new THREE.Shape()
            .moveTo(0, 0)
            .absarc(0, 0, 7, 0, Math.PI * 2, false);
        const arcShape = new THREE.Shape()
            .moveTo(0, 0)
            .absarc(0, 0, 15, 0, Math.PI * 2, false);


        const holePath = new THREE.Path()
            .moveTo(20, 10)
            .absarc(10, 10, 10, 0, Math.PI * 2, true);

        arcShape.holes.push(holePath);

        addLineShape(arcShapeDown, 0xffffff, 0, 0, 0, Math.PI / 2, 0, 0, 1);

        addLineShape(arcShape, 0xffffff, 0, 60, 0, Math.PI / 2, 0, 0, 1);
        createLine()
        addShape()
        //   addLineShape(arcShape.holes[0], 0x804000, 150, 0, 0, 0, 0, 0, 1);

        //    addLineShape(circleShape, 0x00f000, 120, 250, 0, 0, 0, 0, 1);
    }
    const createLine = () => {
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff
        });

        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(0, 60, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const line = new THREE.Line(geometry, material);
        scene.add(line);
    }
    function addLineShape(shape: THREE.Shape, color: number, x: number, y: number, z: number, rx: number, ry: number, rz: number, s: number) {
        let group;
        group = new THREE.Group();
        group.position.y = 0;
        scene.add(group);
        // lines

        shape.autoClose = true;

        const points = shape.getPoints();
        const spacedPoints = shape.getSpacedPoints(50);

        const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
        const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints(spacedPoints);

        // solid line

        let line = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({ color: color }));
        line.position.set(x, y, z);
        line.rotation.set(rx, ry, rz);
        line.scale.set(s, s, s);
        group.add(line);

        // line from equidistance sampled points

        line = new THREE.Line(geometrySpacedPoints, new THREE.LineBasicMaterial({ color: color }));
        line.position.set(x, y, z + 25);
        line.rotation.set(rx, ry, rz);

        line.scale.set(s, s, s);
        //      group.add(line);

        // vertices from real points


    }
    function addShape() {
        const unit = 5;

        // const triangleShape = new THREE.Shape()
        //     .moveTo(0.25 * unit, 0.5 * unit)
        //     .lineTo(1.75 * unit, 3.5 * unit)
        //     .quadraticCurveTo(2 * unit, 4 * unit, 1.5 * unit, 4 * unit)
        //     .lineTo(-1.5 * unit, 4 * unit)
        //     .quadraticCurveTo(-2 * unit, 4 * unit, -1.75 * unit, 3.5 * unit)
        //     .lineTo(-0.25 * unit, 0.5 * unit)
        //     .quadraticCurveTo(0, 0, 0.25 * unit, 0.5 * unit); // close path
        const triangleShape = new THREE.Shape()
            .moveTo(0.25 * unit, 0.25 * unit)
            .lineTo(1.75 * unit, 3.5 * unit)
            .quadraticCurveTo(2 * unit, 4 * unit, 1.5 * unit, 4 * unit)
            .lineTo(-1.5 * unit, 4 * unit)
            .quadraticCurveTo(-2 * unit, 4 * unit, -1.75 * unit, 3.5 * unit)
            .lineTo(-0.25 * unit, 0.5 * unit)
            .quadraticCurveTo(0, 0, 0.25 * unit, 0.5 * unit); // close path
        // const triangleShape = new THREE.Shape()
        //     .moveTo(unit, (-Math.sqrt(3) * unit / 3))
        //     .lineTo(0, Math.sqrt(3) * unit * (2 / 3))
        //     //       .quadraticCurveTo(2 * unit, 4 * unit, 1.5 * unit, 4 * unit)
        //     .lineTo(- unit, (-Math.sqrt(3) * unit / 3))
        //     .quadraticCurveTo(-2 * unit, 4 * unit, -1.75 * unit, 3.5 * unit)
        //   .lineTo(-0.25 * unit, 0.5 * unit)
        //   .quadraticCurveTo(0, 0, 0.25 * unit, 0.5 * unit); // close pat
        let geometry = new THREE.ShapeGeometry(triangleShape);

        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide }));
        mesh.position.set(0, 60, -2.5 * unit);
        mesh.rotation.set(Math.PI / 2, 0, 0);

        scene.add(mesh);

    }
    function animation() {

    }
    initLight();
    createModel();
    //create()

    return scene;
}