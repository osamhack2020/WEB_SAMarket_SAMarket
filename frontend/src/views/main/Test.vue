<template>
  <v-app id="inspire">
    <v-card id="lateral">
      <v-toolbar tabs flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>글쓰기</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab href="#one">Item One</v-tab>
            <v-tab href="#two">Item Two</v-tab>
            <v-tab href="#three">Item Three</v-tab>
            <v-tabs-slider color="pink"></v-tabs-slider>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-card-text>
        <v-tabs-items>
          <v-tab-item v-for="content in ['one', 'two', 'three']" :key="content" :value="content">
            <v-card></v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-fab-transition>
        <v-btn @click="test" color="green" fab large dark bottom left class="v-btn--example">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>
  </v-app>
</template>

<style scoped>
</style>
<script>
export default {
  name: "Screen2",
  data: () => ({
    menuVisible: false,
    value: ""
  }),
  methods: {
    test() {
      this.$router.go(-1);
    }
  }
};
</script>
