import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color('black');

let aspectRatio = container.clientWidth / container.clientHeight;
const camera = new THREE.PerspectiveCamera(2.5, aspectRatio);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(800, 0, 200);



const loader = new GLTFLoader();
let planetModelGlobal;
async function loadPlanetModel(position) {
    const loadPlanetOptimized = () => {
        return new Promise((resolve, reject) => {
            loader.load('/src/assets/glt_glb/modelo3DPlaneta.glb', (gltf) => {
                const planet = gltf.scene;
                resolve(planet);
            }, undefined, reject);
        });
    };

    try {
        const planetModel = await loadPlanetOptimized();

        planetModel.scale.set(0.08, 0.08, 0.08);

        const textureLoader = new THREE.TextureLoader();
        const emissiveMap = textureLoader.load('/src/assets/img/ruido1.jpg');
        const bumpMap = textureLoader.load('/src/assets/img/ruido2.jpg');

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
loadPlanetModel(-45)




//BEGING-------------------------------Estrellas de fondo-------------------------------------------

const starCount = 100000; 
const starGeometry = new THREE.BufferGeometry();

// Carga la textura
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('/src/assets/img/star.png'); // Reemplaza 'ruta_a_tu_textura.png' con la ruta correcta a tu archivo de textura

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

const renderer = new THREE.WebGLRenderer();

const light = new THREE.AmbientLight(); 
scene.add(light);

renderer.setSize(container.clientWidth, container.clientHeight);

renderer.setPixelRatio(window.devicePixelRatio);

container.append(renderer.domElement);

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


function animate() {
    requestAnimationFrame(animate);
    planetModelGlobal.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();