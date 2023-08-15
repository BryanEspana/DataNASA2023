const light = new THREE.AmbientLight(0xff0000);
const directionalLight = new THREE.DirectionalLight(0xff0000);  // Cambio a un tono rojo
directionalLight.position.set(-10, 10, 10);
light.add(directionalLight);
export default light;
