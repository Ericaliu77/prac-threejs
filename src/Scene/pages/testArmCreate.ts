import * as THREE from "three";
import { MathUtils } from "three";
const { Vector3, Quaternion } = THREE;
export default function testArmCreate() {

    const points: any = [
        new Vector3(0.781395, 0.022887, 1.332960),
        new Vector3(0.937549, 0.022889, 1.332932),
        new Vector3(0.937526, 0.132819, 1.332924)
    ];
    const p0 = new Vector3(0.691295, -0.264851, 1.332938)
    const p1 = new Vector3(0.812583, -0.264862, 1.332936)
    const p2 = new Vector3(0.812578, -0.159049, 1.332936)
    const P12 = p1.sub(p0);
    const P13 = p2.sub(p0);
    const P23 = p2.sub(p1);
    const distance_threshold_ = 0.01;

    const calNorm = (v: THREE.Vector3) => {
        const v_array = v.toArray();
        let sum = 0;
        v_array.forEach((i: any) => {
            sum = i * i + sum;
        })
        const norm = Math.sqrt(sum);
        return norm
    }

    const calThreePoint = () => {
        console.log('p12,p13,p23', P12.clone(), P13, P23);
        const normP12 = calNorm(P12);
        const normP13 = calNorm(P13)
        const x_norm = P12.clone().divideScalar(normP12);
        const z_norm = P12.clone().cross(P13.clone());
        z_norm.normalize();
        const y_norm = z_norm.clone().cross(x_norm.clone());
        console.log('normalize', P12.clone().normalize(), P13.clone().normalize(), P23.clone().normalize());
        // console.log('_norm', x_norm, y_norm, z_norm);
        console.log('norm', x_norm, z_norm, y_norm)
        const rotationM = new THREE.Matrix4().makeBasis(x_norm, y_norm, z_norm);
        //const q = new THREE.Quaternion().setFromRotationMatrix(rotationM);
        console.log(rotationM)
        const ee = new THREE.Euler().setFromRotationMatrix(rotationM, 'XYZ')
        const es = setFromRotationMatrix(rotationM.toArray());
        console.log(rotationM.toArray());
        console.log(ee, MathUtils.radToDeg(ee.x), MathUtils.radToDeg(ee.y), MathUtils.radToDeg(ee.z));
    }
    calThreePoint();

    function setFromRotationMatrix(m: any) {

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        const te = m;
        const m11 = te[0], m12 = te[4], m13 = te[8];
        const m21 = te[1], m22 = te[5], m23 = te[9];
        const m31 = te[2], m32 = te[6], m33 = te[10];
        console.log(m11, m12, m13, m21, m22, m33)
        // switch ( order ) {

        // 	case 'XYZ':

        // 		this._y = Math.asin( clamp( m13, - 1, 1 ) );

        // 		if ( Math.abs( m13 ) < 0.9999999 ) {

        // 			this._x = Math.atan2( - m23, m33 );
        // 			this._z = Math.atan2( - m12, m11 );

        // 		} else {

        // 			this._x = Math.atan2( m32, m22 );
        // 			this._z = 0;

        // 		}

        // 		break;

        // 	case 'YXZ':

        // 		this._x = Math.asin( - clamp( m23, - 1, 1 ) );

        // 		if ( Math.abs( m23 ) < 0.9999999 ) {

        // 			this._y = Math.atan2( m13, m33 );
        // 			this._z = Math.atan2( m21, m22 );

        // 		} else {

        // 			this._y = Math.atan2( - m31, m11 );
        // 			this._z = 0;

        // 		}

        // 		break;

        // 	case 'ZXY':

        // 		this._x = Math.asin( clamp( m32, - 1, 1 ) );

        // 		if ( Math.abs( m32 ) < 0.9999999 ) {

        // 			this._y = Math.atan2( - m31, m33 );
        // 			this._z = Math.atan2( - m12, m22 );

        // 		} else {

        // 			this._y = 0;
        // 			this._z = Math.atan2( m21, m11 );

        // 		}

        // 		break;

        // 	case 'ZYX':

        // 		this._y = Math.asin( - clamp( m31, - 1, 1 ) );

        // 		if ( Math.abs( m31 ) < 0.9999999 ) {

        // 			this._x = Math.atan2( m32, m33 );
        // 			this._z = Math.atan2( m21, m11 );

        // 		} else {

        // 			this._x = 0;
        // 			this._z = Math.atan2( - m12, m22 );

        // 		}

        // 		break;

        // 	case 'YZX':

        // 		this._z = Math.asin( clamp( m21, - 1, 1 ) );

        // 		if ( Math.abs( m21 ) < 0.9999999 ) {

        // 			this._x = Math.atan2( - m23, m22 );
        // 			this._y = Math.atan2( - m31, m11 );

        // 		} else {

        // 			this._x = 0;
        // 			this._y = Math.atan2( m13, m33 );

        // 		}

        // 		break;

        // 	case 'XZY':

        // 		this._z = Math.asin( - clamp( m12, - 1, 1 ) );

        // 		if ( Math.abs( m12 ) < 0.9999999 ) {

        // 			this._x = Math.atan2( m32, m22 );
        // 			this._y = Math.atan2( m13, m11 );

        // 		} else {

        // 			this._x = Math.atan2( - m23, m33 );
        // 			this._y = 0;

        // 		}

        // 		break;

        // 	default:

        // 		console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );

        // }



    }

}