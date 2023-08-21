import * as THREE from "three";
import saturnRingTexture from "../assets/textures/2k_saturn_ring_alpha.png";

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

export const createPlanet = (radius, roundness, color, distanceFromOrigin, planetTexture, ring) => {
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
