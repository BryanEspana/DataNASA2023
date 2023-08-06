const light = new THREE.AmbientLight(0xffffff);

const directionalLight = new THREE.DirectionalLight( 0xffffff );

directionalLight.position.set( -10, 10, 10 );

light.add( directionalLight );


export default light;