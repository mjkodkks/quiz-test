<template>
  <div id="app">
    <v-app>
       <v-main class="v-main">
      <img width="200px" alt="Vue logo" src="./assets/logo.png" />
      <Register />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Register from "./components/Register.vue";

export default {
  name: "App",
  components: {
    Register
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-main {
      display: flex;
    flex-direction: column;
    align-items: center;
}
body {
  background: #ffffff;
}
</style>
