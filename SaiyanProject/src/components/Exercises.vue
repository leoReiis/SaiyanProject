<template>
  <v-container class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border">
    <v-btn icon>
      <router-link to="/dashboard" class="icon-color">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </router-link>
    </v-btn>

    <span class="d-flex justify-space-between">
      <h1>Exercises</h1>
      <v-icon>mdi-cloud-outline</v-icon>
    </span>
    <v-divider></v-divider>
    <span class="d-flex align-start ">
      <v-text-field variant="outlined" v-model="description" ref="description" placeholder="New Exercise"></v-text-field>

      <v-btn height="55px" color="#143FD5" @click="registerExercise()" class="ml-4" size="small" type="button"
        variant="elevated">
        Create
      </v-btn>
    </span>
  </v-container>
  <v-container class="w-75 h-auto d-flex flex-column justify-center rounded border mt-8">
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
              <v-icon>mdi-delete</v-icon></v-btn>
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

    async deleteExercise(id) {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this exercise?"
      );

      if (!userConfirmed) {
        return
      }

      try {
        await axios.delete(`http://localhost:3000/exercises/${id}`, {})
        alert("Exercício excluído com sucesso!");
        this.getExerciseList();
      } catch (error) {
        alert("Erro ao excluir exercício!")
      }
    },
  },
};
</script>

<style></style>
