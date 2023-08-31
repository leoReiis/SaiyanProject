<template>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-space-between">
      <h1>Exercises</h1>
      <v-icon>mdi-cloud-outline</v-icon>
    </span>
    <v-divider></v-divider>
    <v-toolbar>
      <v-text-field
        v-model="description"
        ref="description"
        placeholder="New Exercise"
      ></v-text-field>

      <v-btn
        color="#143FD5"
        @click="registerExercise()"
        class="ml-4"
        size="small"
        type="button"
        variant="elevated"
      >
        Create
      </v-btn>
    </v-toolbar>
  </v-container>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded border mt-8"
  >
    <v-table fixed-header height="250px">
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in exercisesList" :key="item.id">
          <td>{{ item.description }}</td>
          <td>
            <v-btn @click="deleteExercise(item.id)" flat icon size="small">
              <v-icon>mdi-delete</v-icon></v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      exercisesList: [],
      description: "",
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
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.exercisesList = res.data;
        })
        .catch(() => {
          alert(
            "Oops! Something went wrong while fetching the list. Please try again later."
          );
        });
    },
    registerExercise() {
      if (!this.description) {
        alert("Exercise name can't be empty!");
        this.$refs.description.focus();
        return;
      }

      //check if exercise exists

      const token = localStorage.getItem("token");
      axios({
        url: "http://localhost:3000/exercises",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { description: this.description },
      })
        .then(() => {
          alert("Exercise Created!");
          this.description = "";
          this.getExerciseList();
        })
        .catch(() => {
          alert("Oops! Something went wrong.");
        });
    },

    deleteExercise(id) {
      // seems like the api doesnt support the delete method yet
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this exercise?"
      );

      if (userConfirmed) {
        axios
          .delete(`http://localhost:3000/exercises/${id}`, {})
          .then(() => {
            alert("Sucess!");
          })
          .catch(() => alert("This app doesn't support delete methods yet!"));
      }
    },
  },
};
</script>

<style></style>
