<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <main-toolbar />
      <v-sheet class="overflow-y-auto" style="background: #F0F3F6;">
        <v-container>
          <v-row class="main-row" dense>
            <v-col cols="12">
              <v-card color="blue" @click="dialog = true" dark>
                <v-card-title class="headline">Test1</v-card-title>

                <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                <v-card-actions>
                  <v-btn text>Listen Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="red" dark>
                <v-card-title class="headline">Test2</v-card-title>

                <v-card-subtitle>
                  <router-link to="/screen2">Show me more</router-link>.Listen to your favorite artists and albums whenever and wherever, online and offline.
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn text>Listen Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="white">
                <v-row>
                  <v-col cols="12" class="d-flex justify-space-between py-0">
                    <v-container style="width: auto; margin-right: unset; margin-left: unset;">
                      <v-avatar color="primary" size="42"></v-avatar>
                      <span class="ml-2">@asdfasdf</span>
                    </v-container>
                    <v-container style="width: auto; margin-right: unset; margin-left: unset;">
                      <v-btn icon>
                        <v-icon>mdi-share</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-shopping</v-icon>
                      </v-btn>
                    </v-container>
                  </v-col>
                  <v-col class="pt-0" cols="12">
                    <v-card class="ma-4 my-0" color="#24489a" @click="dialog = true" dark>
                      <v-container fill-height fluid style="min-height: 260px;">
                        <v-row align="center" justify="center">
                          <v-col>
                            <p
                              style="font-size:24px; font-weight: bold;"
                            >Lorem ipsum dolor sit amet, an duis singulis principes sit, an ius vituperata quaerendum.</p>
                            <v-chip class="ma-2" color="#0f256d" dark># xx</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># xx</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># xx</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># xx</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># xx</v-chip>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="white">
                <v-row>
                  <v-col cols="12" class="d-flex justify-space-between py-0">
                    <v-container style="width: auto; margin-right: unset; margin-left: unset;">
                      <v-avatar color="primary" size="42"></v-avatar>
                      <span class="ml-2">@asdfasdf</span>
                    </v-container>
                    <v-container style="width: auto; margin-right: unset; margin-left: unset;">
                      <v-btn icon>
                        <v-icon>mdi-share</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-shopping</v-icon>
                      </v-btn>
                    </v-container>
                  </v-col>
                  <v-col class="pt-0" cols="12">
                    <v-card class="ma-4 my-0" color="#24489a" @click="dialog = true" dark>
                      <v-container fill-height fluid style="min-height: 260px;">
                        <v-row align="center" justify="center">
                          <v-col>
                            <p
                              style="font-size:24px; font-weight: bold;"
                            >Lorem ipsum dolor sit amet, an duis singulis principes sit, an ius vituperata quaerendum.</p>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag1</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag2</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag3</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag4</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag5</v-chip>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="white">
                <v-row>
                  <v-col cols="12" class="d-flex justify-space-between py-0">
                    <v-container style="width: auto; margin-right: unset; margin-left: unset;">
                      <v-avatar color="primary" size="42"></v-avatar>
                      <span class="ml-2">@asdfasdf</span>
                    </v-container>
                    <v-container style="width: auto; margin-right: unset; margin-left: unset;">
                      <v-btn icon>
                        <v-icon>mdi-share</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-shopping</v-icon>
                      </v-btn>
                    </v-container>
                  </v-col>
                  <v-col class="pt-0" cols="12">
                    <v-card class="ma-4 my-0" color="#24489a" @click="dialog = true" dark>
                      <v-container fill-height fluid style="min-height: 260px;">
                        <v-row align="center" justify="center">
                          <v-col>
                            <p
                              style="font-size:24px; font-weight: bold;"
                            >Lorem ipsum dolor sit amet, an duis singulis principes sit, an ius vituperata quaerendum.</p>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag1</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag2</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag3</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag4</v-chip>
                            <v-chip class="ma-2" color="#0f256d" dark># Tag5</v-chip>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-card>

    <v-bottom-navigation fixed grow>
      <v-btn color="primary accent-4" text>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn color="primary accent-4" text>
        <v-icon>mdi-shopping</v-icon>
      </v-btn>

      <v-btn color="primary accent-4" text>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn color="primary accent-4" text>
        <v-icon>mdi-bullhorn</v-icon>
      </v-btn>

      <v-btn></v-btn>
    </v-bottom-navigation>

    <v-btn fab dark large color="primary" fixed right bottom>
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>

  </v-app>
</template>

<style lang="scss" scoped>
.main-row.row {
  margin-top: 270px;
  margin-bottom: 80px;
  .v-card {
    border-radius: 20px;
  }
}

.row--dense > .col,
.row--dense > [class*="col-"] {
  padding: 12px;
}

.v-sheet.overflow-hidden {
  border-radius: 0px;
}

.v-btn--fab.v-size--large {
  margin-bottom: 10px;
}
</style>

<script>
import MainToolbar from "@/components/main/MainToolBar.vue";

export default {
  name: "Main",
  data: () => ({
    menuVisible: false,
    value: "",
    dialog: false
  }),
  components: {
    MainToolbar
  },
  methods: {
    test() {
      this.$router.push("./screen2");
    }
  }
};
</script>
