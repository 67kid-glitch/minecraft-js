window.MOB_DATA = [
  // === FRIENDLY (OVERWORLD) ===
  { name:"Cow", type:"friendly", health:10, speed:0.02, hostile:false, color:0x8b4513, dimensions:["overworld"] },
  { name:"Sheep", type:"friendly", health:8, speed:0.02, hostile:false, color:0xffffff, dimensions:["overworld"] },
  { name:"Pig", type:"friendly", health:10, speed:0.025, hostile:false, color:0xffaaaa, dimensions:["overworld"] },
  { name:"Chicken", type:"friendly", health:4, speed:0.03, hostile:false, color:0xffffaa, dimensions:["overworld"] },
  { name:"Villager", type:"neutral", health:20, speed:0.02, hostile:false, color:0xaa8855, dimensions:["overworld"] },

  // === HOSTILE (OVERWORLD) ===
  { name:"Zombie", type:"hostile", health:20, speed:0.03, hostile:true, color:0x00aa00, dimensions:["overworld"] },
  { name:"Skeleton", type:"hostile", health:20, speed:0.035, hostile:true, color:0xffffff, dimensions:["overworld"] },
  { name:"Creeper", type:"hostile", health:20, speed:0.025, hostile:true, color:0x00ff00, dimensions:["overworld"] },
  { name:"Spider", type:"hostile", health:16, speed:0.04, hostile:true, color:0x000000, dimensions:["overworld"] },

  // === ALL DIMENSIONS ===
  { name:"Enderman", type:"hostile", health:40, speed:0.05, hostile:true, color:0x220022, dimensions:"all" },

  // === NETHER ===
  { name:"Piglin", type:"neutral", health:20, speed:0.03, hostile:false, color:0xffccaa, dimensions:["nether"] },
  { name:"Ghast", type:"hostile", health:10, speed:0.04, hostile:true, color:0xffffff, dimensions:["nether"], flying:true },
  { name:"Blaze", type:"hostile", health:20, speed:0.04, hostile:true, color:0xffaa00, dimensions:["nether"], flying:true },

  // === END ===
  { name:"Shulker", type:"hostile", health:30, speed:0.01, hostile:true, color:0xaa55ff, dimensions:["end"] },
  { name:"Endermite", type:"hostile", health:8, speed:0.03, hostile:true, color:0x8844aa, dimensions:["end"] },

  // === BOSS ===
  {
    name: "Bob",
    type: "boss",
    health: 300,
    speed: 0.08,
    hostile: true,
    color: 0x663399,
    dimensions: ["end"],
    flying: true,
    size: { x: 6, y: 3, z: 6 }
  }
];

// === AUTO-GENERATED EXTRA MOBS (50+) ===
for (let i = 1; i <= 50; i++) {
  MOB_DATA.push({
    name: "Mob_" + i,
    type: i % 2 === 0 ? "hostile" : "neutral",
    health: 10 + (i % 10),
    speed: 0.02 + (i % 5) * 0.005,
    hostile: i % 2 === 0,
    color: Math.random() * 0xffffff,
    dimensions: i % 6 === 0 ? "all" : ["overworld"]
  });
}
