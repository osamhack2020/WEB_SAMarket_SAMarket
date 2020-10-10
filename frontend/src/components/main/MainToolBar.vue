<template>
  <v-app-bar class="main-app-bar" color="white" shrink-on-scroll fixed prominent>
    <v-btn icon style="width: 92px;">
      <img style="width:36px;" src="@/assets/logo64.png" />
      <span class="font-weight-bold" style="color:black;">강군마켓</span>
    </v-btn>
    <v-toolbar-title style="width: 100%;">
      <v-container class="pa-0 pb-4">
        <v-avatar color="primary" size="72"></v-avatar>
        <p>name</p>
      </v-container>
      <v-container class="pa-0">
        <v-chip color="#1A8ABA" text-color="white">text1</v-chip>
        <v-chip class="ml-2" color="#059acb" text-color="white">text2</v-chip>
      </v-container>
    </v-toolbar-title>
    <v-btn icon style="width:46px;">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon style="width:46px;">
      <v-icon>mdi-forum</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <template v-slot:extension>
      <!-- Search Bar goes here -->
      <v-container style="height: 64px;">
        <p class="text-center" style="width: 100%;">
          <v-text-field></v-text-field>
        </p>
      </v-container>
    </template>
  </v-app-bar>
</template>
<style lang="scss" scoped>
.main-app-bar.v-sheet.v-toolbar {
  border-radius: 2rem !important;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}
.v-toolbar--prominent .v-toolbar__title {
  font-size: 1.5rem !important;
  padding-top: 6px;
}
</style>
<script>
export default {};
</script>
