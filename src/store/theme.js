export default {
  namespaced: true,

  state: () => ({
    theme: localStorage.getItem("theme") || "light"
  }),

  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.setItem("theme", theme);
    }
  },

  actions: {
    setTheme({ commit }, theme) {
      commit("SET_THEME", theme);
    },

    initTheme({ dispatch, state }) {
      dispatch("setTheme", state.theme);
    }
  }
};
