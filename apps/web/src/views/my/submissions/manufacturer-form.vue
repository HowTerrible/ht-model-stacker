<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { SourceTypeEnum } from '@model-stacker/data';
import { submitManufacturer } from '@/api/submission';

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
  fullName?: string;
  country?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  dataSourceType: SourceTypeEnum | undefined;
  dataSourceNote: string;
  note?: string;
}

const form = reactive<Form>({
  name: '',
  fullName: '',
  country: '',
  website: '',
  description: '',
  logoUrl: '',
  dataSourceType: undefined,
  dataSourceNote: '',
  note: '',
});

const rules: FormRules = {
  name: [{ required: true, message: '请输入厂家简称', trigger: 'blur' }],
};

const allCountries = ['日本', '中国', '美国', '德国', '英国', '韩国', '西班牙', '其他'];

function buildDataSource(formValue: Form): string | undefined {
  if (!formValue.dataSourceType) return undefined;
  return formValue.dataSourceNote ? `${formValue.dataSourceType}|${formValue.dataSourceNote}` : formValue.dataSourceType;
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  await submitManufacturer({
    name: form.name,
    fullName: form.fullName || undefined,
    country: form.country || undefined,
    website: form.website || undefined,
    description: form.description || undefined,
    logoUrl: form.logoUrl || undefined,
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
  <el-dialog v-model="visible" title="提交厂家资料" class="submit-dialog" width="560px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="88px">
      <el-form-item label="厂家简称" prop="name">
        <el-input v-model="form.name" placeholder="如：万代 Bandai" />
      </el-form-item>
      <el-form-item label="厂家全称" prop="fullName">
        <el-input v-model="form.fullName" placeholder="选填" />
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
      <el-form-item label="Logo 地址" prop="logoUrl">
        <el-input v-model="form.logoUrl" placeholder="https://..." />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSourceType">
        <el-select v-model="form.dataSourceType" clearable placeholder="选填">
          <el-option :value="SourceTypeEnum.ORIGINAL" label="原创" />
          <el-option :value="SourceTypeEnum.OFFICIAL" label="官网" />
          <el-option :value="SourceTypeEnum.EXTERNAL" label="外链" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.dataSourceType === SourceTypeEnum.OFFICIAL || form.dataSourceType === SourceTypeEnum.EXTERNAL" label="来源备注" prop="dataSourceNote">
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
