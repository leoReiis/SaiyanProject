<template>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <h1>Exercises</h1>
    <v-divider></v-divider>
    <v-toolbar>
      <v-text-field
        class="mt-4"
        hide-details
        prepend-icon="mdi-magnify"
      ></v-text-field>

      <v-btn class="ml-4" size="small" type="submit" variant="outlined">
        New
      </v-btn>
    </v-toolbar>
  </v-container>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded border mt-8"
  >
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in exercisesList" :key="item.id">
          <td>{{ item.name }}</td>
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
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios({
      url: "http://localhost:3000/exercises",
      method: "GET",
      headers: {
        Authorization: `Bearen ${token}`,
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
};
</script>

<style></style>
