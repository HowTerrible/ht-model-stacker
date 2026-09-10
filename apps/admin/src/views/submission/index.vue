<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reviewStatusLabels, reviewStatusTagTypes } from '@model-stacker/components';
import { ReviewStatus } from '@model-stacker/data';
import type { ManufacturerSubmission, ProductSubmission } from '@model-stacker/data';
import {
  approveManufacturerSubmission,
  approveProductSubmission,
  listManufacturerSubmissions,
  listProductSubmissions,
  rejectManufacturerSubmission,
  rejectProductSubmission,
} from '@/api/submission';

const activeTab = ref<'manufacturer' | 'product'>('manufacturer');

const mfLoading = ref(false);
const mfItems = ref<ManufacturerSubmission[]>([]);
const mfTotal = ref(0);

const pdLoading = ref(false);
const pdItems = ref<ProductSubmission[]>([]);
const pdTotal = ref(0);

const STATUS_FILTERS: Array<{ value: ReviewStatus | undefined; label: string }> = [
  { value: ReviewStatus.PENDING, label: '待审核' },
  { value: ReviewStatus.APPROVED, label: '已通过' },
  { value: ReviewStatus.REJECTED, label: '已拒绝' },
  { value: undefined, label: '全部' },
];

const filter = reactive<{ mf: ReviewStatus | undefined; pd: ReviewStatus | undefined }>({
  mf: ReviewStatus.PENDING,
  pd: ReviewStatus.PENDING,
});

async function loadManufacturers() {
  mfLoading.value = true;
  try {
    const res = await listManufacturerSubmissions({ reviewStatus: filter.mf, pageSize: 100 });
    mfItems.value = res.items;
    mfTotal.value = res.total;
  } finally {
    mfLoading.value = false;
  }
}

async function loadProducts() {
  pdLoading.value = true;
  try {
    const res = await listProductSubmissions({ reviewStatus: filter.pd, pageSize: 100 });
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

async function approveMf(id: number) {
  try {
    await ElMessageBox.confirm('通过后该厂家将合并进资料库，确定通过？', '通过确认', {
      confirmButtonText: '通过',
      cancelButtonText: '取消',
      type: 'success',
    });
  } catch {
    return;
  }
  try {
    await approveManufacturerSubmission(id);
    ElMessage.success('已通过');
    loadManufacturers();
  } catch (e) {
    ElMessage.error((e as Error).message);
  }
}

async function rejectMf(id: number) {
  try {
    const { value } = await ElMessageBox.prompt('请输入拒绝原因', '拒绝提交', {
      confirmButtonText: '拒绝',
      cancelButtonText: '取消',
      inputPlaceholder: '选填，会反馈给提交用户',
    });
    await rejectManufacturerSubmission(id, value ?? '');
    ElMessage.success('已拒绝');
    loadManufacturers();
  } catch (e) {
    if (e === 'cancel' || e === 'close') return;
    ElMessage.error((e as Error).message);
  }
}

async function approvePd(id: number) {
  try {
    await ElMessageBox.confirm('通过后该产品将合并进资料库，确定通过？', '通过确认', {
      confirmButtonText: '通过',
      cancelButtonText: '取消',
      type: 'success',
    });
  } catch {
    return;
  }
  try {
    await approveProductSubmission(id);
    ElMessage.success('已通过');
    loadProducts();
  } catch (e) {
    ElMessage.error((e as Error).message);
  }
}

async function rejectPd(id: number) {
  try {
    const { value } = await ElMessageBox.prompt('请输入拒绝原因', '拒绝提交', {
      confirmButtonText: '拒绝',
      cancelButtonText: '取消',
      inputPlaceholder: '选填，会反馈给提交用户',
    });
    await rejectProductSubmission(id, value ?? '');
    ElMessage.success('已拒绝');
    loadProducts();
  } catch (e) {
    if (e === 'cancel' || e === 'close') return;
    ElMessage.error((e as Error).message);
  }
}
</script>

<template>
  <div class="page">
    <h2>提交审核</h2>
    <el-tabs v-model="activeTab" @tab-change="refresh">
      <el-tab-pane label="厂家提交" name="manufacturer">
        <div class="filter-bar">
          <el-radio-group v-model="filter.mf" @change="loadManufacturers">
            <el-radio-button v-for="f in STATUS_FILTERS" :key="f.label" :value="f.value">
              {{ f.label }}
            </el-radio-button>
          </el-radio-group>
          <span class="total-text">共 {{ mfTotal }} 条</span>
        </div>

        <el-table v-loading="mfLoading" :data="mfItems" empty-text="暂无厂家提交">
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column prop="userId" label="提交人ID" width="100" />
          <el-table-column prop="name" label="厂家名" min-width="120" />
          <el-table-column prop="fullName" label="全称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="country" label="国家" width="90" />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="reviewStatusTagTypes[row.reviewStatus as ReviewStatus]" size="small">
                {{ reviewStatusLabels[row.reviewStatus as ReviewStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="row.reviewStatus === 'PENDING'"
                type="success"
                size="small"
                @click="approveMf(row.id)"
              >
                通过
              </el-button>
              <el-button
                v-if="row.reviewStatus === 'PENDING'"
                type="danger"
                size="small"
                @click="rejectMf(row.id)"
              >
                拒绝
              </el-button>
              <span v-else class="idle-text">已处理</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="产品提交" name="product">
        <div class="filter-bar">
          <el-radio-group v-model="filter.pd" @change="loadProducts">
            <el-radio-button v-for="f in STATUS_FILTERS" :key="f.label" :value="f.value">
              {{ f.label }}
            </el-radio-button>
          </el-radio-group>
          <span class="total-text">共 {{ pdTotal }} 条</span>
        </div>

        <el-table v-loading="pdLoading" :data="pdItems" empty-text="暂无产品提交">
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column prop="userId" label="提交人ID" width="100" />
          <el-table-column prop="name" label="产品名" min-width="140" />
          <el-table-column prop="manufacturerName" label="厂家" min-width="110" />
          <el-table-column prop="kind" label="种类" width="90" />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="reviewStatusTagTypes[row.reviewStatus as ReviewStatus]" size="small">
                {{ reviewStatusLabels[row.reviewStatus as ReviewStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="row.reviewStatus === 'PENDING'"
                type="success"
                size="small"
                @click="approvePd(row.id)"
              >
                通过
              </el-button>
              <el-button
                v-if="row.reviewStatus === 'PENDING'"
                type="danger"
                size="small"
                @click="rejectPd(row.id)"
              >
                拒绝
              </el-button>
              <span v-else class="idle-text">已处理</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.total-text {
  font-size: 13px;
  color: #888;
}

.idle-text {
  color: #aaa;
  font-size: 13px;
}
</style>
