import starsTexture from "./src/assets/textures/stars.jpg";
import earthTexture from "./src/assets/textures/2k_earth_daymap.jpg";
import jupiterTexture from "./src/assets/textures/2k_jupiter.jpg";
import marsTexture from "./src/assets/textures/2k_mars.jpg";
import saturnTexture from "./src/assets/textures/2k_saturn.jpg";
import mercuryTexture from "./src/assets/textures/2k_mercury.jpg";
import neptuneTexture from "./src/assets/textures/2k_neptune.jpg";
import sunTexture from "./src/assets/textures/2k_sun.jpg";
import uranusTexture from "./src/assets/textures/2k_uranus.jpg";
import venusTexture from "./src/assets/textures/2k_venus_surface.jpg";
import saturnRingTexture from "./src/assets/textures/2k_saturn_ring_alpha.png";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

try {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene();
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
  ]);

  const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000);
  camera.position.set(0, 30, 1.5);
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0x555555);
  const light = new THREE.PointLight(0xffffff, 200);
  scene.add(light, ambientLight);

  const textureLoader = new THREE.TextureLoader();

  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(gridHelper);

  const createPlanet = (radius, roundness, color, distanceFromOrigin, planetTexture, ring) => {
    const centerPointHolder = new THREE.Object3D();

    const planetGeometry = new THREE.SphereGeometry(radius, roundness, roundness);
    const material = new THREE.MeshStandardMaterial({
      color: planetTexture ? 0xffffff : color, // not necessary
      roughness: 20,
      map: textureLoader.load(planetTexture),
    });
    const planet = new THREE.Mesh(planetGeometry, material);
    planet.position.x = distanceFromOrigin;

    if (ring) {
      const ringGeo = new THREE.RingGeometry(1.8, 2.5);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: textureLoader.load(saturnRingTexture),
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, material);
      ring.rotation.x = Math.PI * -0.5;

      planet.add(ring);
    }

    centerPointHolder.add(planet);
    scene.add(centerPointHolder);
    return { centerPointHolder, planet };
  };

  const sunGeo = new THREE.SphereGeometry(5, 30, 30);
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture),
  });

  const sun = new THREE.Mesh(sunGeo, sunMaterial);
  scene.add(sun);

  // Planets
  const mercury = createPlanet(0.8, 30, 0xda4000, 8, mercuryTexture);
  const venus = createPlanet(0.9, 30, 0xda4000, 11, venusTexture);
  const earth = createPlanet(1.2, 30, 0x029340, 14, earthTexture, false, true);
  const mars = createPlanet(0.9, 30, 0xfce2dc, 17, marsTexture);
  const jupiter = createPlanet(1.8, 30, 0xbe123c, 20, jupiterTexture);
  const saturn = createPlanet(1.8, 30, 0xffe103, 26, saturnTexture, true);
  const uranus = createPlanet(1, 30, 0xa855f7, 30, uranusTexture);
  const neptune = createPlanet(1.2, 30, 0xa855f7, 33, neptuneTexture);

  // Other Planet atrr
  saturn.planet.rotation.set(0, 0, 10);

  const canvas = document.querySelector(".canva");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(sizes.width, sizes.height);

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableZoom = false;
  controls.enableDamping = true;
  // controls.enablePan = false;

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  function moveCamera() {
    const top = document.body.getBoundingClientRect().top;

    if (top <= -30) {
      camera.position.z = top * -0.05;
    }
  }

  document.body.onscroll = moveCamera;

  const animate = () => {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.009;

    mercury.centerPointHolder.rotation.y += 0.01;
    mercury.planet.rotation.y += 0.08;

    venus.centerPointHolder.rotation.y += 0.005;
    venus.planet.rotation.y += 0.08;

    earth.centerPointHolder.rotation.y += 0.02;
    earth.planet.rotation.y += 0.1;

    mars.centerPointHolder.rotation.y += 0.011;
    mars.planet.rotation.y += 0.01;

    jupiter.centerPointHolder.rotation.y += 0.001;
    jupiter.planet.rotation.y += 0.009;

    jupiter.centerPointHolder.rotation.y += 0.009;
    jupiter.planet.rotation.y += 0.005;

    saturn.centerPointHolder.rotation.y += 0.008;
    saturn.planet.rotation.y += 0.008;

    uranus.centerPointHolder.rotation.y += 0.02;

    neptune.centerPointHolder.rotation.y += 0.007;
    neptune.planet.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
  };

  animate();
} catch (e) {
  console.log(e);
}
