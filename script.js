var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
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


// Helper functions //

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function light(x, y, z) {
    var light = new THREE.PointLight(0xffffff, 1, 1000)
    light.position.set(x, y, z);
    scene.add(light);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random())
}

const Chunk = function(){
    this.width = 8
    this.height = 8
    this.depth = 8

    this.contents = []

    this.render = function(x, y, z) {
        
        for (cubex = 0; cubex < this.width; cubex++) {
            for (cubey = 0; cubey < this.height; cubey++) {
                for (cubez = 0; cubez < this.depth; cubez++) {
                    const cube = this.getCube(cubex, cubey, cubez)
                    if(cube !== null) cube.render(cubex + x, cubey + y, cubez + z)
                }
            }
        }
    }

    this.getCube = function(x, y, z) {
        return this.contents[x][y][z]
    }

    this.setCube = function(cube, x, y, z) {
        this.contents[x][y][z] = cube
    }

    this.fill = function(cube) {
        this.contents = []
        for (x = 0; x < this.width; x++) {
            const slice = []
            for (y = 0; y < this.height; y++) {
                const row = []
                for (z = 0; z < this.depth; z++) {
                    row.push(cube)
                }
                slice.push(row)
            }
            this.contents.push(slice)
        }
    }

    this.fill(null)
}

const Cube = function(color) {
    this.color = color

    this.render = function(x, y, z) {
        let geometry = new THREE.BoxGeometry(1, 1, 1)
        let material = new THREE.MeshLambertMaterial({color: this.color})
        var mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = x
        mesh.position.y = y
        mesh.position.z = z
        scene.add(mesh)
    }
}

const randomChunk = function(density = 0.25) {
    console.log("Generating chunk...")
    const chunk = new Chunk()
    for (x = 0; x < chunk.width; x++) {
        for (y = 0; y < chunk.height; y++) {
            for (z = 0; z < chunk.depth; z++) {
                if(Math.random() < density)
                    chunk.setCube(randomColorCube(), x, y, z)
            }
        }
    }

    return chunk
}

const randomColorCube = function() {
    return new Cube(getRandomColor())
}

function main() {
    light(0, 10, 10)
    
    const chunk = randomChunk()
    chunk.render(0, 0, 0)
    render()
}

main()