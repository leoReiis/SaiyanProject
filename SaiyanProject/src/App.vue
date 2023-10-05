<template>
  <Header v-if="displayMenu"></Header>
  <RouterView />
  <span class="footer">
    <Footer></Footer>
  </span>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Header, Footer },
  computed: {
    displayMenu() {
      return !(this.$route.path === "/signup" || this.$route.path === "/login");
    },
  },
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
