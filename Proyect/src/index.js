import scene from './utils/sceen.js';
import camera from './utils/camera.js';
import renderer from './utils/renderer.js';
import cube from './scenes/cube.js';
import light from './utils/light.js';
import resize from './utils/resize.js';
import loopMachine from './utils/loopMachine.js';
import keyListener from './utils/keyListener.js';
import keycode from './utils/keycode.js';
import plane from './scenes/plane.js';
import { loadPlanetOptimizate } from './scenes/modelGLB.js';

//scene.add(cube);
/*loadPlanet((planetModel) => {
    scene.add(planetModel);
    camera.lookAt(planetModel.position);
});*/

let planetModelGlobal;
loadPlanetOptimizate((planetModel) => {
    planetModel.scale.set(0.1, 0.1, 0.1); 
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

scene.add(light);
camera.position.set (0, 0, 200);
camera.lookAt(cube.position);



const starCount = 100000; 
const starGeometry = new THREE.BufferGeometry();

// Carga la textura
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('src/assets/img/star.png'); // Reemplaza 'ruta_a_tu_textura.png' con la ruta correcta a tu archivo de textura

// Modifica el material para usar la textura
const starMaterial = new THREE.PointsMaterial({ 
    color: 0xFFFFFF, 
    size: 2.5,
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


const starCountNear = 50000;
const starCountFar = 50000;

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
    renderer.render(scene, camera);
}, 1000/60)

resize.start(renderer);
loopMachine.start();
keyListener.start();