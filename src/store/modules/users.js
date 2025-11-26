import axios from '@/config/axios'

const state = {
  users: [],
  loading: false
}

const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  async fetchUsers({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await axios.get('/users')
      commit('SET_USERS', response.data.data || response.data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  users: state => state.users,
  isLoading: state => state.loading
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}