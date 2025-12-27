const renderer = new Renderer();
const world = new World(renderer.scene);
const player = new Player(renderer.camera);

function loop() {
  requestAnimationFrame(loop);
  player.update();
  renderer.render();
}

loop();
