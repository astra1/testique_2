import Vue from 'vue';
import Vuex from 'vuex';
import storage from '@/vuex/storage';
import getters from '@/vuex/getters';
import actions from '@/vuex/actions';
import mutations from '@/vuex/mutations';

Vue.use(Vuex);
const state = {
  scores: [],
  lastGame: {
    finished: false,
    score: 0,
  },
  gameWon: false,
  settings: storage.getSettings(),
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
