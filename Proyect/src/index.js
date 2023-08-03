import scene from './basic/sceen.js';
import camera from './basic/camera.js';
import renderer from './basic/renderer.js';
import cube from './basic/shapes/cube.js';
import light from './basic/light.js';
import resize from './basic/resize.js';
import plane from './basic/shapes/plane.js';
import loopMachine from './basic/loopMachine.js';
import keyListener from './basic/keyListener.js';
import keycode from './basic/keycode.js';
import model3D from './basic/shapes/model3D.js';
//scene.add(cube);
scene.add(light);
scene.add(model3D);
//scene.add( plane );
camera.position.set (1, 1, 1);
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