<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import {
  kindOptions,
  materialOptions,
  modelScaleOptions,
  modelTypeOptions,
  toolTypeOptions,
} from '@model-stacker/components';
import { ProductKind, SourceType } from '@model-stacker/data';
import type { Material, ModelScale, ModelType, ToolType } from '@model-stacker/data';
import { submitProduct } from '@/api/submission';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submitted'): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const formRef = ref<FormInstance>();

interface Form {
  name: string;
  officialName?: string;
  modelNo?: string;
  kind: ProductKind;
  modelTypes: ModelType[];
  toolType?: ToolType;
  material?: Material;
  scale?: ModelScale | string;
  description?: string;
  manufacturerName?: string;
  dataSourceType: SourceType | undefined;
  dataSourceNote: string;
  note?: string;
}

const form = reactive<Form>({
  name: '',
  officialName: '',
  modelNo: '',
  kind: ProductKind.MODEL,
  modelTypes: [],
  toolType: undefined,
  material: undefined,
  scale: undefined,
  description: '',
  manufacturerName: '',
  dataSourceType: undefined,
  dataSourceNote: '',
  note: '',
});

const rules: FormRules = {
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
};

const isModel = computed(() => form.kind === ProductKind.MODEL);

function buildDataSource(formValue: Form): string | undefined {
  if (!formValue.dataSourceType) return undefined;
  return formValue.dataSourceNote ? `${formValue.dataSourceType}|${formValue.dataSourceNote}` : formValue.dataSourceType;
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  await submitProduct({
    name: form.name,
    officialName: form.officialName || undefined,
    modelNo: form.modelNo || undefined,
    kind: form.kind,
    modelTypes: isModel.value ? form.modelTypes : [],
    toolType: isModel.value ? undefined : form.toolType || undefined,
    material: form.material || undefined,
    scale: isModel.value ? form.scale || undefined : undefined,
    description: form.description || undefined,
    manufacturerName: form.manufacturerName || undefined,
    dataSource: buildDataSource(form),
    note: form.note || undefined,
  });
  ElMessage.success('提交成功，等待管理员审核');
  emit('submitted');
  visible.value = false;
  formRef.value?.resetFields();
}
</script>

<template>
  <el-dialog v-model="visible" title="提交产品资料" class="submit-dialog" width="560px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="88px">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="form.name" placeholder="如：MG 沙扎比 Ver.Ka" />
      </el-form-item>
      <el-form-item label="官方名称" prop="officialName">
        <el-input v-model="form.officialName" placeholder="选填" />
      </el-form-item>
      <el-form-item label="货号/型号" prop="modelNo">
        <el-input v-model="form.modelNo" placeholder="选填" />
      </el-form-item>
      <el-form-item label="厂家" prop="manufacturerName">
        <el-input v-model="form.manufacturerName" placeholder="厂名（如：万代）" />
      </el-form-item>
      <el-form-item label="种类" prop="kind">
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
      <el-form-item v-if="!isModel" label="工具子类" prop="toolType">
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
        <el-input v-model="form.description" type="textarea" :rows="2" placeholder="选填" />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSourceType">
        <el-select v-model="form.dataSourceType" clearable placeholder="选填">
          <el-option :value="SourceType.ORIGINAL" label="原创" />
          <el-option :value="SourceType.OFFICIAL" label="官网" />
          <el-option :value="SourceType.EXTERNAL" label="外链" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.dataSourceType === SourceType.OFFICIAL || form.dataSourceType === SourceType.EXTERNAL" label="来源备注" prop="dataSourceNote">
        <el-input v-model="form.dataSourceNote" placeholder="URL 等备注" />
      </el-form-item>
      <el-form-item label="补充说明" prop="note">
        <el-input v-model="form.note" type="textarea" :rows="2" placeholder="选填，便于管理员审核" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交审核</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.submit-dialog {
  max-width: calc(100vw - 24px);
}
</style>
