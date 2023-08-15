const light = new THREE.AmbientLight(0xffffff, 1); // Luz ambiental blanca pero con menor intensidad (0.2 en este caso)
const directionalLight = new THREE.DirectionalLight(0xFF0000);  // Rojo puro para la luz direccional
directionalLight.position.set(-10, 10, 10);
light.add(directionalLight);
export default light;
