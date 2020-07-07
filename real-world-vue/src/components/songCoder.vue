<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ name }}</p>
    <br />
    <button @click="updateName">Change Name</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "default title"
    }
  },
  data() {
    return {
      name: "song Coder"
    };
  },

  methods: {
    updateName() {
      this.name = "song Coder updated";
    }
  }
};
</script>

<style scoped></style>
