//import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';

const loader = new OBJLoader();
let planet;

export function loadPlanet(callback) {
    loader.load('src/assets/obj/planet.obj', (object) => {
        callback(object);
    });

}

/*
loader.load('../assets/obj/planet.obj', (object) => {
    planet = object;
});


export default planet;*/
