# vuejs-endgame

## [vue] vue2 프로젝트 세팅, eslint 세팅

### 백엔드 레포지토리

- https://github.com/joshua1988/vue-til-server

### 프로젝트 설치 옵션

- Manually select features
- Babel, Linter, Unit, router, vuex
- 2.x <-- Vue 2로 하시는게 중요합니다. 아직 Vue 3는 상용 서비스에 적용하기에는 무리가 있습니다.
- Prettier
- Lint on Save
- Jest
- In dedicated config files

### [vue] eslint 설정

- 참고문서: https://joshua1988.github.io/web-development/vuejs/boost-productivity/
- vscode 설정에 eslint 검색 probe 항목에 eslint 적용항목들이 적혀있다.
- settings.json 세팅
- 작업영역에서 prettier 확장프로그램을 사용안함

```json
{
  // ESLint
  "eslint.validate": [
    "vue",
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": [
    {"mode": "auto"}
  ],
  // don't format on save
  "editor.formatOnSave": false
}

```

- `.eslintrc.js` 에 prettier 설정을 추가한다.

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  // 프리티어 플러그인 추가
  plugins: ['prettier'],
  rules: {
    // 프리티어 설정 추가
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        // useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
```

### 절대경로 세팅

- `jsconfig.json` 파일 생성

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./src/*"
      ],
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

- vue 에 기본 세팅이 있다면 

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      // 별칭
      "~/*": [
        "./*"
      ],
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ],
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

## [vue] 라우팅 코드 스플리팅 Code Splitting 코드 분리

- 로딩시간 단축을 위하여 `router` 에서 코드 스플리팅을 할 수 있다.
- `component: () => import('@/views/LoginView.vue'),` 이런 형식으로 라우터를 설정한다.

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    // 코드 스플리팅
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/SignupView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

## [vue] .env 사용 (react 동일)

- 공식문서: https://cli.vuejs.org/guide/mode-and-env.html#environment-variables

- react 와 동일하게 사용한다.

### 우선순위

#### `.env.development` > `.env.production` > `.env`

### 사용

#### vue

- `.env` 파일에 꼭 prefix 로 `VUE_APP_` 을 붙여준다.

```
VUE_APP_DEFAULT_API="http://localhost:3000"
```

- vue 에서 사용시 

```js
const defaultApi = axios.create({
  baseURL: process.env.VUE_APP_DEFAULT_API,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
});
```

#### react

- `REACT_APP_` 로 prefix 를 붙여준다.


## [vue] email 형식 체크

```html
<label for="id">ID</label>
<input type="text" id="id" v-model="username" />
<!-- 값을 확인하고 경고창 -->
<p v-if="!isValidateEmail && username">이메일 형식이 아닙니다.</p>
<!-- 이메일인지 확인하고 버튼 활성화 -->
<button :disabled="!isValidateEmail" type="submit">회원가입</button>
```

```js
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
```

## [vue] vuex store 모듈화 했을시, 값 사용

### state: 여러 컴포넌트에 공유되는 데이터

- 일반 사용

```js
computed: {
  getUser() {
    return this.$store.state.user.user;
  },
```

- 헬퍼함수 사용

```js
computed: {
  ...mapState("news", ["news", "newsError", "newsLoading"]),
},
```

### mutations: state 값을 변경하는 이벤트 메소드 / 값을 변경 할 수 있는 유일한 방법

- 일반 사용

```js
// "네임스페이스/mutation함수"
this.$store.commit('user/SET_USER', user);
```

### getters: 연산된 state 값을 접근하는 속성 / computed 처럼 기존의 state의 값을 계산하여 가져온다.

```js
computed: {
  isLogin() {
    // return false;
    return this.$store?.getters['user/isLogin'];
  },
},
```

### actions: 비동기 처리 로직을 선언하는 메소드

```js
this.$store.dispatch("news/LOAD_NEWS");
```

## [vue] a 태그 href 막기

```js
<a href="javascript:;"></a>
```

## [javascript] axios interceptors 엔터셉터 / header 에 토큰 추가

- axios 인터셉터를 추가한다.

```js
const defaultApi = axios.create({
  baseURL: process.env.VUE_APP_DEFAULT_API,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
});

// 요청 인터셉터 추가하기
defaultApi.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    // 토큰 값 추가
    const accessToken = store.state.user.accessToken;
    config.headers.Authorization = accessToken;
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
defaultApi.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
```

## [vue] 필터 filter, html에서 변수의 값을 변경 format

- template 에 변수값을 변경하고 싶을 경우 filter 를 사용한다.(예, 날짜포멧)

### 일반사용

- filters 에 함수 정의


```js
<script>
export default {
  computed: {
    getPosts() {
      return this.$store.state.post.posts;
    },
  },
  // filter 적용
  filters: {
    txtFormat(txt) {
      return txt + '@@@';
    },
  },
  async created() {
    this.$store.dispatch('post/LOAD_POSTS');
  },
};
</script>
```

- template 태그에서 사용

```js
<template>
  <div>
    <h1>Main</h1>
    <ul v-for="post in getPosts" :key="post.id">
      <!-- filter 적용 앞의 post가 txtFormat 의 인자로 들어간다.  -->
      <li>{{ post | txtFormat }}</li>
    </ul>
  </div>
</template>
```

### (추천)전역사용

- 전역에 filter 를 추가할수있다.
- `utils/filters.js` 파일 생성 / 함수정의

```js
export const txtFormat = txt => {
  return txt + '@@@';
};
```

- `main.js` 파일에 filter 추가

```js
// 필터추가
Vue.filter('txtFormat', txtFormat);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```

- 사용은 동일하게 한다.