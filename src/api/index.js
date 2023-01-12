import axios from 'axios';
import store from '@/store';

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

export const singupUserApi = userData => {
  return defaultApi.post('/signup', userData);
};

export const loginApi = userData => {
  return defaultApi.post('/login', userData);
};

export const getPosts = userData => {
  return defaultApi.get('/posts', userData);
};

export const addPost = post => {
  return defaultApi.post('/posts', post);
};
