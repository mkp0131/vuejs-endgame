<template>
  <div>
    <h1>새글 추가</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="title">title</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="contents">contents</label>
        <textarea id="contents" v-model="contents" />
      </div>
      <div>
        <button type="submit">추가</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      contents: '',
    };
  },
  methods: {
    async onSubmit() {
      let { title, contents } = this;

      await this.$store.dispatch('post/ADD_POST', { title, contents });

      this.title = '';
      this.contents = '';
    },
  },
};
</script>

<style></style>
