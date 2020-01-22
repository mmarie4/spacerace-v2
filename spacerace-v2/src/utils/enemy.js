import { constants } from "./constants.js";
import * as THREE from "three";

export const enemy = {
  create: function (x, y, z, speedz, scene, models) {
    const enemy = models.enemy.clone();
    enemy.position.set(x, y, z);
    enemy.zSpeed = speedz;
    enemy.Kpy = constants.ENEMIES_KPY * Math.random();
    enemy.Kpx = constants.ENEMIES_KPX * Math.random();
    enemy.hitbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    enemy.anticipate = constants.ANTICIPATE * Math.random();

    enemy.move = function (spaceship) {
      this.position.z += this.zSpeed;
      let OFFSET_Y = 0;
      OFFSET_Y = spaceship.upPressed ? OFFSET_Y + this.anticipate : OFFSET_Y;
      OFFSET_Y = spaceship.downPressed
        ? OFFSET_Y + -1 * this.anticipate
        : OFFSET_Y;
      let errorY =
        (spaceship.position.y +
          constants.AIM_ENEMY_Y +
          OFFSET_Y -
          this.position.y) *
        this.Kpy;
      let OFFSET_X = 0;
      OFFSET_X = spaceship.rightPressed ? OFFSET_X + this.anticipate : OFFSET_X;
      OFFSET_X = spaceship.leftPressed
        ? OFFSET_X + -1 * this.anticipate
        : OFFSET_X;
      let errorX =
        (spaceship.position.x + OFFSET_X - this.position.x) * this.Kpx;
      // let errorX_noOffset = (spaceship.position.x - this.position.x) * this.Kpx;
      this.position.y += errorY;
      this.position.x += errorX;
      this.hitbox.setFromObject(this);
    };
    return enemy;
  }
};
