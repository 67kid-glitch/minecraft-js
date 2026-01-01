// --- BASIC SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101018);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- LIGHTING ---
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// --- PLAYER ---
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0xff3333 })
);
player.position.y = 1;
scene.add(player);

// --- GROUND ---
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// --- CONTROLLER ---
let gamepadIndex = null;
window.addEventListener("gamepadconnected", e => gamepadIndex = e.gamepad.index);

// --- CAMERA CONTROL VARIABLES ---
let camYaw = 0;
let camPitch = -0.3;

// DEADZONE PREVENTS JUNK CAMERA SNAPPING
const CAMERA_DEADZONE = 0.15;
const CAMERA_SENSITIVITY = 0.04;
const CAMERA_SMOOTHING = 0.1;

// --- GAME LOOP ---
function animate() {
  requestAnimationFrame(animate);

  const gp = navigator.getGamepads()[gamepadIndex];
  let moveX = 0, moveZ = 0;
  let camX = 0, camY = 0;

  if (gp) {
    moveX = gp.axes[0];
    moveZ = gp.axes[1];
    camX = Math.abs(gp.axes[2]) > CAMERA_DEADZONE ? gp.axes[2] : 0;
    camY = Math.abs(gp.axes[3]) > CAMERA_DEADZONE ? gp.axes[3] : 0;
  }

  // --- PLAYER MOVEMENT ---
  const speed = 0.15;
  const angle = camYaw;
  player.position.x += (Math.sin(angle) * -moveZ + Math.cos(angle) * moveX) * speed;
  player.position.z += (Math.cos(angle) * -moveZ - Math.sin(angle) * moveX) * speed;

  // --- CAMERA UPDATE (SMOOTH + SAFE) ---
  camYaw += camX * CAMERA_SENSITIVITY;
  camPitch += camY * CAMERA_SENSITIVITY;
  camPitch = Math.max(-1.2, Math.min(-0.1, camPitch)); // prevents horizontal lock

  const targetCamPos = new THREE.Vector3(
    player.position.x + Math.sin(camYaw) * 6,
    player.position.y + 4 + camPitch * 2,
    player.position.z + Math.cos(camYaw) * 6
  );

  camera.position.lerp(targetCamPos, CAMERA_SMOOTHING);
  camera.lookAt(player.position.x, player.position.y + 1, player.position.z);

  renderer.render(scene, camera);
}

animate();

// --- RESIZE ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
