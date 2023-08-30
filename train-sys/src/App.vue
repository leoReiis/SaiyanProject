<template>
  <Header></Header>
  <RouterView />
  <span class="footer">
    <Footer></Footer>
  </span>
</template>

<script>
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Dashboard from "./components/Dashboard.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Login, Signup, Dashboard, Header, Footer },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
