import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

// rotas
import { routes } from "./routes/router.js";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// VueDatePicker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

createApp(App)
  .use(routes)
  .use(vuetify)
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");
