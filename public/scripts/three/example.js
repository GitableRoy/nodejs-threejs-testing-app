var viewport = new Viewport();

var geometry = new THREE.TorusKnotGeometry( 5, 3, 32, 50 );
var material = new THREE.MeshBasicMaterial( { color: "pink", wireframe: true } );
var torusKnot = new THREE.Mesh( geometry, material );

viewport.scene.add( torusKnot );

viewport.camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	torusKnot.rotation.x += 0.01;
	torusKnot.rotation.y += 0.01;

	viewport.renderer.render(viewport.scene, viewport.camera);
}

animate();
