<template>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-space-between">
      <h1>Welcome back, {{ this.name }}</h1>
      <v-icon>mdi-cloud-outline</v-icon>
    </span>
    <v-container class="d-flex mt-8">
      <v-card border class="mx-auto" width="400" prepend-icon="mdi-fitness">
        <v-card-title class="d-flex justify-space-around">
          <v-icon>mdi-account</v-icon>
          {{ dashboardData.amount_students }} Students
          <v-btn
            @click="goToStudentsPage()"
            class="justify-end"
            color="#143FD5"
            type="button"
            variant="elevated"
            >Show</v-btn
          >
        </v-card-title>
      </v-card>

      <v-card
        border
        class="mx-auto ml-4"
        width="400"
        prepend-icon="mdi-fitness"
      >
        <v-card-title class="d-flex justify-space-around">
          <v-icon>mdi-arm-flex</v-icon>
          {{ dashboardData.amount_exercises }} Exercises
          <v-btn
            @click="goToExercisePage()"
            color="#143FD5"
            type="button"
            variant="elevated"
            >Show</v-btn
          >
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-container>
  </v-container>
  <v-img
    :width="300"
    cover
    src="/son-goku.jpg"
    class="son-goku"
    alt="kid-goku-dragonball"
  ></v-img>
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

  methods: {
    goToExercisePage() {
      this.$router.push("/exercises");
    },

    goToStudentsPage() {
      this.$router.push("/students");
    },

    getDashBoardInfo() {
      const token = localStorage.getItem("token");
      axios({
        url: "http://localhost:3000/dashboard",
        headers: {
          Authorization: `Bearer ${token}`,
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
  },

  mounted() {
    this.getDashBoardInfo();
  },
};
</script>

<style scoped>
.son-goku {
  position: absolute;
  right: 0px;
  bottom: 100px;
}
</style>
