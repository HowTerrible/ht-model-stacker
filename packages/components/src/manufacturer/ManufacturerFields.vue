<script setup lang="ts">
import { CommonStatus } from '@model-stacker/data';
import { commonStatusOptions } from '../options';

/**
 * 厂家表单字段组 — 仅包含 el-form-item 集合，不含 el-form 容器。
 * 父级通过 v-model 绑定表单对象，用 el-form 包裹后即可复用。
 */
defineProps<{
  /** 表单对象（响应式），字段：name / fullName / country / website / description / status */
  form: {
    name: string;
    fullName?: string;
    country?: string;
    website?: string;
    description?: string;
    status: CommonStatus;
  };
}>();

const allCountries = ['日本', '中国', '美国', '德国', '英国', '韩国', '西班牙', '其他'];
</script>

<template>
  <el-form-item label="简称" prop="name" :rules="[{ required: true, message: '请输入厂家简称', trigger: 'blur' }]">
    <el-input v-model="form.name" placeholder="如：万代 Bandai" />
  </el-form-item>

  <el-form-item label="全称" prop="fullName">
    <el-input v-model="form.fullName" placeholder="如：BANDAI NAMCO Holdings Inc." />
  </el-form-item>

  <el-form-item label="国家/地区" prop="country">
    <el-select v-model="form.country" clearable placeholder="请选择">
      <el-option v-for="c in allCountries" :key="c" :label="c" :value="c" />
    </el-select>
  </el-form-item>

  <el-form-item label="官网" prop="website">
    <el-input v-model="form.website" placeholder="https://..." />
  </el-form-item>

  <el-form-item label="简介" prop="description">
    <el-input v-model="form.description" type="textarea" :rows="3" placeholder="选填" />
  </el-form-item>

  <el-form-item label="状态" prop="status">
    <el-select v-model="form.status">
      <el-option v-for="o in commonStatusOptions" :key="o.value" :label="o.label" :value="o.value" />
    </el-select>
  </el-form-item>
</template>
