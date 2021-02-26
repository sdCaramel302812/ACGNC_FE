import axios from 'axios';
import { API } from '@/utils/constant.js';

const acgn = {
  namespaced: true,
  state: {
    tags: [],
  },
  mutations: {
    setTags(state, val) {
      state.tags = val;
    }
  },
  actions: {
    async fetchTags({ commit }) {
      try {
        await axios.get(API.WORKS_TAG)
      .then(res => {
        commit('setTags', res.data);
      });
        return Promise.resolve();
      } catch(e) {
        return Promise.reject(e);
      }
    }
  },
};

export default acgn;