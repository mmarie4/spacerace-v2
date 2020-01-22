<template>
  <div
    v-if="$store.state.showLeaderboard"
    class="w-full min-h-screen fixed flex-col flex items-center justify-center"
    @click="$store.commit('TOGGLE_LEADERBOARD')"
  >
    <!-- background  -->
    <div class="fixed w-full min-h-screen bg-black opacity-50"></div>

    <!-- modal -->
    <div
      v-if="$store.state.showLeaderboard"
      class="w-full min-h-screen fixed flex-col flex items-center justify-center"
    >
      <div class="border border-gray-900 w-auto h-auto p-4 bg-black rounded">
        <h2 class="pb-2">
          Leaderboard
        </h2>
        <div class="text-sm text-gray-400 items-center justify-center p-8">
          <spinner v-if="isLoading" class="p-5" />
          <div
            v-for="line in lines"
            :key="line.name"
            class="p-2 w-8/12 flex items-center justify-center w-full"
          >
            <div class="w-6/12 text-gray-400 font-bold">
              {{ line.name }}
            </div>
            <div class="w-6/12 text-gray-400">{{ line.score }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Leaderboard",
  components: {
    Spinner
  },

  data() {
    return {
      lines: [],
      isLoading: true
    };
  },

  created() {
    this.fetchScores();
  },

  methods: {
    async fetchScores() {
      const res = await this.$http.get("/leaderboard");
      this.lines = res.data;
      // eslint-disable-next-line no-console
      console.log(this.lines);
      this.isLoading = false;
    }
  }
};
</script>
