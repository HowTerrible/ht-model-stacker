<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Currency, PurchaseChannel, StackStatus } from '@model-stacker/data';
import {
  channelOptions,
  currencyOptions,
  statusOptions,
} from './options';

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  /** 保存成功（暂未接入堆积接口，仅前端流转） */
  (e: 'saved'): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const formRef = ref<FormInstance>();

interface StackFormModel {
  productName: string;
  purchasedAt: string;
  purchasePrice?: number;
  currency: Currency;
  channel?: PurchaseChannel;
  status: StackStatus;
  notes: string;
}

const createEmptyForm = (): StackFormModel => ({
  productName: '',
  purchasedAt: '',
  purchasePrice: undefined,
  currency: Currency.CNY,
  channel: undefined,
  status: StackStatus.UNSTARTED,
  notes: '',
});

const form = reactive<StackFormModel>(createEmptyForm());

const rules: FormRules = {
  purchasedAt: [{ required: true, message: '请选择购买时间', trigger: 'change' }],
};

watch(
  () => props.modelValue,
  (opened) => {
    if (opened) Object.assign(form, createEmptyForm());
  },
);

async function handleSave() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  // TODO 待接入堆积保存接口，当前仅关闭并通知父级
  emit('saved');
  visible.value = false;
}
</script>

<template>
  <el-dialog v-model="visible" title="堆积信息" class="stack-form-dialog" width="560px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="88px">
      <el-form-item label="产品" prop="productName">
        <el-input v-model="form.productName" placeholder="产品名称（后续可从资料库选择）" />
      </el-form-item>
      <el-form-item label="购买时间" prop="purchasedAt">
        <el-date-picker
          v-model="form.purchasedAt"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择购买时间"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="购买价格">
        <el-input-number
          v-model="form.purchasePrice"
          :min="0"
          :precision="2"
          controls-position="right"
          placeholder="0.00"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="币种">
        <el-select v-model="form.currency">
          <el-option
            v-for="opt in currencyOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="购买渠道">
        <el-select v-model="form.channel" clearable placeholder="未选择">
          <el-option
            v-for="opt in channelOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option
            v-for="opt in statusOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.notes" type="textarea" :rows="3" placeholder="选填" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<style>
.stack-form-dialog {
  max-width: calc(100vw - 24px);
}
</style>
