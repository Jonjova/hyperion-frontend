import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import users from './modules/users';
import permissions from './modules/permissions';
import attributes from './modules/attributes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    permissions,
    attributes
  },
  strict: process.env.NODE_ENV !== 'production'
});