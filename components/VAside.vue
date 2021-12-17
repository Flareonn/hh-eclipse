<template>
  <el-menu :default-active="$route.path" router class="aside">
    <el-menu-item index="/">Список валют</el-menu-item>
    <el-menu-item index="/converter">Конвертер</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="sass" scoped>
.aside
  height: 100%
  position: fixed
  width: 300px
</style>