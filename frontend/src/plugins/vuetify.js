import Vue from "vue";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify";
Vue.use(Vuetify);
import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    themes: {
      light: {
        primary: "#059acb",
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
    },
  },
});
