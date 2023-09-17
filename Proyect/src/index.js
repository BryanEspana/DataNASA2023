import scene from './utils/sceen.js';
import camera from './utils/camera.js';
import renderer from './utils/renderer.js';
import cube from './scenes/cube.js';
import light from './utils/light.js';
import resize from './utils/resize.js';
import loopMachine from './utils/loopMachine.js';
import keyListener from './utils/keyListener.js';
import { loadPlanetOptimizate } from './scenes/modelGLB.js';
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as THREE from "/node_modules/three/build/three.module.js";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";


let planetModelGlobal;
loadPlanetOptimizate((planetModel) => {
    //planetModel.scale.set(0.12, 0.115, 0.12);
    planetModel.scale.set(0.20, 0.18, 0.20);

    // Assuming the planetModel has a mesh with a material that you want to modify
    const loader = new THREE.TextureLoader();
    const emissiveMap = loader.load('Proyect/src/assets/img/ruido1.jpg');
    const bumpMap = loader.load('Proyect/src/assets/img/ruido2.jpg');

    planetModel.traverse((child) => {
        if (child.isMesh) {
            child.material.emissiveMap = emissiveMap; // Textura de puntos naranjas brillantes
            child.material.emissive = new THREE.Color("#FFFFFF"); // Color blanco para aumentar la luminosidad
            child.material.emissiveIntensity = 1.0;
            
            child.material.bumpMap = bumpMap; // Textura de relieve para resaltar los puntos brillantes
            child.material.bumpScale = 0.1; // Ajusta la intensidad del relieve según sea necesario
            
            child.material.needsUpdate = true;
        }
    });

    scene.add(planetModel);
    camera.lookAt(planetModel.position);
    planetModelGlobal = planetModel;
});

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
camera.position.set (0, 0, 200);
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



//renderer.render(scene, camera);
loopMachine.addCallback(() => {


    starFieldNear.position.x += 0.05; // Mueve las estrellas cercanas más rápido
    starFieldFar.position.x += 0.02;  // Mueve las estrellas lejanas más lento

    // Restablece la posición si las estrellas se han movido demasiado
    if (starFieldNear.position.x > 1000) starFieldNear.position.x = -1000;
    if (starFieldFar.position.x > 3000) starFieldFar.position.x = -3000;


    if (planetModelGlobal) { // solo rota si el modelo ya fue cargado y asignado
        planetModelGlobal.rotation.y += 0.002; // 3. Añade la rotación al modelo en el callback
    }

    composer.render();
}, 1000/60)


resize.start(renderer);
loopMachine.start();
keyListener.start();

