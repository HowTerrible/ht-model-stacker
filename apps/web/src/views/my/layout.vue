<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const activePath = computed(() => route.path);
</script>

<template>
  <div class="my-module">
    <el-menu
      class="module-nav"
      mode="horizontal"
      router
      :default-active="activePath"
      :ellipsis="false"
    >
      <el-menu-item index="/my">个人主页</el-menu-item>
      <el-menu-item index="/my/my-stack">我的堆积</el-menu-item>
      <el-menu-item index="/my/statistics">详细统计</el-menu-item>
      <el-menu-item index="/my/submissions">资料提交</el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<style scoped>
.module-nav {
  margin-bottom: 12px;
}
</style>
