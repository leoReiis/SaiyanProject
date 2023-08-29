<template>
  <v-container
    class="w-50 h-auto d-flex flex-column justify-center rounded mt-16"
  >
    <h1>TrainSys Login</h1>
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
        type="password"
        hint="Enter your password"
        placeholder="Password"
      ></v-text-field>

      <v-btn class="mt-4" block size="large" type="submit" variant="elevated">
        Log in
      </v-btn>
      <p class="d-flex justify-center mt-4">Don’t have an account? Sign up</p>
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
import * as yup from "yup";
import { captureErrorYup } from "../utils/captureErroYup.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      formData: {},
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
      this.formData = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/sessions", this.formData)
        .then((res) => {
          alert("Cliente cadastrado com sucesso!");
        })
        .catch((erro) => console.log(erro));
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

      if (!this.hasErrorsYup) {
        // limpar Form ? Redirecionar ?
      }
    },
  },
};
</script>

<style scoped>
* {
}
</style>
