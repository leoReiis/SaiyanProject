<template>
  <Header></Header>
  <RouterView />
</template>

<script>
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Dashboard from "./components/Dashboard.vue";
import Header from "./components/Header.vue";

export default {
  components: { Login, Signup, Dashboard, Header },
};
</script>

<style scoped></style>
