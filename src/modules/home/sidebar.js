// state
const state = () => ({
  sidebarCollapsed: false,
  header: 'Mi Aplicación'
});

// mutations
const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebarCollapsed = !state.sidebarCollapsed;
  },
  SET_HEADER(state, header) {
    state.header = header;
  }
};

// actions
const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  setHeader({ commit }, header) {
    commit('SET_HEADER', header);
  }
};

// getters
const getters = {
  isSidebarCollapsed(state) {
    return state.sidebarCollapsed;
  },
  getHeader(state) {
    return state.header;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};