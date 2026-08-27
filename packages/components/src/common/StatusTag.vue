<script setup lang="ts">
import type { TagType } from '../options';

interface Props {
  label: string;
  type?: TagType;
  size?: 'large' | 'default' | 'small';
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  size: 'small',
});
</script>

<template>
  <el-tag :type="type" :size="size">{{ label }}</el-tag>
</template>
