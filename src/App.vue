<template>
  <div id="app">
    <MasterPage title="Game Type" />
  </div>
</template>

<script>
import MasterPage from "./components/MasterPage.vue";

export default {
  name: "App",
  components: {
    MasterPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
