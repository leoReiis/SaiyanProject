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
          v-model="studentData.fullName"
          hint="Enter your full name"
          placeholder="Full name"
          :rules="[(v) => !!v || 'Invalid name']"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="studentData.email"
          type="email"
          hint="Enter your email"
          placeholder="Email"
          :rules="[(v) => !!v || 'Invalid email']"
        ></v-text-field>
      </v-container>

      <v-container class="d-flex">
        <v-text-field
          v-model="studentData.contact"
          hint="Enter your contact"
          placeholder="Contact"
          :rules="[(v) => !!v || 'Invalid contact']"
        ></v-text-field>
        <v-spacer></v-spacer>

        <div class="w-50 d-flex align-iten-center">
          <VueDatePicker
            v-model="studentData.birthDate"
            hint="Enter your birth date"
            :max-date="new Date()"
            cancelText="Cancel"
            selectText="Select"
            :enable-time-picker="false"
          />
        </div>
      </v-container>

      <v-divider></v-divider>

      <v-container class="d-flex">
        <v-text-field
          @blur="getZipCodeData(this.studentData.zipCode)"
          v-model="studentData.zipCode"
          hint="Enter your zip code"
          placeholder="Zip Code"
          :rules="[(v) => !!v || 'Invalid zipcode']"
          :maxlength="8"
          :counter="8"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="studentData.streetName"
          hint="Enter street name"
          placeholder="Street name"
          :rules="[(v) => !!v || 'Invalid street name']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          type="number"
          v-model="studentData.houseNumber"
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
          v-model="studentData.state"
          :maxlength="2"
          hint="Enter your state"
          placeholder="State"
          :rules="[(v) => !!v || 'Invalid state']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="studentData.district"
          placeholder="District"
          hint="District"
          :rules="[(v) => !!v || 'Invalid district']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="studentData.city"
          placeholder="City"
          hint="Enter your city"
          :rules="[(v) => !!v || 'Invalid city']"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="studentData.complement"
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
import moment from "moment";

export default {
  data() {
    return {
      studentData: {
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
      },

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
      const auxBirthDate = moment(this.studentData.birthDate).format(
        "MM/DD/YYYY"
      );
      const newStudent = {
        name: this.studentData.fullName,
        email: this.studentData.email,
        contact: this.studentData.contact,
        date_birth: auxBirthDate,
        cep: this.studentData.zipCode,
        street: this.studentData.streetName,
        number: this.studentData.houseNumber,
        neighborhood: this.studentData.district,
        city: this.studentData.city,
        province: this.studentData.state.toUpperCase(),
        complement: this.studentData.complement,
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
      if (this.studentData.zipCode.length == 8) {
        axios({
          url: `http://viacep.com.br/ws/${zipCode}/json/`,
        })
          .then((res) => {
            this.studentData.streetName = res.data.logradouro;
            this.studentData.city = res.data.localidade;
            this.studentData.district = res.data.bairro;
            this.studentData.state = res.data.uf;
            this.studentData.complement = res.data.complemento;
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
