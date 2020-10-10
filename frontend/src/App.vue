<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath" style="height:100%;" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
