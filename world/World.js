class World {
  constructor(scene) {
    this.scene = scene;
    this.blocks = [];

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x55aa55 });

    for (let x = -10; x <= 10; x++) {
      for (let z = -10; z <= 10; z++) {
        const block = new THREE.Mesh(geometry, material);
        block.position.set(x, 0, z);
        scene.add(block);
        this.blocks.push(block);
      }
    }
  }
}

window.World = World;
