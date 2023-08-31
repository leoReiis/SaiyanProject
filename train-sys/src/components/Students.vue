<template>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-end">
      <v-icon>mdi-cloud-outline</v-icon>
    </span>

    <v-container class="d-flex justify-space-between">
      <h1>Students</h1>
      <v-btn
        @click="goToRegisterStudentPage()"
        color="#143FD5"
        type="button"
        variant="elevated"
        >New</v-btn
      >
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-space-between">
      <v-text-field
        v-model="searchStudentName"
        hint="Enter the student name"
        placeholder="Student Name"
      >
      </v-text-field>

      <v-btn @click="searchStudent(this.searchStudentName)" icon flat>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-container>
  </v-container>

  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded border mt-8"
  >
    <v-table fixed-header height="350px">
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
            <span class="d-flex justify-space-between">
              <v-btn
                class="justify-end"
                color="#143FD5"
                type="button"
                variant="outlined"
                >View</v-btn
              >
              <v-btn
                @click="goToWorkoutPage(student.id, student.name)"
                class="justify-end"
                color="#143FD5"
                type="button"
                variant="outlined"
                >New Workout</v-btn
              >
            </span>
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
      searchStudentName: "",
    };
  },

  methods: {
    goToWorkoutPage(userId, userName) {
      this.$router.push({
        path: "/training",
        query: { id: userId, name: userName },
      });
    },

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

    searchStudent(myArray, nameToFind) {
      this.studentList = myArray.filter((student) => {
        student.name.includes(nameToFind);
      });
      console.log(this.studentList.student);
    },
  },

  mounted() {
    this.getStudentList();
  },
};
</script>
<style></style>
