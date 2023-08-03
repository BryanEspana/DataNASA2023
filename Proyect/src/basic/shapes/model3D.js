import {OrbitControls} from '../../../js/three.js';
import { MTLLoader } from '../../../js/three.js';
import { OBJLoader } from '../../../js/three.js';


const t = new MTLLoader()
const imageOBJ = new Image()
imageOBJ.src = '../../../assets/obj/planet.mtl'


t.load('../../../assets/obj/planet.obj', (jc)=>{
    const z = new OBJLoader()
    z.setMaterials(jc)
    z.load('../../../assets/obj/planet.obj',(jeanc)=>{
        escena.add(jeanc)
    })})

export default model3D;