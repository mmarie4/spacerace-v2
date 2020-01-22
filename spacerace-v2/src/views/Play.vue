<template>
  <div class="min-h-screen w-full flex flex-col">
    <custom-topbar :showHome="true" />
    <div class="w-full absolute" style="top: 20%;">
      <floating-text class="m-16" v-if="gameOver" source="/img/gameover.png" />
      <floating-text
        class="m-16 cursor-pointer"
        v-if="gameOver"
        source="/img/play.png"
        @click="restart()"
      />
    </div>
    <leaderboard v-if="showLeaderboard" />
    <div
      v-if="isLoading"
      class="w-full flex flex-grow items-center justify-center"
    >
      <spinner />
    </div>
    <game
      v-if="!gameOver && !isLoading"
      :models="models"
      :gameOver="gameOver"
      :textures="textures"
      :shipId="shipId"
      @game:over="gameOver = true"
    />
    <div class="flex-grow"></div>
    <custom-footer :showScore="true" />
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import Leaderboard from "@/components/Leaderboard.vue";
import FloatingText from "@/components/FloatingText.vue";
import Game from "@/components/Game.vue";
import { constants } from "@/utils/constants.js";
import * as THREE from "three";
import Spinner from "@/components/Spinner";
import { loadingHelpers } from "@/utils/loadingHelpers.js";

export default {
  name: "play",
  components: {
    "custom-topbar": Topbar,
    "custom-footer": Footer,
    Leaderboard,
    FloatingText,
    Game,
    Spinner
  },

  data() {
    return {
      isLoading: true,
      gameOver: false,
      manager: new THREE.LoadingManager(),
      models: {},
      textures: {}
    };
  },

  computed: {
    showLeaderboard() {
      return this.$store.state.showLeaderboard;
    },
    shipId() {
      // Init ship from param
      return constants.SHIPIDLIST.includes(this.$route.params.shipId)
        ? this.$route.params.shipId
        : "1";
    }
  },

  created() {
    this.manager.onLoad = () => {
      // console.log("Loading complete !");
      this.isLoading = false;
    };
    loadingHelpers.loadModel(
      this.manager,
      this.models,
      "ship",
      "/models/joined-spaceship" + this.shipId + ".glb"
    );
    loadingHelpers.loadModel(
      this.manager,
      this.models,
      "enemy",
      "/models/joined-enemy.glb"
    );
    loadingHelpers.loadTexture(
      this.manager,
      this.textures,
      "reactor",
      "/textures/reactor.png"
    );
  },

  methods: {
    restart() {
      // console.log("Restarting game");
      this.gameOver = false;
    }
  }
};
</script>
