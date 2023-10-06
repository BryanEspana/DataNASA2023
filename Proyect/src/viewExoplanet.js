import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
  
  // Get a reference to the container element that will hold our scene
  const container = document.querySelector('#scene-container');
  
  // create a Scene
  const scene = new THREE.Scene();
  
  // Set the background color
  scene.background = new THREE.Color('black');
  
  let aspectRatio = container.clientWidth / container.clientHeight;
  const camera = new THREE.PerspectiveCamera(30, aspectRatio);
  
  // every object is initially created at ( 0, 0, 0 )
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 200);



  const loader = new GLTFLoader();
  let planetModelGlobal;
  async function loadPlanetModel(position) {
      const loadPlanetOptimized = () => {
          return new Promise((resolve, reject) => {
              loader.load('/src/assets/glt_glb/callisto.glb', (gltf) => {
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
  
  // create the renderer
  const renderer = new THREE.WebGLRenderer();
  
  // add light

    const light = new THREE.AmbientLight(); // soft white light
    scene.add(light);



  renderer.setSize(container.clientWidth, container.clientHeight);
  
  renderer.setPixelRatio(window.devicePixelRatio);
  
  container.append(renderer.domElement);
  

  function animate() {
        requestAnimationFrame(animate);
        planetModelGlobal.rotation.y += 0.005;
        renderer.render(scene, camera);
}
    animate();