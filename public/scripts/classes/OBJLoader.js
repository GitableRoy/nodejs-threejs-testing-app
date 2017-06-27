class OBJLoader {
	constructor() {
		this.loader = new THREE.OBJLoader();
	}

	// load a resource
	load(file) {
		this.loader.load(
			// resource URL
			'/uploads/' + file,
			function ( object ) {
				scene.add( object );
			}
		)
	}
}
