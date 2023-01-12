import { loginApi } from '../api';
import {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
} from '@/utils/cookies';

export default {
  namespaced: true,
  state: {
    user: { username: getUserFromCookie() || null },
    accessToken: getAuthFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return !!state.user?.username;
    },
  },
  mutations: {
    LOGIN_USER_SUCCESS(state, { user, token }) {
      state.user = user;
      state.accessToken = token;
    },
    LOGOUT_USER_SUCCESS(state) {
      state.user = null;
      state.accessToken = '';
    },
  },
  actions: {
    async LOGIN_ACTION({ commit }, userData) {
      try {
        const response = await loginApi(userData);

        const { user, token } = response.data;

        commit('LOGIN_USER_SUCCESS', { user, token });

        saveAuthToCookie(token);
        saveUserToCookie(user.username);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
};
