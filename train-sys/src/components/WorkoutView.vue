<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-end">
      <v-icon>mdi-cloud-outline</v-icon>
    </span>
    <h1>Workout - {{ this.studentData.userName }}</h1>
    <v-divider></v-divider>
    <v-container class="d-flex justify-space-between">
      <h2>Today</h2>
    </v-container>
    <v-checkbox
      v-for="workout in workoutData.workouts"
      :key="workout.id"
      :label="`${workout.exercise_description} | ${workout.weight} Kg | ${workout.repetitions} Reps | ${workout.break_time} seconds of break`"
      @change="completeWorkoutPost(workout.id, workout.day)"
    ></v-checkbox>
    <v-divider></v-divider>
    <v-tabs grow v-model="active_tab">
      <v-tab
        v-for="tab of tabs"
        :key="tab.id"
        @click="getStudentWorkout(tab.value)"
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
      active_tab: this.getActiveTab(this.getCurrentDay()), // ngl smells bad
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
      todaysWorkout: "",
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
    getStudentWorkout(weekDay) {
      // hitting the api multiple times, one for each click
      const token = localStorage.getItem("token");
      axios({
        url: `http://localhost:3000/workouts?student_id=${this.studentData.userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.workoutData = res.data;
          this.workoutData.workouts = this.workoutData.workouts.filter(
            (workout) => workout.day === weekDay
          );
          this.displayStudentWorkout(this.workoutData.workouts);
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

    completeWorkoutPost(workoutId, workoutDay) {
      const token = localStorage.getItem("token");
      const workoutData = {
        student_id: parseInt(this.studentData.userId),
        workout_id: workoutId,
        day_of_week: workoutDay,
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
