const constants = {
  // Game
  SHIPIDLIST: ["0", "1", "2", "3"],
  UPDATE_FREQ: 20,
  // Spaceships
  SPACESHIPS: [
    {
      id: "0",
      name: "Explorator",
      mass: 50,
      force_z: 0,
      force_y: 50,
      force_x: 100,
      boost: 10000,
      decay_boost: 2.0,
      boost_cooldown_ms: 3000,
      max_speed: { x: 10, y: 5, z: 0 },
      boost_max_speed: { x: 20, y: 10, z: 0 },
      reactors_offset: [
        { x: -1, y: 0, z: 4.0 },
        { x: 0, y: 0.5, z: 3.5 },
        { x: 1, y: 0, z: 4.0 }
      ]
    }
  ],
  // Spawn
  SPAWN_SPEED: 50,
  SPAWN_Z: -500,
  SPAWN_LIMIT_FAR: 2000,
  SPAWN_LIMIT_NEAR: 400,
  SPAWN_FREQ_NEAR: 0.8,
  SPAWN_FREQ_FAR: 0.2,
  NUMBER_OF_POP: 10,
  // Enemy
  ENEMIES_SPEED_Z: 15,
  ENEMIES_KPX: 0.4,
  ENEMIES_KPY: 0.1,
  BORDER_ENEMIES: 20,
  AIM_ENEMY_Y: 5,
  LIMIT_AIM: 0,
  ANTICIPATE: 40,
  // Engine
  FRICTIONS: {
    x: 0.2,
    y: 0.2,
    z: 0
  },
  ROT_FRICTIONS: {
    x: 0.8,
    y: 0.8,
    z: 0.4
  },
  MAX_ROTATION: 0.6,
  MIN_ROTATION: -0.6,
  ROT_BALANCE_KP: 200
};

export { constants };
