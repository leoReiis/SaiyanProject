<template>
  <Header></Header>
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
