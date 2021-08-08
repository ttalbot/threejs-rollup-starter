import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js/src/Stats'
import * as dat from 'dat.gui'

import './styles.scss'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const gui = new dat.GUI({width: 400})

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

var configObject = {
  cubeColor: 0xff0000
}

const scene = new THREE.Scene()

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
* Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
gui.add(camera, 'fov').min(10).max(150).step(1).onChange(() => {
  camera.updateProjectionMatrix();
})
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial( { color: configObject.cubeColor } )
const cube = new THREE.Mesh( geometry, material )
gui.addColor(configObject, 'cubeColor').onChange(
  (newColor) => {
    material.color.set(newColor)
  }
)
scene.add( cube )

/**
* Animate
*/
const clock = new THREE.Clock()

const tick = () =>
{
  stats.begin()
  const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  stats.end()
  window.requestAnimationFrame(tick)
}

tick()