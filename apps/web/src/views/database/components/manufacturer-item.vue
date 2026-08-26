<script setup lang="ts">
import { CommonStatus } from "@model-stacker/data";
import { commonStatusLabels, commonStatusTagTypes } from "../options";

interface ManufacturerItem {
  id: string;
  name: string;
  fullName?: string;
  country?: string;
  website?: string;
  description?: string;
  status: CommonStatus;
}

defineProps<{ item: ManufacturerItem }>();

defineEmits<{ click: [item: ManufacturerItem] }>();
</script>

<template>
  <article class="mfr-card row" @click="$emit('click', item)">
    <div class="row-info">
      <div class="card-head">
        <h4 class="name">{{ item.name }}</h4>
        <el-tag size="small" :type="commonStatusTagTypes[item.status]">
          {{ commonStatusLabels[item.status] }}
        </el-tag>
        <a
          v-if="item.website"
          class="website"
          :href="item.website"
          target="_blank"
          rel="noopener"
          @click.stop
        >
          {{ item.website }}
        </a>
      </div>
      <p class="meta">
        <span v-if="item.country">{{ item.country }}</span>
        <span v-if="item.fullName"> · {{ item.fullName }}</span>
      </p>
      <p v-if="item.description" class="desc">{{ item.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.mfr-card {
  padding: 12px 14px;
  background: var(--app-surface-color, #fff);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.mfr-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  flex:1;
}

.meta {
  margin-top: 4px;
  color: var(--app-text-secondary, #888);
  font-size: 12px;
}

.desc {
  margin-top: 4px;
  color: var(--app-text-secondary, #999);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 400px;
}

.website {
  color: var(--el-color-primary, #409eff);
  font-size: 12px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.website:hover {
  text-decoration: underline;
}
</style>
