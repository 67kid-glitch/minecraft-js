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
