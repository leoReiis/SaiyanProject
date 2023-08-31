<template>
  <v-container
    class="h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <v-form @submit.prevent="getExerciseId(this.exerciseDescription)">
      <v-container>
        <v-select
          v-model="exerciseDescription"
          variant="solo"
          label="Exercise"
          :items="getExerciseDescription()"
        ></v-select>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          type="number"
          label="Reps"
          hint="Amount of reps"
          placeholder="Reps"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          label="Kg"
          hint="Amount of weight"
          placeholder="Kg"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-text-field
          hint="Rest time in seconds"
          placeholder="Rest"
        ></v-text-field>
      </v-container>
      <v-container>
        <v-select
          variant="solo"
          label="Day"
          :items="arrayWithDaysList"
        ></v-select>
      </v-container>
      <v-container>
        <v-textarea outlined placeholder="Notes"></v-textarea>
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
      exerciseDescription: "",
      exerciseList: [],
    };
  },
  mounted() {
    this.getExerciseList();
  },
  methods: {
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
  },
};
</script>

<style></style>
