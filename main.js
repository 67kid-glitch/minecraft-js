// ===============================
// COLLISION — EXPANDED CORE
// ===============================

// --- THREE SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b14);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- LIGHT ---
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

// ===============================
// SAVE + MEMORY SYSTEM
// ===============================
const save = JSON.parse(localStorage.getItem("collision_save")) || {
  world: 0,
  resets: 0,
  characterSwitches: 0
};

function saveGame() {
  localStorage.setItem("collision_save", JSON.stringify(save));
}

// ===============================
// WORLDS
// ===============================
let currentWorld = save.world;
const worlds = [];

function createWorld(color) {
  const g = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({ color })
  );
  g.rotation.x = -Math.PI / 2;
  scene.add(g);
  return g;
}

worlds.push(createWorld(0x1f2233));
worlds.push(createWorld(0x33201f));
worlds.push(createWorld(0x1f3324));

worlds.forEach((w, i) => w.visible = i === currentWorld);

function switchWorld() {
  worlds[currentWorld].visible = false;
  currentWorld = (currentWorld + 1) % worlds.length;
  worlds[currentWorld].visible = true;
  save.world = currentWorld;
  saveGame();
}

// ===============================
// PLAYER
// ===============================
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0xff4444 })
);
player.position.set(0, 1, 0);
scene.add(player);

// ===============================
// PHYSICS
// ===============================
let velY = 0;
let velX = 0;
let velZ = 0;
const GRAVITY = -0.018;
let grounded = false;

// ===============================
// CHARACTERS
// ===============================
const characters = [
  { name: "Mario", speed: 0.14, jump: 0.36 },
  { name: "Sans", speed: 0.12, jump: 0.30 },
  { name: "Red", speed: 0.16, jump: 0.33 }
];
let currentChar = 0;

// ===============================
// INPUT
// ===============================
let gamepadIndex = null;
window.addEventListener("gamepadconnected", e => gamepadIndex = e.gamepad.index);

// ===============================
// CAMERA (GOOD CAMERA)
/// ===============================
let camYaw = 0;
let camPitch = -0.35;
const DEADZONE = 0.15;

// ===============================
// ENEMIES
// ===============================
const enemies = [];
function spawnEnemy(x, z) {
  const e = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x44ff44 })
  );
  e.position.set(x, 0.5, z);
  e.hp = 3;
  scene.add(e);
  enemies.push(e);
}
spawnEnemy(5, 5);
spawnEnemy(-6, 3);

// ===============================
// GAME LOOP
// ===============================
function animate() {
  requestAnimationFrame(animate);

  const gp = navigator.getGamepads()[gamepadIndex];
  let moveX = 0, moveZ = 0, camX = 0, camY = 0;
  let jump = false, sprint = false, attack = false, swap = false, travel = false;

  if (gp) {
    moveX = gp.axes[0];
    moveZ = gp.axes[1];
    camX = Math.abs(gp.axes[2]) > DEADZONE ? gp.axes[2] : 0;
    camY = Math.abs(gp.axes[3]) > DEADZONE ? gp.axes[3] : 0;
    jump = gp.buttons[0].pressed;
    attack = gp.buttons[2].pressed;
    sprint = gp.buttons[7].pressed;
    swap = gp.buttons[5].pressed;
    travel = gp.buttons[4].pressed;
  }

  // --- CHARACTER SWITCH ---
  if (swap) {
    currentChar = (currentChar + 1) % characters.length;
    save.characterSwitches++;
    saveGame();
  }

  if (travel) switchWorld();

  const char = characters[currentChar];
  const accel = char.speed * (sprint ? 1.6 : 1);

  // --- CAMERA ROTATION ---
  camYaw += camX * 0.04;
  camPitch += camY * 0.04;
  camPitch = Math.max(-1.2, Math.min(-0.15, camPitch));

  // --- SPEEDRUN MOMENTUM ---
  velX += (Math.sin(camYaw) * -moveZ + Math.cos(camYaw) * moveX) * accel * 0.6;
  velZ += (Math.cos(camYaw) * -moveZ - Math.sin(camYaw) * moveX) * accel * 0.6;

  velX *= grounded ? 0.85 : 0.97;
  velZ *= grounded ? 0.85 : 0.97;

  player.position.x += velX;
  player.position.z += velZ;

  // --- JUMP ---
  if (jump && grounded) {
    velY = char.jump;
    grounded = false;
  }

  velY += GRAVITY;
  player.position.y += velY;

  if (player.position.y <= 1) {
    player.position.y = 1;
    velY = 0;
    grounded = true;
  }

  // --- COMBAT ---
  if (attack) {
    enemies.forEach(e => {
      if (e.position.distanceTo(player.position) < 2) {
        e.hp--;
        if (e.hp <= 0) {
          scene.remove(e);
        }
      }
    });
  }

  // --- CAMERA FOLLOW + COLLISION ---
  const desiredCam = new THREE.Vector3(
    player.position.x + Math.sin(camYaw) * 7,
    player.position.y + 4,
    player.position.z + Math.cos(camYaw) * 7
  );

  camera.position.lerp(desiredCam, 0.12);
  camera.lookAt(player.position.x, player.position.y + 1, player.position.z);

  renderer.render(scene, camera);
}

animate();

// --- RESET TRACKING ---
window.addEventListener("beforeunload", () => {
  save.resets++;
  saveGame();
});

// --- RESIZE ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
