alert("main.js running");
console.log("Renderer:", window.Renderer);
console.log("Player:", window.Player);
// click to play
const startScreen = document.getElementById("startScreen");
startScreen.onclick = () => {
  document.body.requestPointerLock();
  startScreen.style.display = "none";
};

// renderer
const renderer = new Renderer();

// DEBUG CUBE (KEEP THIS FOR NOW)
const testGeo = new THREE.BoxGeometry(5, 5, 5);
const testMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const testCube = new THREE.Mesh(testGeo, testMat);
testCube.position.set(0, 5, 0);
renderer.scene.add(testCube);

// world
const world = new World(renderer.scene);

// player
const player = new Player(renderer.camera);

// mobs
const mobs = new MobSystem(renderer.scene);
mobs.setDimension("overworld");

// loop
function loop() {
  requestAnimationFrame(loop);
  player.update();
  mobs.update(player, renderer.camera);
  renderer.render();
}
loop();
