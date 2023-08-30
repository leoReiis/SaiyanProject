<template>
  <v-container class = "d-flex flex-column mt-8 justify-space-around">
    <h1>Welcome, {{ this.name }}</h1>
    <v-container class="d-flex mt-8">
      <v-card class="mx-auto" width="400" prepend-icon="mdi-fitness">
        <v-card-title>
          {{ dashboardData.amount_students }} Registered Students
        </v-card-title>
        <v-btn>Add</v-btn>
      </v-card>

      <v-card class="mx-auto" width="400" prepend-icon="mdi-fitness">
        <v-card-title>
          {{ dashboardData.amount_exercises }} Exercises
        </v-card-title>
        <v-btn>Add</v-btn>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: localStorage.getItem("name"),
      dashboardData: [],
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios({
      url: "http://localhost:3000/dashboard",
      method: "GET",
      headers: {
        Authorization: `Bearen ${token}`,
      },
    })
      .then((res) => {
        this.dashboardData = res.data;
      })
      .catch(() => {
        alert(
          "Oops! Something went wrong while fetching the list. Please try again later."
        );
      });
  },
};
</script>
<style></style>
