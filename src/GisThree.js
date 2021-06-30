// import React, { Component, Fragment } from 'react';
// import './GisThree.less';
// import OBJLoader from './threejsLibs/OBJLoader';
// import Orbitcontrols from './threejsLibs/OrbitControls';
// import MTLLoader from './threejsLibs/MTLLoader_module';
// import { Icon } from 'antd';

// import exhibitObj from './modal/exhibit2.obj';
// import exhibitMtl from './modal/exhibit2.mtl';

// let THREE = require('three');
// Orbitcontrols(THREE);
// OBJLoader(THREE);
// MTLLoader(THREE);

// // 排除这些名字的3D模型
// const objectArrName = [ "房屋1101", "房屋1150", "房屋600", "房屋70", "房屋45", "房屋362", "房屋363", "房屋364", "房屋500" ];

// class GisThree extends Component {

//   constructor( props ) {
//     super(props);
//     this.state = {
//       isModel: false,
//       currentName: '暂无名字',
//       clientX: 0,
//       clientY: 0
//     };
//     this.threeRef = React.createRef();
//   }

//   componentDidMount() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     // todo 初始化场景
//     const scene = new THREE.Scene();
//     // todo 加载相机
//     const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 80);
//     camera.position.set(0, 25, 25);
//     camera.lookAt(new THREE.Vector3(0, 0, 0));

//     //todo 加载光线
//     const ambLight = new THREE.AmbientLight(0x404040, 0.5);
//     const pointLight = new THREE.PointLight(0x404040, 0.8);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//     pointLight.position.set(100, 10, 0);
//     pointLight.receiveShadow = true;
//     scene.add(ambLight);
//     scene.add(pointLight);
//     scene.add(directionalLight);

//     //todo  renderer
//     const renderer = new THREE.WebGLRenderer({
//       antialias: true
//     });
//     renderer.setSize(width, height - 10);
//     //renderer.setClearColor(0xb9d3ff,1);
//     renderer.setClearColor(0x000000, 1.0);

//     //todo  加载模型model
//     let mtlLoader = new THREE.MTLLoader();
//     mtlLoader.load(exhibitMtl,
//       function ( materials ) {
//         console.log('sdj exhibit.obj', materials)
//         materials.preload();
//         let objLoader = new THREE.OBJLoader();
//         objLoader.setMaterials(materials);
//         objLoader.load(exhibitObj, function ( object ) {
//           console.log('sdj exhibit.obj')
//           console.log('sdj exhibit.obj object', object);

//           for ( let i = 0; i < object.children.length; i++ ) {
//             let material = object.children[ i ].material;
//             let meshObj = new THREE.Mesh(object.children[ i ].geometry, material);
//             meshObj.receiveShadow = true;
//             meshObj.castShadow = true;
//             meshObj.scale.set(0.02, 0.02, 0.02);
//             meshObj.name = "房屋" + i;
//             meshObj.position.x = 0;
//             meshObj.position.y = 0;
//             meshObj.position.z = -20;

//             scene.add(meshObj);
//           }
//         });
//       }
//     );

//     // todo 场景控制器初始化
//     const controls = new THREE.OrbitControls(camera, renderer.domElement);
//     controls.enabled = true; // 鼠标控制是否可用

//     // 是否自动旋转
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 0.05;

//     //是否可旋转，旋转速度(鼠标左键)
//     controls.enableRotate = true;
//     controls.rotateSpeed = 0.3;

//     //controls.target = new THREE.Vector();//摄像机聚焦到某一个点
//     //最大最小相机移动距离(景深相机)
//     controls.minDistance = 10;
//     controls.maxDistance = 40;

//     //最大仰视角和俯视角
//     controls.minPolarAngle = Math.PI / 4; // 45度视角
//     controls.maxPolarAngle = Math.PI / 2.4; // 75度视角

//     //惯性滑动，滑动大小默认0.25
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;

//     //是否可平移，默认移动速度为7px
//     controls.enablePan = true;
//     controls.panSpeed = 0.5;
//     //controls.screenSpacePanning	= true;

//     //滚轮缩放控制
//     controls.enableZoom = true;
//     controls.zoomSpeed = 1.5;

//     //水平方向视角限制
//     //controls.minAzimuthAngle = -Math.PI/4;
//     //controls.maxAzimuthAngle = Math.PI/4;

//     //todo 绑定到类上
//     this.scene = scene;
//     this.camera = camera;
//     this.renderer = renderer;
//     this.controls = controls;
//     //鼠标移入和移出事件高亮显示选中的模型
//     this.currentObjectColor = null; //移入模型的颜色
//     this.currentObject = null; //鼠标移入的模型

//     // 初始化场景
//     // 加载到dom元素上
//     this.threeRef.current.appendChild(this.renderer.domElement)

//     this.start();

//     window.addEventListener('resize',this.resizeFunc1 ,false);
//     window.addEventListener('resize',this.resizeFunc2 ,false);
//   }

//   componentWillUnmount() {
//     this.stop();
//     this.threeRef.current.removeChild(this.renderer.domElement);
//     window.removeEventListener('resize',this.resizeFunc1 ,false);
//     window.removeEventListener('resize',this.resizeFunc2 ,false);
//   }

