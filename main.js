const renderer = new Renderer();
const world = new World(renderer.scene);
const player = new Player(renderer.camera);
player.addToScene(renderer.scene);

const mobs = new MobSystem(renderer.scene);

const overlay = document.getElementById("click");
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  renderer.renderer.domElement.requestPointerLock();
});

function loop() {
  requestAnimationFrame(loop);
  player.update();
  mobs.update(player);
  renderer.render();
}

loop();
