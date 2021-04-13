<template>
  <div id="app">
    <GameTypePage title="Game Type" />
  </div>
</template>

<script>
import GameTypePage from "./components/GameTypePage.vue";

export default {
  name: "App",
  components: {
    GameTypePage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.1em;
  color: #111;
  font-weight: 600;
}
</style>
