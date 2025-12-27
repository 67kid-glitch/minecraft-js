class Mob {
  constructor(data, scene) {
    this.name = data.name;
    this.type = data.type;
    this.health = data.health;
    this.speed = data.speed;
    this.hostile = data.hostile;
    this.flying = data.flying || false;

    const size = data.size || { x: 0.9, y: 1.8, z: 0.9 };

    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshLambertMaterial({ color: data.color });
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.set(
      Math.random() * 20 - 10,
      this.flying ? 10 : 1,
      Math.random() * 20 - 10
    );

    scene.add(this.mesh);
    this.scene = scene;

    // === NAME TAG ===
    const label = document.createElement("div");
    label.textContent = this.name;
    label.style.position = "absolute";
    label.style.color = "white";
    label.style.fontFamily = "sans-serif";
    label.style.fontSize = "14px";
    label.style.pointerEvents = "none";
    label.style.textShadow = "0 0 4px black";
    document.body.appendChild(label);
    this.label = label;
  }

  update(playerPos, camera) {
    const dist = this.mesh.position.distanceTo(playerPos);

    if (this.hostile && dist < 40) {
      const dir = playerPos.clone().sub(this.mesh.position).normalize();
      if (!this.flying) dir.y = 0;
      this.mesh.position.addScaledVector(dir, this.speed);
    }

    // === UPDATE NAME TAG POSITION ===
    const screenPos = this.mesh.position.clone().project(camera);
    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
    this.label.style.transform = `translate(${x}px, ${y}px)`;
  }

  destroy() {
    this.scene.remove(this.mesh);
    this.label.remove();
  }
}

window.Mob = Mob;
