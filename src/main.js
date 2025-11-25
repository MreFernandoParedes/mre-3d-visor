// Usamos THREE global (ya cargado por los <script> en index.html)

// Tamaño inicial
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // fondo negro

// Cámara
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(6, 6, 6); // un poco arriba y a un lado
camera.lookAt(0, 0, 0);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Cuadrícula (blanco y gris sobre negro)
const gridSize = 20;
const gridDivisions = 20;
const grid = new THREE.GridHelper(
  gridSize,
  gridDivisions,
  0xffffff, // color del eje central
  0x444444  // resto de líneas
);
scene.add(grid);

// Base (plano blanco)
const planeSize = 8;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.8,
  metalness: 0.0,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2; // acostar el plano en XZ
plane.position.y = 0;
scene.add(plane);

// Cubo blanco encima de la base
const cubeSize = 1.5;
const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.4,
  metalness: 0.1,
});
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.y = cubeSize / 2; // que apoye en el plano
scene.add(cube);

// Luces (blanco, escala de grises)
const ambientLight = new THREE.AmbientLight(0x404040); // luz suave global
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Controles de órbita para mover la cámara con el mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Ajuste al redimensionar la ventana
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Bucle de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
