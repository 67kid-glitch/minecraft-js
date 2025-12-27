const renderer = new Renderer();

let currentDimension;

function loadDimension(name) {
  if (currentDimension) currentDimension.destroy();

  if (name === "nether") {
    currentDimension = new Dimension("nether", renderer.scene, {
      sky: 0x330000,
      block: 0xaa0000
    });
  } else if (name === "end") {
    currentDimension = new Dimension("end", renderer.scene, {
      sky: 0x000000,
      block: 0x555555
    });
  } else {
    currentDimension = new Dimension("overworld", renderer.scene, {
      sky: 0x87ceeb,
      block: 0x55aa55
    });
  }
}

loadDimension("overworld");

const player = new Player(renderer.camera);
player.addToScene(renderer.scene);

// === TEMP DIMENSION SWITCH KEYS ===
window.addEventListener("keydown", e => {
  if (e.key === "1") loadDimension("overworld");
  if (e.key === "2") loadDimension("nether");
  if (e.key === "3") loadDimension("end");
});

const overlay = document.getElementById("click");
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  renderer.renderer.domElement.requestPointerLock();
});

function loop() {
  requestAnimationFrame(loop);
  player.update();
  renderer.render();
}

loop();
