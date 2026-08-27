<script setup lang="ts">
import { ModelType, ProductKind, ProductStatus, ToolType } from "@model-stacker/data";
import {
  kindLabels,
  kindTagTypes,
  modelTypeLabels,
  statusLabels,
  statusTagTypes,
  toolTypeLabels,
} from "../options";

interface ProductItem {
  id: string;
  productName: string;
  officialName?: string;
  modelNo?: string;
  manufacturerName: string;
  kind: ProductKind;
  modelTypes?: ModelType[];
  toolType?: ToolType;
  scale?: string;
  status: ProductStatus;
}

defineProps<{ item: ProductItem; viewMode: "list" | "grid" }>();

defineEmits<{ click: [item: ProductItem] }>();

function subTags(item: ProductItem): string[] {
  if (item.kind === ProductKind.MODEL) {
    return (item.modelTypes ?? []).map((t) => modelTypeLabels[t] ?? t);
  }
  if (item.toolType) {
    return [toolTypeLabels[item.toolType] ?? item.toolType];
  }
  return [];
}
</script>

<template>
  <!-- 通栏布局 -->
  <template v-if="viewMode === 'list'">
    <article class="db-card row" @click="$emit('click', item)">
      <div class="cover-area">
        <slot name="cover"></slot>
      </div>
      <div class="row-info">
        <div class="card-head">
          <h4 class="name">{{ item.productName }}</h4>
          <el-tag size="small" :type="kindTagTypes[item.kind]">
            {{ kindLabels[item.kind] }}
          </el-tag>
          <el-tag size="small" :type="statusTagTypes[item.status]">
            {{ statusLabels[item.status] }}
          </el-tag>
        </div>
        <p class="meta">
          <span>{{ item.manufacturerName }}</span>
          <span v-if="item.modelNo"> · {{ item.modelNo }}</span>
          <span v-if="item.scale"> · {{ item.scale }}</span>
        </p>
        <div v-if="subTags(item).length" class="sub-tags">
          <el-tag
            v-for="tag in subTags(item)"
            :key="tag"
            size="small"
            type="info"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
      <span v-if="item.officialName" class="official-name">
        {{ item.officialName }}
      </span>
    </article>
  </template>

  <!-- 网格布局 -->
  <template v-else>
    <article class="db-card col" @click="$emit('click', item)">
      <div class="card-head">
        <h4 class="name">{{ item.productName }}</h4>
      </div>
      <div class="tags">
        <el-tag size="small" :type="kindTagTypes[item.kind]">
          {{ kindLabels[item.kind] }}
        </el-tag>
        <el-tag size="small" :type="statusTagTypes[item.status]">
          {{ statusLabels[item.status] }}
        </el-tag>
      </div>
      <div v-if="subTags(item).length" class="sub-tags">
        <el-tag
          v-for="tag in subTags(item)"
          :key="tag"
          size="small"
          type="info"
        >
          {{ tag }}
        </el-tag>
      </div>
      <p class="meta">
        {{ item.manufacturerName }}
        <span v-if="item.modelNo"> · {{ item.modelNo }}</span>
        <span v-if="item.scale"> · {{ item.scale }}</span>
      </p>
      <p v-if="item.officialName" class="official-name">
        {{ item.officialName }}
      </p>
    </article>
  </template>
</template>

<style scoped>
.db-card {
  padding: 12px 14px;
  background: var(--app-surface-color, #fff);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.cover-area {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 6px;
  background: var(--el-fill-color-light, #f0f0f0);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.db-card.row .row-info {
  flex: 1;
  min-width: 0;
}

.db-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.db-card.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.sub-tags {
  display: flex;
  gap: 4px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.meta {
  margin-top: 4px;
  color: var(--app-text-secondary, #888);
  font-size: 12px;
}

.official-name {
  color: var(--app-text-secondary, #999);
  font-size: 12px;
  font-style: italic;
  white-space: nowrap;
}

.db-card.row .official-name {
  flex-shrink: 0;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.db-card.col .official-name {
  display: block;
  margin-top: 4px;
}
</style>
