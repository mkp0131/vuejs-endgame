<template>
  <div>
    <h1>LoginForm</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="username">ID</label>
        <input type="text" id="username" v-model="username" autofocus />
      </div>
      <div>
        <label for="password">PW</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
    <h3>{{ logMsg }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      logMsg: '',
    };
  },
  methods: {
    async onSubmit() {
      const { username, password } = this;

      await this.$store.dispatch('user/LOGIN_ACTION', { username, password });

      this.$router.push('/main');
    },
  },
};
</script>

<style></style>
