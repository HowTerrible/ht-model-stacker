<script setup lang="ts">
import { WipStatus } from '@model-stacker/data';

const statuses = Object.values(WipStatus);
</script>

<template>
  <section class="page">
    <h2>烂尾管理</h2>
    <p class="tip">记录开封未完成的模型，跟踪进度与状态，功能开发中。</p>
    <ul class="list">
      <li v-for="s in statuses" :key="s" class="item">
        <span class="label">烂尾状态</span>
        <code>{{ s }}</code>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.page h2 {
  margin-bottom: 8px;
}

.tip {
  margin-bottom: 12px;
  color: #888;
  font-size: 13px;
}

.list {
  list-style: none;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
}

.label {
  color: #888;
}
</style>
