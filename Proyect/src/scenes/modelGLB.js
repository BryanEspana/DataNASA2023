//import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
let planet;

export function loadPlanetOptimizate(callback) {
    loader.load('src/assets/glt_glb/Venus.glb', (gltf) => {
        planet = gltf.scene;
        callback(planet);
    });
}

/*
loader.load('../assets/obj/planet.obj', (object) => {
    planet = object;
});


export default planet;*/
