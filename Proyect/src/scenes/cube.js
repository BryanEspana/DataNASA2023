const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//Material que emite luz
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//Material que no emite luz
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.name = 'cube'; 
export default cube