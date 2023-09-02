<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-8 border"
  >
    <span class="d-flex justify-space-between">
      <h1>Saiya Gym Login</h1>
      <v-icon>mdi-cloud-outline</v-icon>
    </span>
    <v-form
      @submit.prevent="handleSubmit"
      class="d-flex flex-column justify-center mt-8"
    >
      <p>Email</p>
      <v-text-field
        v-model="email"
        hint="Enter your email"
        placeholder="Email"
      ></v-text-field>

      <p>Password</p>
      <v-text-field
        v-model="password"
        hint="Enter your password"
        placeholder="Password"
        ref="password"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      ></v-text-field>

      <v-btn
        color="#143FD5"
        class="mt-4"
        block
        size="large"
        type="submit"
        variant="elevated"
      >
        Log in
      </v-btn>
      <v-container class="d-flex justify-center mt-2">
        <p>
          Don’t have an account ?
          <router-link to="/signup"> Sign up </router-link>
        </p>
      </v-container>
    </v-form>

    <v-alert
      class="mt-4"
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

  <v-img
    :width="300"
    cover
    src="/songohan.png"
    class="son-gohan"
    alt="kid-gohan-dragonball"
  ></v-img>
</template>

<script>
import axios from "axios";
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErroYup.js";

export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      errosYup: {},
    };
  },
  computed: {
    hasErrorsYup() {
      return Object.keys(this.errosYup).length > 0;
    },
  },
  methods: {
    logIn() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/sessions", formData)
        .then((res) => {
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("token", res.data.token);
          alert("Great to see you again at the saiyan app");
          this.$router.push("/dashboard");
        })
        .catch(() => {
          alert(
            "Oops! Check your email and password, then try again. If you're still stuck, a password reset could save the day."
          );
          this.$refs.password.focus();
        });
      this.errosYup = {};
    },

    handleSubmit() {
      try {
        const schema = yup.object().shape({
          email: yup.string().required("Email is a required field.").email(),
          password: yup.string().required("Password is a required field."),
        });

        schema.validateSync(
          {
            email: this.email,
            password: this.password,
          },
          { abortEarly: false }
        );
        this.logIn();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errosYup = captureErrorYup(error);
        }
      }
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
