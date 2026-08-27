<script setup lang="ts">
import { computed } from 'vue';
import { SourceType } from '@model-stacker/data';
import { parseDataSource } from '@model-stacker/data';
import { sourceTypeLabels } from '../options';

const props = defineProps<{ value?: string }>();

const parsed = computed(() => parseDataSource(props.value));

const typeLabel = computed(() =>
  parsed.value.type ? sourceTypeLabels[parsed.value.type] ?? parsed.value.type : '',
);

const tagType = computed(() => {
  switch (parsed.value.type) {
    case SourceType.ORIGINAL:
      return 'success' as const;
    case SourceType.OFFICIAL:
      return 'primary' as const;
    case SourceType.EXTERNAL:
      return 'info' as const;
    default:
      return 'info' as const;
  }
});
</script>

<template>
  <el-tooltip v-if="parsed.type" :content="parsed.note" placement="top" :disabled="!parsed.note">
    <el-tag :type="tagType" size="small">
      {{ typeLabel }}
      <span v-if="parsed.note" class="note">{{ parsed.note }}</span>
    </el-tag>
  </el-tooltip>
</template>

<style scoped>
.note {
  margin-left: 4px;
  font-weight: normal;
  opacity: 0.8;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
