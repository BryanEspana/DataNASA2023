const light = new THREE.AmbientLight(0xFFFFFF); // Luz ambiental blanca pero con menor intensidad (0.2 en este caso)
const directionalLight = new THREE.DirectionalLight(0xFFFFFF);  // Rojo puro para la luz direccional
directionalLight.position.set(0, -100, 200);
light.add(directionalLight);
export default light;
