<template>
  <div
    class="footer-container flex w-full justify-between items-center text-xs px-8 bg-black border-t border-gray-900"
  >
    <div class="text-xs">Max MARIE - 2019 ©</div>
    <p id="time" v-if="showScore">{{ this.score }}</p>
  </div>
</template>

<script>
export default {
  name: "Footer",

  props: {
    showScore: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {};
  },

  computed: {
    score() {
      return this.$store.state.currentScore;
    }
  }
};
</script>

<style scoped>
.footer-container {
  height: 25px;
}
</style>
