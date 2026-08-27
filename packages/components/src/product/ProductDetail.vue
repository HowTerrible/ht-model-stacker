<script setup lang="ts">
import type { Product } from '@model-stacker/data';
import StatusTag from '../common/StatusTag.vue';
import DataSourceBadge from '../common/DataSourceBadge.vue';
import {
  kindLabels,
  kindTagTypes,
  materialLabels,
  modelScaleLabels,
  modelTypeLabels,
  productStatusLabels,
  productStatusTagTypes,
  toolTypeLabels,
} from '../options';

defineProps<{ item: Product; manufacturerName?: string }>();
</script>

<template>
  <div class="product-detail">
    <header class="detail-header">
      <h3 class="name">{{ item.name }}</h3>
      <StatusTag :label="kindLabels[item.kind]" :type="kindTagTypes[item.kind]" />
      <StatusTag :label="productStatusLabels[item.status]" :type="productStatusTagTypes[item.status]" />
      <DataSourceBadge :value="item.dataSource" />
    </header>

    <el-descriptions :column="2" border size="small">
      <el-descriptions-item label="官方名称">{{ item.officialName || '-' }}</el-descriptions-item>
      <el-descriptions-item label="货号/型号">{{ item.modelNo || '-' }}</el-descriptions-item>
      <el-descriptions-item label="厂家">{{ manufacturerName || '-' }}</el-descriptions-item>
      <el-descriptions-item label="比例">{{ item.scale ? modelScaleLabels[item.scale as keyof typeof modelScaleLabels] ?? item.scale : '-' }}</el-descriptions-item>
      <el-descriptions-item label="种类">{{ kindLabels[item.kind] }}</el-descriptions-item>
      <el-descriptions-item v-if="item.kind === 'MODEL'" label="模型子类">
        <template v-if="item.modelTypes?.length">
          <el-tag v-for="t in item.modelTypes" :key="t" size="small" class="tag">
            {{ modelTypeLabels[t as keyof typeof modelTypeLabels] ?? t }}
          </el-tag>
        </template>
        <span v-else>-</span>
      </el-descriptions-item>
      <el-descriptions-item v-if="item.kind === 'TOOL_SUPPLY'" label="工具子类">
        {{ item.toolType ? toolTypeLabels[item.toolType as keyof typeof toolTypeLabels] ?? item.toolType : '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="材质">
        {{ item.material ? materialLabels[item.material as keyof typeof materialLabels] ?? item.material : '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="简介" :span="2">{{ item.description || '-' }}</el-descriptions-item>
      <el-descriptions-item label="说明书来源" :span="2">
        <DataSourceBadge :value="item.manualsSource" />
      </el-descriptions-item>
      <el-descriptions-item label="照片来源" :span="2">
        <DataSourceBadge :value="item.photosSource" />
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ item.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ item.updatedAt }}</el-descriptions-item>
    </el-descriptions>

    <div v-if="item.tags?.length" class="tags-section">
      <span class="section-label">标签</span>
      <el-tag v-for="tag in item.tags" :key="tag" size="small" type="info" class="tag">
        {{ tag }}
      </el-tag>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
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

.tags-section {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.section-label {
  font-size: 13px;
  color: var(--el-text-color-secondary, #909399);
}

.tag {
  margin-right: 4px;
}
</style>
