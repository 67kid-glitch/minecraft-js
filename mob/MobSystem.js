class MobSystem {
  constructor(scene) {
    this.scene = scene;
    this.mobs = [];
    this.currentDimension = "overworld";
  }

  setDimension(name) {
    // Remove existing mobs
    this.mobs.forEach(m => m.destroy());
    this.mobs = [];
    this.currentDimension = name;

    MOB_DATA.forEach(data => {
      const allowed =
        data.dimensions === "all" ||
        data.dimensions.includes(name);

      if (allowed) {
        this.mobs.push(new Mob(data, this.scene));
      }
    });
  }

  update(player, camera) {
    this.mobs.forEach(mob => {
      mob.update(player.body.position, camera);
    });
  }
}

window.MobSystem = MobSystem;
