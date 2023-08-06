//import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import * as THREE from 'three';
import { OBJLoader } from '../../../../node_modules/three/examples/jsm/loaders/OBJLoader.js';
const loader = new OBJLoader();
let planet;

// Asíncronamente carga el modelo OBJ
loader.load('ruta/a/tu/planet.obj', (object) => {
    planet = object;
});

export default planet;