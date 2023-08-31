<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-8 border"
  >
    <span class="d-flex justify-space-between">
      <h1>Saiya Gym</h1>
      <v-icon>mdi-cloud-outline</v-icon>
    </span>
    <v-form
      @submit.prevent="handleSingup"
      class="d-flex flex-column justify-center mt-8"
    >
      <v-text-field
        v-model="fullName"
        label="Full Name"
        hint="Enter your full name"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        hint="Enter your email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        hint="Enter your password"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Verify Password"
        hint="Confirm your password"
        type="password"
        ref="confirmPassword"
      ></v-text-field>

      <v-select
        v-model="plan"
        variant="solo"
        label="Plano"
        :items = "this.planList"
        item-title="title"
        item-value ="value"
      ></v-select>

      <v-btn
        color="#143FD5"
        class="mt-4"
        block
        size="large"
        type="submit"
        variant="elevated"
      >
        Sign Up
      </v-btn>
      <v-container class="d-flex justify-center mt-2">
        <p>
          Already have an account ?
          <router-link to="/login"> Sign in </router-link>
        </p>
      </v-container>
    </v-form>

    <v-alert v-if="hasErrorsYup" color="error" icon="$error" title="Error">
      <ul>
        <li v-for="(error, field) in errosYup" :key="field">* {{ error }}</li>
      </ul>
    </v-alert>
  </v-container>
  <v-img :width="300" cover src="/songohan.png" class="son-gohan"></v-img>
</template>

<script>
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErroYup.js";
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      planList: [
        { value: "bronze", title: "Bronze" },
        { value: "silver", title: "Silver" },
        { value: "gold", title: "Gold" },
      ],
      plan: "bronze",
      errosYup: {},
    };
  },

  methods: {
    signUp() {
      if (!this.passwordMatches) {
        alert("Oops! It looks like the password you entered doesn't match.");
        this.$refs.confirmPassword.focus();
        return;
      }

      debugger;
      axios
        .post("http://localhost:3000/users", {
          name: this.fullName,
          email: this.email,
          password: this.password,
          type_plan: this.plan,
        })
        .then(() => {
          alert(
            "Welcome to the saiya family! Let's embark on an amazing journey together."
          );
          this.$router.push("/login");
        })
        .catch(() =>
          alert(
            "Oops, something's not quite right. It seems there was a hiccup on our end. Please try again later or contact our support team for assistance. We're here to help!"
          )
        );
      this.errosYup = {};
    },

    handleSingup() {
      try {
        const schema = yup.object().shape({
          fullName: yup.string().required("Name is a required field."),
          email: yup.string().email().required("Email is a required field."),
          password: yup
            .string()
            .required("Password is a required field.")
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password must be no more than 20 characters long"),
          confirmPassword: yup
            .string()
            .required("Confirm password is a required field."),

          plan: yup.string().required("Plan is a required field."),
        });

        schema.validateSync(
          {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            plan: this.plan,
          },
          { abortEarly: false }
        );
        this.signUp();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errosYup = captureErrorYup(error);
        }
      }
    },
  },

  computed: {
    hasErrorsYup() {
      return Object.keys(this.errosYup).length > 0;
    },

    passwordMatches() {
      return this.password === this.confirmPassword;
    },
  },
};
</script>

<style scoped>
.son-gohan {
  position: absolute;
  right: 0px;
  bottom: 100px;
}
</style>
