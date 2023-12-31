<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-space-between">
      <v-btn icon>
        <router-link to="/students" class="icon-color">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </router-link>
      </v-btn>
      <v-icon>mdi-cloud-outline</v-icon>
    </span>

    <h1>Workout - {{ this.studentData.userName }}</h1>
    <v-divider></v-divider>
    <v-container class="d-flex justify-space-between">
      <h2>Today</h2>
    </v-container>
    <v-checkbox
      v-for="workout in auxWorkoutData.workouts"
      :key="workout.id"
      :label="`${workout.exercise_description} | ${workout.weight} Kg | ${workout.repetitions} Reps | ${workout.break_time} seconds of break`"
      v-model="workout.checked"
      @change="completeWorkoutPost(workout)"
    ></v-checkbox>

    <v-tabs show-arrows grow v-model="active_tab">
      <v-tab
        v-for="tab of tabs"
        :key="tab.id"
        @click="filterWorkoutData(tab.value)"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-textarea
      v-model="todaysWorkout"
      outlined
      placeholder="No Workouts for today"
    ></v-textarea>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      today: this.getCurrentDay(),
      active_tab: this.getActiveTab(this.getCurrentDay()),
      tabs: [
        { id: 1, name: "Monday", value: "segunda" },
        { id: 2, name: "Tuesday", value: "terca" },
        { id: 3, name: "Wednesday", value: "quarta" },
        { id: 4, name: "Thursday", value: "quinta" },
        { id: 5, name: "Friday", value: "sexta" },
        { id: 6, name: "Saturday", value: "sabado" },
        { id: 7, name: "Sunday", value: "domingo" },
      ],
      studentData: {
        userId: this.$route.query.id,
        userName: this.$route.query.name,
      },
      workoutData: [],
      auxWorkoutData: {
        workouts: [],
      },
      todaysWorkout: "",
      checkBoxValue: false,
    };
  },

  mounted() {
    this.getStudentWorkout(this.today);
  },

  methods: {
    getCurrentDay() {
      const daysOfWeek = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
      ];
      return daysOfWeek[new Date().getDay()];
    },

    getActiveTab(weekDay) {
      switch (weekDay) {
        case "segunda":
          return 0;

        case "terca":
          return 1;

        case "quarta":
          return 2;

        case "quinta":
          return 3;

        case "sexta":
          return 4;

        case "sabado":
          return 5;

        case "domingo":
          return 6;
      }
    },

    filterWorkoutData(weekDay) {
      this.auxWorkoutData = { ...this.workoutData };
      this.auxWorkoutData.workouts = this.auxWorkoutData.workouts.filter(
        (workout) => workout.day === weekDay
      );
      this.auxWorkoutData.workouts.forEach((workout) => {
        workout.checked = false;
      });
      this.displayStudentWorkout(this.auxWorkoutData.workouts);
    },

    async getStudentWorkout(weekDay) {
      const token = localStorage.getItem("token");
      await axios({
        url: `http://localhost:3000/workouts?student_id=${this.studentData.userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.workoutData = res.data;
          this.filterWorkoutData(weekDay);
        })
        .catch(() => {
          alert(
            "Oops! Something went wrong while fetching the list. Please try again later."
          );
        });
    },

    displayStudentWorkout(workoutArray) {
      this.todaysWorkout = workoutArray.map((workout) => {
        return `${workout.exercise_description} | ${workout.weight} Kg | ${workout.repetitions} Reps | ${workout.break_time} seconds of break \n`;
      });
    },

    completeWorkoutPost(workout) {
      if (!workout.checked) {
        alert(
          "The API currently only supports checking items as completed. Unchecking items is not yet supported."
        );
        return;
      }

      const token = localStorage.getItem("token");
      const workoutData = {
        student_id: parseInt(this.studentData.userId),
        workout_id: workout.id,
        day_of_week: workout.day,
      };
      axios({
        url: "http://localhost:3000/workouts/check",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: workoutData,
      })
        .then(() => {
          alert("Congratulations! Task completed successfully. Great job!");
        })
        .catch(() => {
          alert("Oops! Something went wrong.");
        });
    },
  },
};
</script>

<style></style>
