<template>
  <v-layout color="grey-lighten-4">
    <v-toolbar color="#FF4401">
      <img src="/logo.png" alt="Saiya Gym" />

      <v-spacer></v-spacer>

      <v-btn icon>
        <router-link to="/dashboard" class = "icon-color">
          <v-icon>mdi-home</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon>
        <router-link to="/students" class = "icon-color">
          <v-icon>mdi-account</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon>
        <router-link to="/exercises" class = "icon-color">
          <v-icon>mdi-arm-flex</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon> 
        <router-link to="/login" class = "icon-color">
          <v-icon>mdi-logout</v-icon>
        </router-link>
      </v-btn>
    </v-toolbar>
  </v-layout>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
img {
  margin-top: 5px;
  height: 70px;
  opacity: 0.8;
}

.icon-color {
   color :#143FD5;
}
</style>
