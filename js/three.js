function start() {
	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		.1,
		1000
	)
	camera.position.z = 3

	let renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setClearColor("#ffffff")
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})


	let geometry = new THREE.BoxGeometry(1, 1, 1)
	let cubes = []

	for (let i = 0; i < 120; i++) {
		let r = (Math.random() * 255) << 0;
		let g = (Math.random() * 255) << 0;
		let b = (Math.random() * 255) << 0;
		let color = r << 16 | g << 8 | b;
		let material = new THREE.MeshLambertMaterial({color})
		let cube = new THREE.Mesh(geometry, material)
		cube.position.x = (Math.random() - 0.5) * 17
		cube.position.y = (Math.random() - 0.5) * 17
		cube.position.z = (Math.random() - 0.5) * 17
		scene.add(cube)
		cubes.push(cube)
	}

	let light = new THREE.AmbientLight(0xFFFFFF)
	scene.add(light)

	let pointer = new THREE.Vector2()

	function onMouseMove(event) {
		event.preventDefault()

		pointer.x = (event.clientX - window.innerWidth / 2) / 100
		pointer.y = (event.clientY - window.innerHeight / 2) / 100
	}

	function render() {
		requestAnimationFrame(render)

		camera.position.x += (pointer.x - camera.position.x) * 0.05
		camera.position.y +=  - (pointer.y + camera.position.y) * 0.05
		camera.lookAt(scene.position)

		renderer.render(scene, camera)
	}
	render()

	document.addEventListener('pointermove', onMouseMove)
}

start()