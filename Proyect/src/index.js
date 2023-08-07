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

//renderer.render(scene, camera);
loopMachine.addCallback(() => {
    if (planetModelGlobal) { // solo rota si el modelo ya fue cargado y asignado
        planetModelGlobal.rotation.y += 0.002; // 3. Añade la rotación al modelo en el callback
    }
    renderer.render(scene, camera);
}, 1000/60)

resize.start(renderer);
loopMachine.start();
keyListener.start();