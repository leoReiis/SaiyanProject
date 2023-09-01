<template>
  <v-container
    class="w-75 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-space-between">
      <v-btn icon>
        <router-link to="/dashboard" class="icon-color">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </router-link>
      </v-btn>
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

      <v-btn @click="searchStudent(searchStudentName)" icon flat>
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
        <tr v-for="student in auxStudentList.students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>
            <span class="d-flex justify-space-between">
              <v-btn
                @click="goToViewWorkoutPage(student.id, student.name)"
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
      studentList: {
        students: [],
      },
      auxStudentList: {
        students: [],
      },
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

    goToViewWorkoutPage(userId, userName) {
      this.$router.push({
        path: "/workoutview",
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
          this.auxStudentList = res.data;
        })
        .catch(() => {
          alert(
            "Oops! Something went wrong while fetching the list. Please try again later."
          );
        });
    },

    searchStudent(nameToFind) {
      if (!nameToFind) {
        this.getStudentList();
        return;
      }

      this.auxStudentList.students = [...this.studentList.students];
      this.auxStudentList.students = this.studentList.students.filter(
        (student) => {
          return student.name.toLowerCase().includes(nameToFind.toLowerCase());
        }
      );
    },
  },

  mounted() {
    this.getStudentList();
  },
};
</script>
<style></style>
