<script setup lang="ts">
import { computed } from 'vue';
import { ProductKindEnum } from '@model-stacker/data';
import {
  kindOptions,
  materialOptions,
  modelScaleOptions,
  modelTypeOptions,
  productStatusOptions,
  toolTypeOptions,
} from '../options';

/**
 * 产品表单字段组 — 仅包含 el-form-item 集合，不含 el-form 容器。
 * 父级通过 v-model 绑定表单对象，用 el-form 包裹后即可复用。
 */
const props = defineProps<{
  /** 表单对象（响应式），字段参照 Product 表单子集 */
  form: {
    name: string;
    officialName?: string;
    modelNo?: string;
    manufacturerId?: number;
    kind: ProductKindEnum;
    modelTypes: string[];
    toolType?: string;
    material?: string;
    scale?: string;
    description?: string;
    status: ProductKindEnum extends never ? never : never;
    [key: string]: unknown;
  };
}>();

const isModel = computed(() => props.form.kind === ProductKindEnum.MODEL);
const isToolSupply = computed(() => props.form.kind === ProductKindEnum.TOOL_SUPPLY);
</script>

<template>
  <el-form-item label="产品名称" prop="name" :rules="[{ required: true, message: '请输入产品名称', trigger: 'blur' }]">
    <el-input v-model="form.name" placeholder="如：MG 沙扎比 Ver.Ka" />
  </el-form-item>

  <el-form-item label="官方名称" prop="officialName">
    <el-input v-model="form.officialName" placeholder="外盒/说明书上的标准原文（选填）" />
  </el-form-item>

  <el-form-item label="货号/型号" prop="modelNo">
    <el-input v-model="form.modelNo" placeholder="如：MG 1/100" />
  </el-form-item>

  <el-form-item label="种类" prop="kind" :rules="[{ required: true, message: '请选择种类', trigger: 'change' }]">
    <el-radio-group v-model="form.kind">
      <el-radio-button v-for="o in kindOptions" :key="o.value" :value="o.value">
        {{ o.label }}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item v-if="isModel" label="模型子类" prop="modelTypes">
    <el-checkbox-group v-model="form.modelTypes">
      <el-checkbox-button v-for="o in modelTypeOptions" :key="o.value" :value="o.value">
        {{ o.label }}
      </el-checkbox-button>
    </el-checkbox-group>
  </el-form-item>

  <el-form-item v-if="isToolSupply" label="工具子类" prop="toolType">
    <el-select v-model="form.toolType" clearable placeholder="请选择">
      <el-option v-for="o in toolTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
    </el-select>
  </el-form-item>

  <el-form-item v-if="isModel" label="比例" prop="scale">
    <el-select v-model="form.scale" filterable allow-create clearable placeholder="选择或输入">
      <el-option v-for="o in modelScaleOptions" :key="o.value" :label="o.label" :value="o.value" />
    </el-select>
  </el-form-item>

  <el-form-item label="材质" prop="material">
    <el-select v-model="form.material" clearable placeholder="选填">
      <el-option v-for="o in materialOptions" :key="o.value" :label="o.label" :value="o.value" />
    </el-select>
  </el-form-item>

  <el-form-item label="简介" prop="description">
    <el-input v-model="form.description" type="textarea" :rows="3" placeholder="选填" />
  </el-form-item>
</template>
