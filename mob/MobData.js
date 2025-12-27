window.MOB_DATA = [
  // Friendly
  { name:"Cow", type:"friendly", health:10, speed:0.02, hostile:false, color:0x8b4513 },
  { name:"Sheep", type:"friendly", health:8, speed:0.02, hostile:false, color:0xffffff },
  { name:"Pig", type:"friendly", health:10, speed:0.025, hostile:false, color:0xffaaaa },
  { name:"Chicken", type:"friendly", health:4, speed:0.03, hostile:false, color:0xffffaa },
  { name:"Villager", type:"neutral", health:20, speed:0.02, hostile:false, color:0xaa8855 },

  // Hostile
  { name:"Zombie", type:"hostile", health:20, speed:0.03, hostile:true, color:0x00aa00 },
  { name:"Skeleton", type:"hostile", health:20, speed:0.035, hostile:true, color:0xffffff },
  { name:"Creeper", type:"hostile", health:20, speed:0.025, hostile:true, color:0x00ff00 },
  { name:"Spider", type:"hostile", health:16, speed:0.04, hostile:true, color:0x000000 },
  { name:"Enderman", type:"hostile", health:40, speed:0.05, hostile:true, color:0x220022 },

  // === AUTO-GENERATED EXTRA MOBS (50+) ===
];

for (let i = 1; i <= 45; i++) {
  MOB_DATA.push({
    name: "Mob_" + i,
    type: i % 3 === 0 ? "hostile" : "neutral",
    health: 10 + (i % 10),
    speed: 0.02 + (i % 5) * 0.005,
    hostile: i % 3 === 0,
    color: Math.random() * 0xffffff
  });
}
