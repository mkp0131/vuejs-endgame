import { addPost, getPosts } from '../api';

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {},
  mutations: {
    LOAD_POSTS_SUCCESS(state, posts) {
      state.posts = posts;
    },
    ADD_POSTS_SUCCESS(state, post) {
      state.posts.push(post);
    },
  },
  actions: {
    async LOAD_POSTS({ commit }) {
      try {
        const response = await getPosts();
        const { posts } = response.data;
        commit('LOAD_POSTS_SUCCESS', posts);
      } catch (error) {
        console.error(error);
      }
    },
    async ADD_POST(_, post) {
      try {
        await addPost(post);

        // const newPost = response.data.data;

        // commit('ADD_POSTS_SUCCESS', newPost);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
