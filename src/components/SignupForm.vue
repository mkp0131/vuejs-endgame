<template>
  <div>
    <h1>LoginForm</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="id">ID</label>
        <input type="text" id="id" v-model="username" />
        <!-- 값을 확인하고 경고창 -->
        <p v-if="!isValidateEmail && username">이메일 형식이 아닙니다.</p>
      </div>
      <div>
        <label for="pw">PW</label>
        <input type="text" id="pw" v-model="password" />
      </div>
      <div>
        <label for="nickname">NICKNAME</label>
        <input type="text" id="nickname" v-model="nickname" />
      </div>
      <div>
        <!-- 이메일인지 확인하고 버튼 활성화 -->
        <button :disabled="!isValidateEmail" type="submit">회원가입</button>
      </div>
    </form>
    <h3>{{ logMassege }}</h3>
  </div>
</template>

<script>
import { singupUserApi } from '@/api';
import { validateEmail } from '@/utils/validation';
import router from '../router';

export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      logMassege: '',
    };
  },
  computed: {
    // 이메일 값을 실시간으로 계산함
    isValidateEmail() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async onSubmit() {
      try {
        let { username, password, nickname } = this;

        if (!validateEmail(username)) {
          return (this.logMassege = '이메일 형식이 아닙니다.');
        }

        const response = await singupUserApi({
          username,
          password,
          nickname,
        });

        this.logMassege = `${response.data.username}님이 회원가입 되었습니다.`;
        router.push('/main');
      } catch (error) {
        console.error(error);
        console.error(error.message);
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style></style>
