<template>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <h1>Students</h1>
    <v-divider></v-divider>
    <v-btn
      @click="goToRegisterStudentPage()"
      color="#143FD5"
      type="button"
      variant="elevated"
      >New</v-btn
    >
  </v-container>

  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded border mt-8"
  >
    <v-table fixed-header height="250px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in studentList.students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>
            <h2>buttons here</h2> 
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
      studentList: [],
    };
  },

  methods: {
    goToRegisterStudentPage() {
      this.$router.push("/registerstudent");
    },

    getStudentList() {
      const token = localStorage.getItem("token");
      axios({
        url: "http://localhost:3000/students",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.studentList = res.data;
        })
        .catch(() => {
          alert(
            "Oops! Something went wrong while fetching the list. Please try again later."
          );
        });
    },
  },

  mounted() {
    this.getStudentList();
  },
};
</script>
<style></style>
