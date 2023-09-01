<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <v-btn icon>
      <router-link to="/students" class="icon-color">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </router-link>
    </v-btn>
    <v-container>
      <v-text-field
        variant="outlined"
        disabled
        label="Student Name"
        v-model="studentData.userName"
      ></v-text-field>
    </v-container>

    <v-form ref="form" @submit.prevent="handleSubmit()">
      <v-container>
        <v-select
          v-model="exerciseDescription"
          variant="solo"
          label="Exercise"
          :items="getExerciseDescription()"
          :rules="[(v) => !!v || 'Exercise is a required field']"
        ></v-select>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          v-model="reps"
          type="number"
          label="Reps"
          hint="Amount of reps"
          placeholder="Reps"
          :rules="[
            (v) => !!v || 'Reps is a required field',
            (v) => v > 0 || 'Rep amount must be greater than 1',
          ]"
        >
        </v-text-field>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="weight"
          type="number"
          label="Kg"
          hint="Amount of weight"
          placeholder="Kg"
          :rules="[(v) => !!v || 'Kg is a required field']"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-text-field
          v-model="breaktime"
          hint="Rest time in seconds"
          placeholder="Rest"
          :rules="[(v) => !!v || 'Rest is a required field']"
        ></v-text-field>
      </v-container>

      <v-container>
        <v-select
          v-model="today"
          variant="solo"
          label="Day"
          :items="this.weekDayList"
          item-title="title"
          item-value="value"
        ></v-select>
      </v-container>
      <v-container>
        <v-textarea
          v-model="observations"
          outlined
          placeholder="Notes"
        ></v-textarea>
      </v-container>
      <v-container class="d-flex justify-end">
        <v-btn
          color="#143FD5"
          block
          size="large"
          type="submit"
          variant="elevated"
        >
          Register
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studentData: {
        userId: this.$route.query.id,
        userName: this.$route.query.name,
      },
      reps: null,
      weight: null,
      breaktime: null,
      observations: "",
      exerciseDescription: "",
      exerciseList: [],
      today: this.getCurrentDay(),
      weekDayList: [
        { value: "segunda", title: "Monday" },
        { value: "terca", title: "Tuesday" },
        { value: "quarta", title: "Wednesday" },
        { value: "quinta", title: "Thursday" },
        { value: "sexta", title: "Friday" },
        { value: "sabado", title: "Saturday" },
        { value: "domingo", title: "Sunday" },
      ],
    };
  },
  mounted() {
    this.getExerciseList();
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

    async handleSubmit() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        alert("Oops! It looks like you forgot to fill in a required field.");
        return;
      }

      this.registerWorkOut();
    },

    getExerciseList() {
      const token = localStorage.getItem("token");
      axios({
        url: "http://localhost:3000/exercises",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.exerciseList = res.data;
        })
        .catch(() => {
          alert(
            "Oops! Something went wrong while fetching the list. Please try again later."
          );
        });
    },

    getExerciseDescription() {
      return this.exerciseList.map((item) => item.description);
    },

    getExerciseId(description) {
      const exercise = this.exerciseList.find(
        (item) => item.description === description
      );
      return exercise.id;
    },

    registerWorkOut() {
      debugger;
      const token = localStorage.getItem("token");
      const exerciseId = this.getExerciseId(this.exerciseDescription);

      const workout = {
        student_id: this.studentData.userId,
        exercise_id: exerciseId,
        repetitions: this.reps,
        weight: this.weight,
        break_time: this.breaktime,
        observations: this.observations,
        day: this.today,
      };
      axios({
        url: "http://localhost:3000/workouts",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: workout,
      })
        .then(() => {
          alert("Workout Registered!");
          this.$refs.form.reset();
        })
        .catch(() => {
          alert("Oops! Something went wrong.");
        });
    },
  },
};
</script>

<style></style>
