<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知vuex发请求，获取三级联动数据，存储在仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>