import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 20 });
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

const mainLight = new THREE.PointLight(0xffffff, 200);
mainLight.position.set(8, 8, 8);

const pointHelper = new THREE.PointLightHelper(mainLight);
scene.add(mainLight, pointHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 10;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();

  sun.rotation.set(0, 10, 0)
  renderer.render(scene, camera);
};

animate();
