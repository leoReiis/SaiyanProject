<template>
  <RouterView />
</template>

<script>
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Dashboard from "./components/Dashboard.vue";

export default {
  components: { Login, Signup, Dashboard },
};
</script>

<style scoped></style>
