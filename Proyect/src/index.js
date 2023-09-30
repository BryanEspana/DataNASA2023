import scene from './utils/sceen.js';
import camera from './utils/camera.js';
import renderer from './utils/renderer.js';
import cube from './scenes/cube.js';
import light from './utils/light.js';
import resize from './utils/resize.js';
import loopMachine from './utils/loopMachine.js';
import keyListener from './utils/keyListener.js';
import { UnrealBloomPass } from "../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as THREE from "../node_modules/three/build/three.module.js";
import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

let planetModelGlobal;
let colors = ["rgb(255, 0, 255)","rgb(255, 0, 0)","rgb(255, 255, 255)","rgb(0, 0, 255)","rgb(0, 255, 0)","rgb(255, 255, 0)"]
let currentIndex = 0

async function loadPlanetModel(position) {
    const loadPlanetOptimized = () => {
        return new Promise((resolve, reject) => {
            loader.load('src/assets/glt_glb/callisto.glb', (gltf) => {
                const planet = gltf.scene;
                resolve(planet);
            }, undefined, reject);
        });
    };

    try {
        const planetModel = await loadPlanetOptimized();

        planetModel.scale.set(0.19, 0.19, 0.19);

        const textureLoader = new THREE.TextureLoader();
        const emissiveMap = textureLoader.load('Proyect/src/assets/img/ruido1.jpg');
        const bumpMap = textureLoader.load('Proyect/src/assets/img/ruido2.jpg');

        planetModel.traverse((child) => {
            if (child.isMesh) {
                child.material.emissiveMap = emissiveMap;
                child.material.emissive = new THREE.Color('#FFFFFF');
                child.material.emissiveIntensity = 0.01;
                
                child.material.bumpMap = bumpMap;
                child.material.bumpScale = 0.1;
                child.material.needsUpdate = true;
            }
        });

        scene.add(planetModel);
        camera.lookAt(planetModel.position);
        planetModel.position.x = position;

        planetModelGlobal = planetModel;

        return planetModel;
    } catch (error) {
        console.error("Error loading planet:", error);
        return null;
    }
}

loadPlanetModel(0)

let isDragging = false;
let lastX;

// Cambiar el cursor cuando el ratón pasa por encima del modelo
renderer.domElement.addEventListener('mousemove', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(planetModelGlobal);

    if (intersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
    } else {
        renderer.domElement.style.cursor = 'default';
    }
});

// Iniciar el arrastre
renderer.domElement.addEventListener('mousedown', (event) => {
    isDragging = true;
    lastX = event.clientX;
});

// Rotar el modelo mientras se arrastra
renderer.domElement.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - lastX;
        if (planetModelGlobal) {
            planetModelGlobal.rotation.y += deltaX * 0.01;
        }
        lastX = event.clientX;
    }
});

// Detener el arrastre
renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
});


const renderPass = new RenderPass(scene, camera);

// Modificamos el UnrealBloomPass
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.1;
bloomPass.strength = 10;  // Aumentamos la intensidad del resplandor
bloomPass.radius = 1;

const composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.renderToScreen = true;
composer.addPass(renderPass);
composer.addPass(bloomPass);


scene.add(light);
camera.position.set (0, 0, 350);
camera.lookAt(cube.position);

//BEGING-------------------------------Estrellas de fondo-------------------------------------------

const starCount = 100000; 
const starGeometry = new THREE.BufferGeometry();

// Carga la textura
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('src/assets/img/star.png'); // Reemplaza 'ruta_a_tu_textura.png' con la ruta correcta a tu archivo de textura

// Modifica el material para usar la textura
const starMaterial = new THREE.PointsMaterial({ 
    color: 0xFFFFFF, 
    size: 1,
    map: starTexture,
    transparent: true, 
    blending: THREE.NormalBlending
});

const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

const starCountNear = 1000;
const starCountFar = 5000;

// Geometría y material para el campo de estrellas cercano
const starGeometryNear = new THREE.BufferGeometry();
const positionsNear = new Float32Array(starCountNear * 3);
for (let i = 0; i < starCountNear * 3; i++) {
    positionsNear[i] = (Math.random() - 0.5) * 1000; // espacio más pequeño para estrellas cercanas
}
starGeometryNear.setAttribute('position', new THREE.BufferAttribute(positionsNear, 3));
const starFieldNear = new THREE.Points(starGeometryNear, starMaterial);
scene.add(starFieldNear);

// Geometría y material para el campo de estrellas lejano
const starGeometryFar = new THREE.BufferGeometry();
const positionsFar = new Float32Array(starCountFar * 3);
for (let i = 0; i < starCountFar * 3; i++) {
    positionsFar[i] = (Math.random() - 0.5) * 3000; // espacio más grande para estrellas lejanas
}
starGeometryFar.setAttribute('position', new THREE.BufferAttribute(positionsFar, 3));
const starFieldFar = new THREE.Points(starGeometryFar, starMaterial);
scene.add(starFieldFar);
//ENDING-------------------------------Estrellas de fondo-------------------------------------------
// ... Your other imports ...

let movePlanetLeft = false;
let movePlanetRight = false
let seeStar = false

document.getElementById("movePlanetLeftBtn").addEventListener("click", function() {
    movePlanetLeft = true;

    if (currentIndex == colors.length - 1){
        currentIndex = 0
    }else{
        currentIndex = (currentIndex + 1);
    }
});

document.getElementById("movePlanetRightBtn").addEventListener("click", function() {
    movePlanetRight = true;
    

    if (currentIndex == 0){
        currentIndex = colors.length - 1
    }else{
        currentIndex = (currentIndex - 1);
    }
});

document.getElementById("seeStarButton").addEventListener("click", function() {
    seeStar = true;
});

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

loopMachine.addCallback(() => {
    // ... other animation code ...


    // If planetModelGlobal exists, and the movePlanet flag is true
    if (movePlanetLeft && planetModelGlobal) {
        planetModelGlobal.position.x -= 15  // Adjust speed as needed

        if (planetModelGlobal.position.x < -900) {  // Adjust threshold as needed
            // Dispose of resources for current planetModelGlobal

            planetModelGlobal.position.x = 900
            light.color = new THREE.Color(colors[currentIndex])
            console.log(currentIndex)
        }

        if (planetModelGlobal.position.x == 0){
            movePlanetLeft = false
        }
    }

    if (movePlanetRight && planetModelGlobal) {
        planetModelGlobal.position.x += 15;  // Adjust speed as needed

        if (planetModelGlobal.position.x > 900) {  // Adjust threshold as needed
            // Dispose of resources for current planetModelGlobal
            
            planetModelGlobal.position.x = -900
            // Change color
            light.color = new THREE.Color(colors[currentIndex])
            console.log(currentIndex)
        }

        if (planetModelGlobal.position.x == 0){
            movePlanetRight = false
        }
    }

    if (seeStar){

        if (camera.position.z <= 200){
            seeStar = false
        }
        camera.position.z -= 10;

    }
    
    composer.render();
}, 1000/60);





resize.start(renderer);
loopMachine.start();
keyListener.start();

