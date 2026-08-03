<script setup lang="ts">
import { StackStatus } from '@model-stacker/data';

const statuses = Object.values(StackStatus);
</script>

<template>
  <section class="page">
    <h2>我的堆积</h2>
    <p class="tip">堆积列表功能开发中，可查看自己购买的产品、按时间/状态筛选。</p>
    <ul class="list">
      <li v-for="s in statuses" :key="s" class="item">
        <span class="label">堆积状态</span>
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
