<template>
  <div>
    <h1>this is home page</h1>
    <songCoder title="home title"></songCoder>
  </div>
</template>

<script>
import songCoder from "@/components/songCoder.vue";
export default {
  components: {
    songCoder
  },
  data() {
    return {
      name: "song"
    };
  }
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
