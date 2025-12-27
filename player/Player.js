class Player {
  constructor(camera) {
    this.camera = camera;
    this.keys = {};
    this.yaw = 0;
    this.pitch = 0;
    this.speed = 0.15;

    window.addEventListener("keydown", e => this.keys[e.key] = true);
    window.addEventListener("keyup", e => this.keys[e.key] = false);

    document.addEventListener("mousemove", e => {
      if (document.pointerLockElement) {
        this.yaw -= e.movementX * 0.002;
        this.pitch -= e.movementY * 0.002;
        this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
        this.camera.rotation.set(this.pitch, this.yaw, 0);
      }
    });
  }

  update() {
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0));

    if (this.keys["w"]) this.camera.position.addScaledVector(forward, this.speed);
    if (this.keys["s"]) this.camera.position.addScaledVector(forward, -this.speed);
    if (this.keys["a"]) this.camera.position.addScaledVector(right, -this.speed);
    if (this.keys["d"]) this.camera.position.addScaledVector(right, this.speed);
  }
}

window.Player = Player;
