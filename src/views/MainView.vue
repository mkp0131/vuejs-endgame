<template>
  <div>
    <h1>Main</h1>
    <ul v-for="post in getPosts" :key="post.id">
      <!-- filter 적용 앞의 post가 txtFormat 의 인자로 들어간다.  -->
      <li>{{ post | txtFormat }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    getPosts() {
      return this.$store.state.post.posts;
    },
  },
  async created() {
    this.$store.dispatch('post/LOAD_POSTS');
  },
};
</script>

<style></style>
