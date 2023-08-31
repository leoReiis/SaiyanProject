<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-16 border"
  >
    <span class="d-flex justify-end">
      <v-icon>mdi-cloud-outline</v-icon>
    </span>

    <v-container class="d-flex justify-space-between">
      <h1>New Student</h1>
      <v-btn icon>
        <router-link to="/students" class="icon-color">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </router-link>
      </v-btn>
    </v-container>

    <v-form
      ref="form"
      @submit.prevent="handleSubmit()"
      class="d-flex flex-column justify-center mt-8"
    >
      <v-container class="d-flex">
        <v-text-field
          v-model="fullName"
          hint="Enter your full name"
          placeholder="Full name"
          :rules="[(v) => !!v || 'Invalid name']"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="email"
          type="email"
          hint="Enter your email"
          placeholder="Email"
          :rules="[(v) => !!v || 'Invalid email']"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          v-model="contact"
          hint="Enter your contact"
          placeholder="Contact"
          :rules="[(v) => !!v || 'Invalid contact']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="birthDate"
          hint="Enter your birth date"
          type="date"
          :rules="[(v) => !!v || 'Invalid birth date']"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-container class="d-flex">
        <v-text-field
          @blur="getZipCodeData(this.zipCode)"
          v-model="zipCode"
          hint="Enter your zip code"
          placeholder="Zip Code"
          :rules="[(v) => !!v || 'Invalid zipcode']"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="streetName"
          hint="Enter street name"
          placeholder="Street name"
          :rules="[(v) => !!v || 'Invalid street name']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          type="number"
          v-model="houseNumber"
          hint="Enter house number"
          placeholder="Number"
          :rules="[
            (v) => !!v || 'Invalid number',
            (v) => v >= 0 || 'Invalid street number',
          ]"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          v-model="state"
          hint="Enter your state"
          placeholder="State"
          :rules="[(v) => !!v || 'Invalid state']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="district"
          placeholder="District"
          hint="District"
          :rules="[(v) => !!v || 'Invalid district']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="city"
          placeholder="City"
          hint="Enter your city"
          :rules="[(v) => !!v || 'Invalid city']"
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
      yupError: {},
    };
  },

  methods: {
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        alert("Oops! It looks like you forgot to fill in a required field.");
        return;
      }

      this.registerStudent();
    },

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
          this.$refs.form.reset();
        })
        .catch(() => {
          alert("Oops! Something went wrong.");
        });
    },

    getZipCodeData(zipCode) {
      if (this.zipCode.length == 8) {
        axios({
          url: `http://viacep.com.br/ws/${zipCode}/json/`,
        })
          .then((res) => {
            this.zipCodeData = res.data;
            this.streetName = res.data.logradouro;
            this.city = res.data.localidade;
            this.district = res.data.bairro;
            this.state = res.data.uf;
            this.complement = res.data.complemento;
          })
          .catch(() => {
            alert(
              "Oops! Something went wrong while fetching the list. Please try again later."
            );
          });
      }
    },
  },
};
</script>

<style>
.icon-color {
  color: #143fd5;
}
</style>
