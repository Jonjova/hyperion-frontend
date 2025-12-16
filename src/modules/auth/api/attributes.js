import { ATTRIBUTE_TYPES } from '../../../store/types';

const state = {
  attributes: {},
  userAttributes: {}
};

const mutations = {
  [ATTRIBUTE_TYPES.SET_ATTRIBUTES](state, attributes) {
    state.attributes = attributes;
  },
  [ATTRIBUTE_TYPES.SET_USER_ATTRIBUTES](state, userAttributes) {
    state.userAttributes = userAttributes;
  }
};

const actions = {
  setUserAttributes({ commit }, attributes) {
    commit(ATTRIBUTE_TYPES.SET_USER_ATTRIBUTES, attributes);
  }
};

const getters = {
  userAttributes: (state) => state.userAttributes
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};