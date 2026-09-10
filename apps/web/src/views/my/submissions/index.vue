<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reviewStatusLabels, reviewStatusTagTypes } from '@model-stacker/components';
import { ReviewStatus } from '@model-stacker/data';
import type { ManufacturerSubmission, ProductSubmission } from '@model-stacker/data';
import { listMyManufacturerSubmissions, listMyProductSubmissions } from '@/api/submission';
import ManufacturerForm from './manufacturer-form.vue';
import ProductForm from './product-form.vue';

const activeTab = ref<'manufacturer' | 'product'>('manufacturer');

const mfFormVisible = ref(false);
const pdFormVisible = ref(false);

const mfLoading = ref(false);
const mfItems = ref<ManufacturerSubmission[]>([]);
const mfTotal = ref(0);

const pdLoading = ref(false);
const pdItems = ref<ProductSubmission[]>([]);
const pdTotal = ref(0);

const STATUS_FILTERS: Array<{ value: ReviewStatus | undefined; label: string }> = [
  { value: undefined, label: '全部' },
  { value: ReviewStatus.PENDING, label: '待审核' },
  { value: ReviewStatus.APPROVED, label: '已通过' },
  { value: ReviewStatus.REJECTED, label: '已拒绝' },
];

const mfStatus = ref<ReviewStatus | undefined>(undefined);
const pdStatus = ref<ReviewStatus | undefined>(undefined);

async function loadManufacturers() {
  mfLoading.value = true;
  try {
    const res = await listMyManufacturerSubmissions({ reviewStatus: mfStatus.value });
    mfItems.value = res.items;
    mfTotal.value = res.total;
  } finally {
    mfLoading.value = false;
  }
}

async function loadProducts() {
  pdLoading.value = true;
  try {
    const res = await listMyProductSubmissions({ reviewStatus: pdStatus.value });
    pdItems.value = res.items;
    pdTotal.value = res.total;
  } finally {
    pdLoading.value = false;
  }
}

function refresh() {
  loadManufacturers();
  loadProducts();
}

onMounted(refresh);
</script>

<template>
  <section class="submission-page">
    <div class="page-toolbar">
      <el-button v-if="activeTab === 'manufacturer'" type="primary" @click="mfFormVisible = true">
        提交厂家
      </el-button>
      <el-button v-else type="primary" @click="pdFormVisible = true">
        提交产品
      </el-button>
    </div>

    <el-radio-group v-model="activeTab" size="large" class="tab-bar">
      <el-radio-button value="manufacturer">厂家提交</el-radio-button>
      <el-radio-button value="product">产品提交</el-radio-button>
    </el-radio-group>

    <div v-if="activeTab === 'manufacturer'" class="filter-bar">
      <el-radio-group v-model="mfStatus" size="default" @change="loadManufacturers">
        <el-radio-button v-for="f in STATUS_FILTERS" :key="f.label" :value="f.value">
          {{ f.label }}
        </el-radio-button>
      </el-radio-group>
      <span class="total-text">共 {{ mfTotal }} 条</span>
    </div>
    <div v-else class="filter-bar">
      <el-radio-group v-model="pdStatus" size="default" @change="loadProducts">
        <el-radio-button v-for="f in STATUS_FILTERS" :key="f.label" :value="f.value">
          {{ f.label }}
        </el-radio-button>
      </el-radio-group>
      <span class="total-text">共 {{ pdTotal }} 条</span>
    </div>

    <el-table
      v-if="activeTab === 'manufacturer'"
      v-loading="mfLoading"
      :data="mfItems"
      empty-text="暂无厂家提交记录"
    >
      <el-table-column prop="name" label="厂家名" min-width="120" />
      <el-table-column prop="fullName" label="全称" min-width="150" show-overflow-tooltip />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="reviewStatusTagTypes[row.reviewStatus as ReviewStatus]" size="small">
            {{ reviewStatusLabels[row.reviewStatus as ReviewStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reviewNote" label="审核意见" min-width="150" show-overflow-tooltip />
    </el-table>

    <el-table
      v-else
      v-loading="pdLoading"
      :data="pdItems"
      empty-text="暂无产品提交记录"
    >
      <el-table-column prop="name" label="产品名" min-width="140" />
      <el-table-column prop="manufacturerName" label="厂家" min-width="110" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="reviewStatusTagTypes[row.reviewStatus as ReviewStatus]" size="small">
            {{ reviewStatusLabels[row.reviewStatus as ReviewStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reviewNote" label="审核意见" min-width="150" show-overflow-tooltip />
    </el-table>

    <ManufacturerForm v-model="mfFormVisible" @submitted="loadManufacturers" />
    <ProductForm v-model="pdFormVisible" @submitted="loadProducts" />
  </section>
</template>

<style scoped>
.submission-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-toolbar {
  display: flex;
  justify-content: flex-end;
}

.tab-bar {
  display: flex;
}

.tab-bar :deep(.el-radio-button__inner) {
  flex: 1;
  width: 100%;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.total-text {
  font-size: 13px;
  color: var(--app-text-secondary, #888);
}
</style>
