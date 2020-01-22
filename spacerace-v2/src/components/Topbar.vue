<template>
  <div
    class="topbar-container flex w-full justify-between items-center border-b border-gray-900 py-4 bg-black shadow"
  >
    <!-- Home button -->
    <div class="w-3/12">
      <div class="justify-left flex items-center p-4" v-if="showHome">
        <router-link to="/home">
          <img class="h-4" src="@/assets/spaceship.png" />
        </router-link>
      </div>
    </div>
    <!-- Title -->
    <img class="w-auto" src="@/assets/title.png" />
    <!-- Actions buttons -->
    <div class="flex w-3/12 items-center justify-end">
      <div class="p-4">
        <a href="https://github.com/mmarie4/spacerace-v2" target="_blank">
          <img src="@/assets/code-icon.png" class="h-4" />
        </a>
      </div>
      <div class="p-4">
        <img
          src="@/assets/leaderboard.png"
          @click="onClickLeaderboard"
          class="cursor-pointer h-4"
        />
      </div>
      <div class="p-4">
        <img
          src="@/assets/pause-icon.png"
          @click="onClickPause"
          class="cursor-pointer h-4"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Topbar",
  props: {
    showHome: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    onClickPause() {
      this.$store.commit("TOGGLE_PAUSE");
    },
    onClickLeaderboard() {
      this.$store.commit("TOGGLE_LEADERBOARD");
    }
  }
};
</script>

<style scoped>
.topbar-container {
  height: 100px;
}
</style>
