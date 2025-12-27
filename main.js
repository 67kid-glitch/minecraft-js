import { Game } from "./core/Game.js";
import { World } from "./world/World.js";
import { Player } from "./player/Player.js";
import { Renderer } from "./engine/Renderer.js";
import { MobSystem } from "./mobs/MobSystem.js";
import { StructureSystem } from "./world/StructureSystem.js";
const startScreen = document.getElementById("startScreen");

startScreen.addEventListener("click", () => {
  document.body.requestPointerLock();
  startScreen.style.display = "none";
});
const renderer = new Renderer();
// === DEBUG TEST CUBE (DO NOT SKIP) ===
const testGeo = new THREE.BoxGeometry(5, 5, 5);
const testMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const testCube = new THREE.Mesh(testGeo, testMat);
testCube.position.set(0, 5, 0);
renderer.scene.add(testCube);
const world = new World(renderer.scene);
const player = new Player(renderer.camera);
const mobs = new MobSystem(renderer.scene);
const structures = new StructureSystem(renderer.scene);

structures.spawn("trialChamber", 10, 10);
structures.spawn("woodlandMansion", -20, 10);
structures.spawn("fortress", 20, -20);
structures.spawn("bastion", -20, -20);

mobs.setDimension("overworld");

function gameLoop() {
  requestAnimationFrame(gameLoop);

  player.update();
  mobs.update(player, renderer.camera);
  renderer.render();
}

gameLoop();
