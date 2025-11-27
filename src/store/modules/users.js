import { USER_TYPES } from '../types';
import { usersApi } from '@/api/users';

const state = {
  users: [],
  currentUser: null
};

const mutations = {
  [USER_TYPES.SET_USERS](state, users) {
    state.users = users;
  },
  [USER_TYPES.SET_USER_DETAIL](state, user) {
    state.currentUser = user;
  },
  [USER_TYPES.ADD_USER](state, user) {
    state.users.push(user);
  },
  [USER_TYPES.UPDATE_USER](state, updatedUser) {
    const index = state.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  [USER_TYPES.DELETE_USER](state, userId) {
    state.users = state.users.filter(u => u.id !== userId);
  }
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await usersApi.getUsers();
    const roles = response.data.data.map(user => user.roles);
    commit(USER_TYPES.SET_USERS, response.data.data);
    return response;
  },

  async fetchUser({ commit }, userId) {
    const response = await usersApi.getUser(userId);
    commit(USER_TYPES.SET_USER_DETAIL, response.data.data);
    return response;
  },

  async createUser({ commit }, userData) {
    const response = await usersApi.createUser(userData);
    commit(USER_TYPES.ADD_USER, response.data.data);
    return response;
  },

  async updateUser({ commit }, { userId, userData }) {
    const response = await usersApi.updateUser(userId, userData);
    commit(USER_TYPES.UPDATE_USER, response.data.data);
    return response;
  },

  async deleteUser({ commit }, userId) {
    await usersApi.deleteUser(userId);
    commit(USER_TYPES.DELETE_USER, userId);
  }
};

const getters = {
  users: (state) => state.users,
  currentUser: (state) => state.currentUser
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};