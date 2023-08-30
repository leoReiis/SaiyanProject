<template>
  <v-container
    class="h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <h1>New Student</h1>
    <v-form
      @submit.prevent="registerStudent()"
      class="d-flex flex-column justify-center mt-8"
    >
      <v-container class="d-flex">
        <v-text-field
          v-model="fullName"
          hint="Enter your full name"
          placeholder="Full name"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="email"
          hint="Enter your email"
          placeholder="Email"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          v-model="contact"
          hint="Enter your contact"
          placeholder="Contact"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="birthDate"
          hint="Enter your birth date"
          type="date"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-container class="d-flex">
        <v-text-field
          v-model="zipCode"
          hint="Enter your zip code"
          placeholder="Zip Code"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="streetName"
          hint="Enter street name"
          placeholder="Street name"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="houseNumber"
          hint="Enter house number"
          placeholder="Number"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          v-model="state"
          hint="Enter your state"
          placeholder="State"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="district"
          placeholder="District"
          hint="District"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="city"
          placeholder="City"
          hint="Enter your city"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="complement"
          placeholder="Complement"
          hint="Adress complement"
        ></v-text-field>
      </v-container>

      <v-btn
        color="#143FD5"
        class="mt-4"
        block
        size="large"
        type="submit"
        variant="elevated"
      >
        Register
      </v-btn>
    </v-form>

    <v-alert
      class="mt-16"
      v-if="hasErrorsYup"
      color="error"
      icon="$error"
      title="Error"
    >
      <ul>
        <li v-for="(error, field) in errosYup" :key="field">* {{ error }}</li>
      </ul>
    </v-alert>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      contact: "",
      birthDate: "",
      zipCode: "",
      streetName: "",
      houseNumber: "",
      state: "",
      district: "",
      city: "",
      complement: "",
    };
  },
  methods: {
    registerStudent() {
      const token = localStorage.getItem("token");
      const newStudent = {
        name: this.fullName,
        email: this.email,
        contact: this.contact,
        date_birth: this.birthDate,
        cep: this.zipCode,
        street: this.streetName,
        number: this.houseNumber,
        neighborhood: this.district,
        city: this.city,
        province: this.state,
        complement: this.complement,
      };
      axios({
        url: "http://localhost:3000/students",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newStudent,
      })
        .then(() => {
          alert("Student Registered!");
          this.clearFormFields();
        })
        .catch(() => {
          alert("Oops! Something went wrong.");
        });
    },

    clearFormFields() {
      this.fullName = "";
      this.email = "";
      this.contact = "";
      this.birthDate = "";
      this.zipCode = "";
      this.streetName = "";
      this.houseNumber = "";
      this.district = "";
      this.city = "";
      this.state = "";
      this.complement = "";
    },
  },
};
</script>

<style></style>
