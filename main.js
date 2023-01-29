import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const loader = new GLTFLoader();
var obj;
loader.load(
  "earth_day/scene.gltf",
  function (gltf) {
    gltf.scene.scale.set(200, 200, 200);
    obj = gltf.scene;
    // mesh.material.opacity(1);
    scene.add(obj);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// var mush;
// loader.load(
//   "mushroom_monk/scene.gltf",
//   function (gltf) {
//     gltf.scene.scale.set(200, 200, 200);
//     mush = gltf.scene;
//     scene.add(mush);
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

// gltf.scene.position.z = 50;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshToonMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load(
//   "Screenshot 2023-01-27 222729.jpg"
// );
// scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load("jeff.png");

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 32, 32),
  new THREE.MeshToonMaterial({
    map: moonTexture,
  })
);
// if (obj) {
//   obj.add(moon);
//   moon.position.x = 5;
// }
// const golu = new THREE.mesh(new THREE.SphereGeometry(3, 32, 35));

// scene.add(golu);

// golu.position.z = 40;
// golu.position.x = -20;

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  if (obj) {
    obj.rotation.x += 0.05;
    obj.rotation.y += 0.075;
    obj.rotation.z += 0.05;
  }
  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  if (obj) {
    obj.rotation.y += 0.01;
    obj.position.z = 30;
    obj.position.x = -50;
  }

  if (obj) {
    obj.add(moon);
    moon.position.x = 1;
  }

  // loader.rotation.x += 0.01;
  // loader.scene.rotation.y += 0.005;
  // loader.rotation.z += 0.01;

  // moon.rotation.x += 0.005;
  // spaceTexture.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
