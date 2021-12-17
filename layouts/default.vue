<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <v-aside />
      </el-aside>
      <el-main>
        <div class="container">
          <nuxt />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import VAside from "@/components/VAside";
export default {
  components: {
    VAside,
  },
};
</script>

<style lang="sass" scoped>
.layout
  background-color: #2697ff
  width: 100%
  min-height: 100vh
.container
  display: flex
  justify-content: center
</style>