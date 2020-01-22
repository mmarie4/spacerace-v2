<template>
  <div class="min-h-screen w-full flex flex-col">
    <custom-topbar />
    <input
      type="text"
      placeholder="Player name"
      @input="setPlayerName"
      class="alerta mx-auto w-4/12 bg-gray-900 text-gray-400 p-1 m-4 rounded border-gray-600 border"
    />
    <leaderboard v-if="showLeaderboard" />
    <div class="flex-grow items-center justify-center flex">
      <ship-selector shipId="0" class="cursor-pointer" />
    </div>
    <custom-footer />
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import ShipSelector from "@/components/ShipSelector.vue";
import Footer from "@/components/Footer.vue";
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "home",

  components: {
    "custom-topbar": Topbar,
    "custom-footer": Footer,
    Leaderboard,
    ShipSelector
  },

  methods: {
    setPlayerName(event) {
      this.$store.commit("PLAYERNAME", event.target.value);
    }
  },

  computed: {
    showLeaderboard() {
      return this.$store.state.showLeaderboard;
    }
  }
};
</script>
