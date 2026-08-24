<script setup lang="ts">
import { TimeGranularity } from '@model-stacker/data';

const granularities = Object.values(TimeGranularity);
</script>

<template>
  <section class="page">
    <h2>花销统计</h2>
    <p class="tip">按年 / 季度 / 月 / 自定义时间段统计堆积花销，功能开发中。</p>
    <ul class="list">
      <li v-for="g in granularities" :key="g" class="item">
        <span class="label">统计粒度</span>
        <code>{{ g }}</code>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.page {
  h2 {
    margin-bottom: 8px;
  }
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
