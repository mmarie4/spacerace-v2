import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentScore: 0,
    playerName: "New Player",
    running: false,
    gameOver: false,
    showLeaderboard: false,
    boostReady: false
  },
  mutations: {
    TOGGLE_PAUSE(state) {
      state.running = !state.running;
    },
    TOGGLE_LEADERBOARD(state) {
      state.showLeaderboard = !state.showLeaderboard;
    },
    START(state) {
      state.running = true;
      state.gameOver = false;
    },
    GAME_OVER(state) {
      state.running = false;
      state.gameOver = true;
    },
    PLAYERNAME(state, payload) {
      state.playerName = payload;
    },
    BOOST_READY(state, payload) {
      state.boostReady = payload;
    },
    SET_SCORE(state, payload) {
      state.currentScore = payload;
    }
  },
  actions: {},
  modules: {}
});
