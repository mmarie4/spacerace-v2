<template>
  <div>
    <div ref="game-render"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { constants } from "@/utils/constants.js";
import { spaceship } from "@/utils/spaceship.js";
import { enemy } from "@/utils/enemy.js";
import { listeners } from "@/utils/listeners.js";

export default {
  name: "Game",

  props: {
    shipId: String,
    models: Object,
    textures: Object,
    gameOver: Boolean
  },

  data() {
    return {
      score: 0,
      playerName: this.$store.state.playerName,
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      lastUpdate: new Date(),
      isLoading: true,
      pause: false,
      enemies: [],
      ship: {},
      timestart: {},
      camera: new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
    };
  },

  mounted() {
    this.init();
    this.animate();
  },

  methods: {
    init: function() {
      const el = this.$refs["game-render"];
      this.scene.background = new THREE.Color(0x040118);
      // lights
      const light = new THREE.PointLight(0xfff2c4, 2, 0, 2);
      light.position.set(1000, 3500, 0);
      this.scene.add(light);
      const light2 = new THREE.PointLight(0xc4ceff, 1.5, 0, 0);
      light2.position.set(-5000, -1000, -900);
      this.scene.add(light2);
      const light3 = new THREE.PointLight(0xf4e2ff, 2, 0, 0);
      light3.position.set(-10, -10, 0);
      this.scene.add(light3);
      // this.renderer
      this.renderer.setSize(window.innerWidth, window.innerHeight - 125);
      // spaceship
      this.ship = spaceship.init(
        this.models,
        this.textures,
        this.scene,
        -20,
        10,
        constants.SPACESHIP_SPEEDX,
        constants.SPACESHIP_SPEEDY,
        this.$store,
        constants.SPACESHIPS[this.shipId]
      );

      // World
      // initWorld(this.scene, 0, -100, 0);
      this.camera.position.z = 25;
      this.camera.rotation.x = -0.2;
      this.camera.update = function(object) {
        this.position.x = object.position.x;
        this.position.y = object.position.y + 5;
        this.position.z = object.position.z + 15;
      };
      // Handle game over
      this.scene.end = () => {
        const payload = {
          name: this.$store.state.playerName,
          score: this.score
        };
        this.$http.post("/new-score", payload);
        delete this.scene;
        this.$emit("game:over");
      };
      // Add scene and listeners
      el.appendChild(this.renderer.domElement);
      document.addEventListener("keydown", e => {
        listeners.onDocumentKeyDown(e, this);
      });
      document.addEventListener("keyup", e => {
        listeners.onDocumentKeyUp(e, this);
      });
      this.timestart = new Date();
    },

    animate: function() {
      if (Math.abs(new Date() - this.lastUpdate) > constants.UPDATE_FREQ) {
        if (!this.gameOver && !this.pause) {
          // Handle spawns
          const numberOfPop = Math.floor(
            Math.random() * constants.NUMBER_OF_POP
          );
          for (let i = 0; i < numberOfPop; i++) {
            if (Math.random() < constants.SPAWN_FREQ) {
              this.pop(constants.SPAWN_LIMIT_NEAR);
            }
            if (Math.random() < constants.SPAWN_FREQ_FAR) {
              this.pop(constants.SPAWN_LIMIT_FAR);
            }
          }
          // Move enemies
          for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].position.z > constants.BORDER_ENEMIES) {
              this.scene.remove(this.enemies[i]);
              this.enemies.splice(i, 1);
            } else {
              this.enemies[i].move(this.ship);
            }
          }
          // Handle spaceship
          this.ship.move();
          this.camera.update(this.ship);
          // Check collisions
          this.ship.checkCollisions(this.enemies, this.scene);
          // Update info displayed
          this.ship.checkBoost();
          this.score = Math.abs(new Date() - this.timestart) / 1000 + " s.";
          this.$store.commit("SET_SCORE", this.score);
        }
        this.lastUpdate = new Date();
      }
      // Render
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },

    pop(limit) {
      let newEnemy = enemy.create(
        this.ship.position.x + Math.random() * limit - limit / 2,
        this.ship.position.y + Math.random() * limit - limit / 2,
        constants.SPAWN_Z,
        constants.ENEMIES_SPEED_Z,
        this.scene,
        this.models
      );
      this.enemies.push(newEnemy);
      this.scene.add(newEnemy);
    }
  }
};
</script>
