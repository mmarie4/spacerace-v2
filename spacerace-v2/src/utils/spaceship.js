import * as THREE from "three";
import { engine } from "./engine.js";

export const spaceship = {
  init: function(models, textures, scene, y, z, xspeed, yspeed, store, stats) {
    const ship = models.ship.clone();
    const group = new THREE.Group();
    group.mass = stats.mass;
    group.maxSpeed = stats.max_speed;
    group.position.y = y;
    group.position.z = z;
    group.boostForce = 0;
    group.speed = { x: 0, y: 0, z: 0 };
    group.accel = { x: 0, y: 0, z: 0 };
    group.rotAccel = { x: 0, y: 0, z: 0 };
    group.rotSpeed = { x: 0, y: 0, z: 0 };
    group.force = { x: 0, y: 0, z: 100 };
    group.lastBoost = new Date();
    group.hitbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    group.move = function() {
      this.hitbox.set(this.position, this.position);
      // Accelerate when pressing buttons
      this.force.y =
        this.upPressed && this.downPressed
          ? 0
          : this.upPressed
          ? stats.force_y + this.boostForce
          : this.downPressed
          ? -1 * (stats.force_y + this.boostForce)
          : 0;
      this.force.x =
        this.rightPressed && this.leftPressed
          ? 0
          : this.rightPressed
          ? stats.force_x + this.boostForce
          : this.leftPressed
          ? -1 * (stats.force_x + this.boostForce)
          : 0;
      this.force.z = stats.force_z;
      engine.translate(this);
      // Reinit boost
      this.boostForce = 0;
      this.reactorLight =
        3 + Math.abs(this.speed.x) / 5 + Math.abs(this.speed.y) / 5;
      this.reactor1.scale.set(
        this.reactorLight,
        this.reactorLight,
        this.reactorLight
      );
      this.reactor2.scale.set(
        this.reactorLight,
        this.reactorLight,
        this.reactorLight
      );
      this.reactor3.scale.set(
        this.reactorLight,
        this.reactorLight,
        this.reactorLight
      );
      group.reactor1.position.set(
        ship.position.x + stats.reactors_offset[0].x,
        ship.position.y + stats.reactors_offset[0].y,
        ship.position.z + stats.reactors_offset[0].z
      );
      group.reactor2.position.set(
        ship.position.x + stats.reactors_offset[1].x,
        ship.position.y + stats.reactors_offset[1].y,
        ship.position.z + stats.reactors_offset[1].z
      );
      group.reactor3.position.set(
        ship.position.x + stats.reactors_offset[2].x,
        ship.position.y + stats.reactors_offset[2].y,
        ship.position.z + stats.reactors_offset[2].z
      );
      this.hitbox.setFromObject(this);
      ship.light.position.set =
        (ship.position.x + 5, ship.position.y + 5, ship.position.z);
    };
    group.checkCollisions = function(objects, scene) {
      objects.forEach(o => {
        if (o.hitbox.intersectsBox(this.hitbox)) scene.end();
      });
    };
    group.boost = function() {
      if (Math.abs(new Date() - this.lastBoost) > stats.boost_cooldown_ms) {
        store.commit("BOOST_READY", false);
        this.lastBoost = new Date();
        this.maxSpeed.x = stats.boost_max_speed.x;
        this.maxSpeed.y = stats.boost_max_speed.y;
        this.boostForce = stats.boost;
      }
    };
    (group.checkBoost = function() {
      if (
        Math.abs(new Date() - this.lastBoost) > stats.boost_cooldown_ms &&
        !store.state.boostReady
      ) {
        store.commit("BOOST_READY", true);
        this.maxSpeed.x = stats.max_speed.x;
        this.maxSpeed.y = stats.max_speed.y;
      }
    }),
      (group.kill = function(scene) {
        scene.remove(this);
      });
    ship.light = new THREE.PointLight(0xffffff, 0.5, 0, 2);
    ship.light.position.set =
      (ship.position.x + 5, ship.position.y + 5, ship.position.z);
    // Sprites : https://ui-ex.com/explore/transparent-circle-light/
    let spriteMaterial = new THREE.SpriteMaterial({
      map: textures.reactor,
      color: 0xffffff
    });
    group.reactor1 = new THREE.Sprite(spriteMaterial);
    group.reactor2 = new THREE.Sprite(spriteMaterial);
    group.reactor3 = new THREE.Sprite(spriteMaterial);
    group.reactor1.scale.set(5, 5, 5);
    group.reactor2.scale.set(5, 5, 5);
    group.reactor3.scale.set(5, 5, 5);
    group.add(ship);
    group.add(group.reactor1);
    group.add(group.reactor2);
    group.add(group.reactor3);
    group.add(ship.light);
    scene.add(group);
    return group;
  }
};
