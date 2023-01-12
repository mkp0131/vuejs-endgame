<template>
  <div>
    <nav>
      <template v-if="isLogin">
        <router-link to="/add">새글추가</router-link>
        {{ getUser.username }}
        <a href="javascript:;" @click="logout">로그아웃</a>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </template>
    </nav>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
export default {
  computed: {
    getUser() {
      return this.$store.state.user.user;
    },
    isLogin() {
      return this.$store?.getters['user/isLogin'];
    },
  },
  methods: {
    logout() {
      this.$store.commit('user/LOGOUT_USER_SUCCESS');
      deleteCookie('til_user');
      deleteCookie('til_auth');
      return this.$router.push('/');
    },
  },
};
</script>

<style></style>
