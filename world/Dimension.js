class Dimension {
  constructor(name, scene, options) {
    this.name = name;
    this.scene = scene;
    this.blocks = [];

    scene.background = new THREE.Color(options.sky);

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshLambertMaterial({ color: options.block });

    for (let x = -10; x <= 10; x++) {
      for (let z = -10; z <= 10; z++) {
        const block = new THREE.Mesh(geo, mat);
        block.position.set(x, 0, z);
        scene.add(block);
        this.blocks.push(block);
      }
    }
  }

  destroy() {
    this.blocks.forEach(b => this.scene.remove(b));
    this.blocks.length = 0;
  }
}

window.Dimension = Dimension;
