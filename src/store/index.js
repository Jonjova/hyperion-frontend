import Vue from 'vue';
import Vuex from 'vuex';
import auth from '../modules/auth/api/auth';
import users from '../modules/users/users';
import permissions from '../modules/auth/api/permissions';  // Cambiado
import attributes from '../modules/auth/api/attributes';    // Cambiado
import sidebar from '../modules/home/sidebar';          // Cambiado
import theme from './theme';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    theme,
    auth,
    users,
    permissions,
    attributes,
    sidebar
  },
  strict: process.env.NODE_ENV !== 'production'
});