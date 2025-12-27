class RedstoneLamp {
  constructor(scene, redstone, x, z) {
    this.redstone = redstone;
    this.matOff = new THREE.MeshLambertMaterial({ color: 0x222222 });
    this.matOn  = new THREE.MeshLambertMaterial({ color: 0xffff00 });

    const geo = new THREE.BoxGeometry(1,1,1);
    this.mesh = new THREE.Mesh(geo, this.matOff);
    this.mesh.position.set(x,1,z);
    scene.add(this.mesh);
  }

  update() {
    this.mesh.material = this.redstone.powered ? this.matOn : this.matOff;
  }
}

window.RedstoneLamp = RedstoneLamp;
