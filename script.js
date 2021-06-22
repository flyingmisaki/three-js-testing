var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.x = 10
camera.position.y = 10
camera.position.z = 15
camera.rotation.y = 0.5
camera.rotation.x = -0.5

var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#000000")
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight

    camera.updateProjectionMatrix()
    }
)

chunk(8)
light(0, 10, 10)

render()




function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function cube(x, y, z, color) {
    var geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
    var material = new THREE.MeshLambertMaterial({color: color})
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z
    scene.add(mesh)
}

function chunk(size) {
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            for (z = 0; z < size; z++) {
                cube(x, y, z)
            }
        }
    }
}

function light(x, y, z) {
    var light = new THREE.PointLight(0xffffff, 1, 1000)
    light.position.set(x, y, z);
    scene.add(light);
}