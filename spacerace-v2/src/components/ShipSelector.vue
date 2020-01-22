<template>
  <div>
    <div v-if="isLoading" class="w-full flex items-center justify-center">
      <spinner />
    </div>
    <div class="alerta">{{ shipName }}</div>
    <div
      class="inline-block"
      :id="'ship-selector-' + shipId"
      @mouseover="pause = false"
      @mouseleave="pause = true"
      @click="selectShip"
    ></div>
  </div>
</template>

<script>
import * as THREE from "three";
import Spinner from "@/components/Spinner";
import { loadingHelpers } from "@/utils/loadingHelpers.js";
import { constants } from "@/utils/constants.js";

export default {
  name: "ShipSelector",

  props: ["shipId"],

  components: {
    Spinner
  },

  data() {
    return {
      scene: new THREE.Scene(),
      manager: new THREE.LoadingManager(),
      renderer: new THREE.WebGLRenderer(),
      lastUpdate: new Date(),
      models: {},
      isLoading: true,
      pause: true,
      shipName: constants.SPACESHIPS[this.shipId].name
    };
  },

  mounted() {
    this.manager.onLoad = () => {
      // eslint-disable-next-line no-console
      console.log("Loading complete !");
      this.isLoading = false;
      this.init();
      this.animate();
    };
    this.scene.models = {};
    loadingHelpers.loadModel(
      this.manager,
      this.models,
      "ship",
      "models/joined-spaceship" + this.shipId + ".glb"
    );
  },

  methods: {
    init: function() {
      this.renderer.setSize(200, 200);
      document
        .getElementById("ship-selector-" + this.shipId)
        .appendChild(this.renderer.domElement);
      let ship = this.models.ship.clone();
      ship.rotation.x = Math.PI / 8;
      ship.rotation.y = Math.PI / -8 + Math.PI;
      ship.position.z = -15;
      ship.move = function() {
        ship.rotation.y += Math.PI / 90;
      };
      this.scene.add(ship);
      this.scene.ship = ship;
      // camera
      const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
      this.scene.add(camera);
      this.scene.camera = camera;
      // Light
      const light = new THREE.PointLight(0xfff2c4, 2, 0, 2);
      light.position.set(10, 10, -10);
      this.scene.add(light);
      const light2 = new THREE.PointLight(0xfff2c4, 2, 0, 2);
      light2.position.set(2, -5, -5);
      const light3 = new THREE.PointLight(0xffffff, 2, 0, 2);
      light3.position.set(-5, 0, 5);
      this.scene.add(light3);
      this.scene.background = new THREE.Color(0x040118);
    },

    animate: function() {
      if (Math.abs(new Date() - this.lastUpdate) > constants.UPDATE_FREQ) {
        if (!this.pause) {
          // Handle spaceship
          this.scene.ship.move();
        }
        this.lastUpdate = new Date();
      }
      // Render
      this.renderer.render(this.scene, this.scene.camera);
      requestAnimationFrame(this.animate);
    },

    selectShip() {
      this.$router.push({
        name: "play",
        params: {
          shipId: this.shipId
        }
      });
    }
  }
};
</script>
