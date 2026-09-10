<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { Id } from "@model-stacker/data";
import { Currency, PurchaseChannel, StackStatus } from "@model-stacker/data";
import { channelOptions, currencyOptions, statusOptions } from "./options";
import {
  deleteStack,
  saveStack,
  searchManufacturers,
  searchProducts,
  type ManufacturerOption,
  type ProductOption,
} from "@/api/stack";

const props = defineProps<{
  modelValue: boolean;
  /** 堆积记录 ID，传入则进入编辑模式（厂家 / 产品 / 货号不可修改） */
  stackId?: Id;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  /** 保存成功 */
  (e: "saved"): void;
  /** 删除成功 */
  (e: "deleted"): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/** 是否为编辑模式 */
const isEdit = computed(() => props.stackId != null);

const formRef = ref<FormInstance>();

interface StackFormModel {
  manufacturer: number | string;
  product: number | string;
  modelNo: string;
  purchasedAt: string;
  purchasePrice?: number;
  currency: Currency;
  channel?: PurchaseChannel;
  status: StackStatus;
  location: string;
  notes: string;
}

const createEmptyForm = (): StackFormModel => ({
  manufacturer: "",
  product: "",
  modelNo: "",
  purchasedAt: "",
  purchasePrice: undefined,
  currency: Currency.CNY,
  channel: undefined,
  status: StackStatus.UNSTARTED,
  location: "",
  notes: "",
});

const form = reactive<StackFormModel>(createEmptyForm());

const rules: FormRules = {
  manufacturer: [
    { required: true, message: "请选择或输入厂家", trigger: "change" },
  ],
  product: [{ required: true, message: "请选择或输入产品", trigger: "change" }],
};

/* ---------- 厂家远程搜索 ---------- */
const manufacturerLoading = ref(false);
const manufacturerOptions = ref<ManufacturerOption[]>([]);

async function handleManufacturerSearch(query: string) {
  manufacturerLoading.value = true;
  try {
    manufacturerOptions.value = await searchManufacturers(query);
  } finally {
    manufacturerLoading.value = false;
  }
}

/* ---------- 产品远程搜索 ---------- */
const productLoading = ref(false);
const productOptions = ref<ProductOption[]>([]);

async function handleProductSearch(query: string) {
  productLoading.value = true;
  try {
    productOptions.value = await searchProducts(query);
  } finally {
    productLoading.value = false;
  }
}

watch(
  () => props.modelValue,
  (opened) => {
    if (!opened) return;
    Object.assign(form, createEmptyForm());
    if (props.stackId != null) {
      // TODO 编辑模式：根据 props.stackId 获取既有堆积数据回填
      // 厂家 / 产品 / 货号此时应回填原值且不可修改
      form.manufacturer = 1;
      form.product = 1;
      form.modelNo = "MOCK-001";
    }
  },
);

async function handleSave() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  console.log({
    manufacturer: form.manufacturer,
    product: form.product,
    modelNo: form.modelNo,
    purchasedAt: form.purchasedAt,
    purchasePrice: form.purchasePrice,
    currency: form.currency,
    channel: form.channel,
    status: form.status,
    location: form.location,
    notes: form.notes,
  });

  await saveStack(
    {
      manufacturer: form.manufacturer,
      product: form.product,
      modelNo: form.modelNo,
      purchasedAt: form.purchasedAt,
      purchasePrice: form.purchasePrice,
      currency: form.currency,
      channel: form.channel,
      status: form.status,
      location: form.location,
      notes: form.notes,
    },
    props.stackId,
  );
  ElMessage.success(isEdit.value ? "保存成功" : "新增成功");
  emit("saved");
  visible.value = false;
}

/** 保存成功后清空表单，准备录入下一条数据（仅新增模式） */
async function handleSaveAndNext() {
  if (isEdit.value) return;
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  await saveStack({
    manufacturer: form.manufacturer,
    product: form.product,
    modelNo: form.modelNo,
    purchasedAt: form.purchasedAt,
    purchasePrice: form.purchasePrice,
    currency: form.currency,
    channel: form.channel,
    status: form.status,
    location: form.location,
    notes: form.notes,
  });
  ElMessage.success("已保存，可录入下一条");
  emit("saved");
  formRef.value?.clearValidate();
  Object.assign(form, createEmptyForm());
}

async function handleDelete() {
  try {
    await ElMessageBox.confirm(
      "删除后不可恢复，确定删除该堆积记录吗？",
      "删除确认",
      {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      },
    );
  } catch {
    return;
  }
  if (props.stackId == null) return;
  await deleteStack(props.stackId);
  ElMessage.success("删除成功");
  emit("deleted");
  visible.value = false;
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑堆积' : '堆积信息'"
    class="stack-form-dialog"
    width="560px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="88px">
      <el-form-item label="厂家" prop="manufacturer">
        <el-select
          v-model="form.manufacturer"
          filterable
          remote
          allow-create
          default-first-option
          reserve-keyword
          :remote-method="handleManufacturerSearch"
          :loading="manufacturerLoading"
          :disabled="isEdit"
          placeholder="厂家，可直接新增, 按回车确认"
          style="width: 100%"
        >
          <el-option
            v-for="opt in manufacturerOptions"
            :key="opt.id ?? opt.name"
            :label="opt.name"
            :value="opt.id ?? opt.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品" prop="product">
        <el-select
          v-model="form.product"
          filterable
          remote
          allow-create
          default-first-option
          reserve-keyword
          :remote-method="handleProductSearch"
          :loading="productLoading"
          :disabled="isEdit"
          placeholder="产品，可直接输入按回车新增"
          style="width: 100%"
        >
          <el-option
            v-for="opt in productOptions"
            :key="opt.id ?? opt.name"
            :label="opt.name"
            :value="opt.id ?? opt.name"
          />
          <template #empty>
            <span>未搜索到结果，可按回车直接新增</span>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="货号">
        <el-input
          v-model="form.modelNo"
          :disabled="isEdit"
          placeholder="选填，如：14308"
        />
      </el-form-item>
      <el-form-item label="购买时间">
        <el-date-picker
          v-model="form.purchasedAt"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选填"
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
      <el-form-item label="堆积位置">
        <el-input
          v-model="form.location"
          placeholder="选填，如：书房书架第一层"
        />
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
        <el-input
          v-model="form.notes"
          type="textarea"
          :rows="3"
          placeholder="选填"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <div class="footer-left">
          <el-button
            v-if="isEdit"
            type="danger"
            class="delete-btn"
            @click="handleDelete"
          >
            删除
          </el-button>
        </div>
        <div class="footer-right">
          <el-button
            v-if="!isEdit"
            type="primary"
            plain
            @click="handleSaveAndNext"
          >
            保存并新增下一盒
          </el-button>
          <el-button type="primary" @click="handleSave">
            {{ isEdit ? "保存" : "保存并关闭" }}
          </el-button>
          <el-button @click="visible = false">取消</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.stack-form-dialog {
  max-width: calc(100vw - 24px);
}

.stack-form-dialog .dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
}

.stack-form-dialog .footer-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
