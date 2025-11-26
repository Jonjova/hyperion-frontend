import axios from '@/config/axios'

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  LOGOUT(state) {
    state.token = null
    state.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

const actions = {
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    try {
      const response = await axios.post('/login', credentials)
      
      const { token, user } = response.data
      
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
      
      // Configurar el token en axios para futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      return response.data
    } catch (error) {
      throw error.response?.data || error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async logout({ commit }) {
    try {
      await axios.post('/logout')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      commit('LOGOUT')
      delete axios.defaults.headers.common['Authorization']
    }
  },

  initializeAuth({ commit }) {
    const token = localStorage.getItem('token')
    if (token) {
      commit('SET_TOKEN', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}

const getters = {
  isAuthenticated: state => !!state.token,
  user: state => state.user,
  isLoading: state => state.loading
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}