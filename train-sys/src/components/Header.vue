<template>
  <v-layout color="grey-lighten-4">
    <v-toolbar>
      <img src="/logo.png" alt="Saiya Gym" />

      <v-spacer></v-spacer>

      <div class="d-flex align-content-start">
        <router-link to="/login">
          <p>Home</p>
        </router-link>

        <router-link to="/login">
          <p>Studends</p>
        </router-link>

        <router-link to="/login">
          <p>Exercises</p>
        </router-link>

        <router-link to="/login">
          <p>Logout</p>
        </router-link>
      </div>
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
</style>