//   // 初始化
//   start = () => {
//     if(!this.frameId){
//       this.frameId = requestAnimationFrame(this.animate)
//     }
//   }

//   // 卸载组件的时候去除
//   stop = () => {
//     cancelAnimationFrame(this.frameId);
//   }

//   // 更新状态
//   animate = () => {
//     this.controls.update();
//     this.renderScene();
//     this.frameId = requestAnimationFrame(this.animate);
//   }

//   renderScene = () => {
//     this.renderer.render(this.scene, this.camera);
//   }

//   // 是否展示弹窗
//   changeModel = ( e ) => {
//     e.stopPropagation();
//     this.setState({
//       isModel: !this.state.isModel
//     })
//   }

//   closeModel = ( e ) => {
//     e.stopPropagation();
//     if (this.controls && !this.controls.autoRotate){
//       this.controls.autoRotate = true;
//     }
//     this.setState({
//       isModel: false
//     })
//   }

//   // 点击3D模型匹配
//   mouseClick = (e) => {
//     // 鼠标坐标映射到三维坐标
//     e.preventDefault();
//     const that = this;
//     const mouse = new THREE.Vector2();
//     mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
//     if(!this.camera || !this.scene) return;
//     let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(this.camera);
//     let raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
//     let intersects = raycaster.intersectObjects(this.scene.children, true); //选中的三维模型
//     console.log('sdj position',intersects)
//     if (intersects.length > 0) {
//       let SELECTED = intersects[0];
//       let currentName = SELECTED.object.name;
//       console.log('sdj position', e.clientX, e.clientY, e.screenX, e.screenY);
//       if (objectArrName.indexOf(currentName) == -1) {
//         if (this.controls.autoRotate){
//           this.controls.autoRotate = false;
//         }
//         that.changeModel(e);
//         that.setState({
//           currentName,
//           clientX: e.clientX,
//           clientY: (e.clientY - 60)
//         })
//         console.log("你选中的物体的名字是：" + currentName);
//       }
//     }
//   }

//   // 鼠标聚焦
//   mouseenterObject = (e) => {
//     // 鼠标坐标映射到三维坐标
//     e.preventDefault();

//     let mouse = new THREE.Vector2();
//     mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
//     let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(this.camera);
//     let raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
//     let intersects = raycaster.intersectObjects(this.scene.children, true); //选中的三维模型
//     if (!intersects.length && this.currentObjectColor && this.currentObject) { //从模型处移到外面
//       this.currentObject.object.material.color.setHex(this.currentObjectColor);
//       this.currentObjectColor = null;
//       this.currentObject = null;
//     }
//     if (intersects.length > 0) {
//       let SELECTED = intersects[0];
//       let currentName = SELECTED.object.name;
//       if (objectArrName.indexOf(currentName) == -1) {
//         if (this.currentObject && currentName === this.currentObject.object.name) {
//           return;
//         }
//         if (this.currentObjectColor && this.currentObject && currentName !== this.currentObject.object.name) { //color值是一个对象
//           this.currentObject.object.material.color.setHex(this.currentObjectColor);
//         }
//         this.currentObject = SELECTED;
//         this.currentObjectColor = SELECTED.object.material.color.getHex();
//         SELECTED.object.material.color.set(0x74bec1);
//       } else {
//         if (this.currentObjectColor && this.currentObject && currentName !== this.currentObject.object.name) { //color值是一个对象
//           this.currentObject.object.material.color.setHex(this.currentObjectColor);
//         }
//         this.currentObjectColor = null;
//         this.currentObject = null;
//       }
//     }
//   }

//   resizeFunc1 = () => {
//     this.controls.update();
//   }

//   resizeFunc2 = (e) =>  {
//     this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   render() {
//     return (
//       <Fragment>
//         <div
//           className={ this.props.className || 'three-component' }
//           id="d3"
//           ref={ this.threeRef }
//           onClick={this.mouseClick}
//           onMouseMove={this.mouseenterObject}
//         />
//         {
//           this.state.isModel && (
//             <div
//               className="three-modal"
//               style={ {
//                 top: this.state.clientY,
//                 left: this.state.clientX
//               } }
//             >
//               <Icon
//                 className="three-modal-close"
//                 type="close" theme="outlined"
//                 onClick={ this.closeModel }
//               />
//               <ul>
//                 <li>
//                   <span className="modal-title">出租屋编码</span>
//                   <span className="modal-data">{ this.state.currentName }</span>
//                 </li>
//                 <li>
//                   <span className="modal-title">地址</span>
//                   <span className="modal-data">社区一号</span>
//                 </li>
//                 <li>
//                   <span className="modal-title">每层楼栋数</span>
//                   <span className="modal-data">6</span>
//                 </li>
//                 <li>
//                   <span className="modal-title">层数</span>
//                   <span className="modal-data">16</span>
//                 </li>
//               </ul>
//             </div>
//           )
//         }
//       </Fragment>
//     )
//   }
// }

// export default GisThree;