//import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import * as THREE from 'three';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';

const loader = new OBJLoader();
let planet;

export function loadPlanet(callback) {
    loader.load('../assets/obj/planet.obj', (object) => {
        callback(object);
    });

}

/*
loader.load('../assets/obj/planet.obj', (object) => {
    planet = object;
});


export default planet;*/
