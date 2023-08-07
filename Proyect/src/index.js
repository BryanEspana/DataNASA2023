import scene from './utils/sceen.js';
import camera from './utils/camera.js';
import renderer from './utils/renderer.js';
import cube from './scenes/cube.js';
import light from './utils/light.js';
import resize from './utils/resize.js';
import loopMachine from './utils/loopMachine.js';
import keyListener from './utils/keyListener.js';
import keycode from './utils/keycode.js';
import { loadPlanet } from './scenes/model3D.js';
import plane from './scenes/plane.js';

//scene.add(cube);
loadPlanet((planetModel) => {
    scene.add(planetModel);
    camera.lookAt(planetModel.position);
});
//scene.add( plane );
    
scene.add(light);
camera.position.set (70, 55, 65);
camera.lookAt(cube.position);

//toma una foto de la escena y la muestra en el canvas
//renderer.render(scene, camera);
loopMachine.addCallback(() => {
    if(keyListener.isPressed(keycode.ENTER))cube.rotation.y += 0.01;
    //cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}, 1000/60)
// console.log(scene, camera, renderer, cube); 

resize.start(renderer);
loopMachine.start();
keyListener.start();