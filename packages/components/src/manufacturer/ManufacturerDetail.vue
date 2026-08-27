<script setup lang="ts">
import type { Manufacturer } from '@model-stacker/data';
import StatusTag from '../common/StatusTag.vue';
import DataSourceBadge from '../common/DataSourceBadge.vue';
import { commonStatusLabels, commonStatusTagTypes } from '../options';

defineProps<{ item: Manufacturer }>();
</script>

<template>
  <div class="manufacturer-detail">
    <header class="detail-header">
      <h3 class="name">{{ item.name }}</h3>
      <StatusTag :label="commonStatusLabels[item.status]" :type="commonStatusTagTypes[item.status]" />
      <DataSourceBadge :value="item.dataSource" />
    </header>

    <el-descriptions :column="2" border size="small">
      <el-descriptions-item label="全称">{{ item.fullName || '-' }}</el-descriptions-item>
      <el-descriptions-item label="国家/地区">{{ item.country || '-' }}</el-descriptions-item>
      <el-descriptions-item label="官网" :span="2">
        <a v-if="item.website" :href="item.website" target="_blank" rel="noopener" class="link">
          {{ item.website }}
        </a>
        <span v-else>-</span>
      </el-descriptions-item>
      <el-descriptions-item label="简介" :span="2">
        {{ item.description || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ item.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ item.updatedAt }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>
.manufacturer-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.name {
  margin: 0;
  font-size: 18px;
  flex: 1;
}

.link {
  color: var(--el-color-primary, #409eff);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
