<script setup lang="ts">
import { ProductKindEnum } from '@model-stacker/data';

const kinds = Object.values(ProductKindEnum);
</script>

<template>
  <div class="page">
    <h2>产品管理</h2>
    <p>管理产品及厂家详细信息、竞品关联，功能开发中。</p>
    <el-tag v-for="k in kinds" :key="k" class="tag">{{ k }}</el-tag>
  </div>
</template>

<style scoped>
.tag {
  margin-right: 8px;
}
</style>
