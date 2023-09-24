<template>
  <router-view transition="fade-transition"></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.custom-button {
  background: url("@/assets/Button_Normal.png") no-repeat center center;
  background-size: contain;
  color: white;
  padding: 20px;
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: 22px;
  font-family: "MatrixRegularSmallCaps1";
  width: 18rem;
  margin: 2px;
}

.options-button {
  background: url("@/assets/Button_Normal_mini.png") no-repeat center center;
  background-size: contain;
  color: white;
  padding: 20px;
  border: none;
  cursor: pointer;
  width: 18rem;
  margin: 2px;
}

.custom-button:hover {
  background-image: url("@/assets/Button_Hover.png");
  cursor: pointer;
}
</style>
