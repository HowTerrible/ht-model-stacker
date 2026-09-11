<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  CurrencyEnum,
  ProductKindEnum,
  PurchaseChannelEnum,
  StackStatusEnum,
} from "@model-stacker/data";
import type { Stack } from "@model-stacker/data";
import { getStacks, deleteStack } from "@/api/stack";
import StackForm from "../components/stack-form.vue";
import {
  channelLabels,
  channelOptions,
  currencySymbols,
  statusLabels,
  statusOptions,
  statusTagTypes,
} from "../components/options";

type ViewMode = "list" | "grid";
type KindScope = "ALL" | ProductKindEnum;

const viewMode = ref<ViewMode>("list");
const keyword = ref("");
const kindScope = ref<KindScope>("ALL");
const loading = ref(false);

/** 更多筛选条件：状态 / 渠道 / 购买时间范围 */
const filterStatuses = ref<StackStatusEnum[]>([]);
const filterChannels = ref<PurchaseChannelEnum[]>([]);
const purchaseRange = ref<[string, string] | null>(null);

/** 折叠面板展开状态 */
const moreExpanded = ref<string[]>([]);

const page = ref(1);
const pageSize = ref(20);
const totalCount = ref(0);
const list = ref<Stack[]>([]);

function resetMoreFilters() {
  filterStatuses.value = [];
  filterChannels.value = [];
  purchaseRange.value = null;
}

watch([kindScope, filterStatuses, filterChannels, purchaseRange], () => {
  page.value = 1;
});

// ---------------------------------------------------------------------------
// 后端分页查询
// ---------------------------------------------------------------------------

async function fetchList() {
  loading.value = true;
  try {
    const res = await getStacks({
      keyword: keyword.value || undefined,
      status: filterStatuses.value.length === 1 ? filterStatuses.value[0] : undefined,
      startDate: purchaseRange.value?.[0] || undefined,
      endDate: purchaseRange.value?.[1] || undefined,
      page: page.value,
      pageSize: pageSize.value,
    });
    list.value = res.items;
    totalCount.value = res.total;
  } catch (e) {
    ElMessage.error((e as Error).message || "加载失败");
  } finally {
    loading.value = false;
  }
}

/**
 * 前端二次过滤：种类 / 渠道。
 * 种类仅能按「已关联资料库产品」的 kind 判断（未关联的自由文本无种类，
 * 只出现在「全部」下）；渠道为精确匹配。
 */
const filteredList = computed(() => {
  let result = list.value;

  if (kindScope.value !== "ALL") {
    result = result.filter((item) => item.kind === kindScope.value);
  }

  if (filterChannels.value.length) {
    const channels = filterChannels.value;
    result = result.filter((item) => !!item.channel && channels.includes(item.channel));
  }

  return result;
});

function handleSearch() {
  page.value = 1;
  fetchList();
}

watch(page, () => fetchList());

onMounted(() => fetchList());

// ---------------------------------------------------------------------------
// 新增 / 编辑
// ---------------------------------------------------------------------------

const formVisible = ref(false);
const editingStackId = ref<number | undefined>(undefined);

function openCreate() {
  editingStackId.value = undefined;
  formVisible.value = true;
}

function openEdit(stack: Stack) {
  editingStackId.value = stack.id;
  formVisible.value = true;
}

function handleSaved() {
  fetchList();
}

function handleDeleted() {
  fetchList();
}

// ---------------------------------------------------------------------------
// 删除
// ---------------------------------------------------------------------------

async function handleDelete(stack: Stack) {
  try {
    await ElMessageBox.confirm(
      `确定删除堆积「${stack.itemName ?? "未命名"}」？删除后不可恢复。`,
      "删除确认",
      { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" },
    );
  } catch {
    return;
  }
  await deleteStack(stack.id);
  ElMessage.success("删除成功");
  fetchList();
}

// ---------------------------------------------------------------------------
// 展示
// ---------------------------------------------------------------------------

function displayName(item: Stack): string {
  return item.itemName ?? "未命名";
}

function priceText(item: Stack): string {
  if (item.purchasePrice == null) return "--";
  return `${currencySymbols[item.currency] ?? ""}${item.purchasePrice.toFixed(2)}`;
}

function dateText(item: Stack): string {
  return item.purchasedAt ?? "--";
}
</script>

<template>
  <section class="stack-page">
    <header class="list-header">
      <div class="search-row">
        <el-input
          v-model="keyword"
          placeholder="搜索产品名称 / 备注"
          clearable
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <div class="filter-row">
        <div class="scope-group">
          <el-radio-group v-model="kindScope">
            <el-radio-button value="ALL">全部</el-radio-button>
            <el-radio-button :value="ProductKindEnum.MODEL">仅模型</el-radio-button>
            <el-radio-button :value="ProductKindEnum.TOOL_SUPPLY">仅工具辅料</el-radio-button>
          </el-radio-group>
        </div>

        <el-radio-group v-model="viewMode">
          <el-radio-button value="list">通栏</el-radio-button>
          <el-radio-button value="grid">网格</el-radio-button>
        </el-radio-group>

        <el-collapse v-model="moreExpanded" class="more-filter">
          <el-collapse-item name="more" title="更多筛选">
            <div class="more-filter-body">
              <el-select
                v-model="filterStatuses"
                multiple
                collapse-tags
                collapse-tags-tooltip
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="o in statusOptions"
                  :key="o.value"
                  :label="o.label"
                  :value="o.value"
                />
              </el-select>

              <el-select
                v-model="filterChannels"
                multiple
                collapse-tags
                collapse-tags-tooltip
                clearable
                placeholder="渠道"
              >
                <el-option
                  v-for="o in channelOptions"
                  :key="o.value"
                  :label="o.label"
                  :value="o.value"
                />
              </el-select>

              <el-date-picker
                v-model="purchaseRange"
                type="daterange"
                value-format="YYYY-MM-DD"
                start-placeholder="购买开始"
                end-placeholder="购买结束"
              />

              <el-button @click="resetMoreFilters">清空</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </header>

    <div v-loading="loading">
      <div v-if="filteredList.length" class="card-list" :class="viewMode">
        <template v-if="viewMode === 'list'">
          <article
            v-for="item in filteredList"
            :key="item.id"
            class="stack-card row"
            @click="openEdit(item)"
          >
            <div class="row-info">
              <div class="card-head">
                <h4 class="name">{{ displayName(item) }}</h4>
                <el-tag size="small" :type="statusTagTypes[item.status]">
                  {{ statusLabels[item.status] }}
                </el-tag>
              </div>
              <p class="meta">
                {{ dateText(item) }}
                <span v-if="item.channel"> · {{ channelLabels[item.channel] }}</span>
                <span v-if="item.modelNo"> · 货号：{{ item.modelNo }}</span>
                <span v-if="item.notes"> · {{ item.notes }}</span>
              </p>
            </div>
            <div class="row-actions">
              <span class="price">{{ priceText(item) }}</span>
              <el-button
                type="danger"
                size="small"
                text
                @click.stop="handleDelete(item)"
              >
                删除
              </el-button>
            </div>
          </article>
        </template>

        <template v-else>
          <article
            v-for="item in filteredList"
            :key="item.id"
            class="stack-card col"
            @click="openEdit(item)"
          >
            <div class="card-head">
              <h4 class="name">{{ displayName(item) }}</h4>
            </div>
            <div class="tags">
              <el-tag size="small" :type="statusTagTypes[item.status]">
                {{ statusLabels[item.status] }}
              </el-tag>
            </div>
            <p class="meta">
              {{ dateText(item) }}
              <span v-if="item.channel"> · {{ channelLabels[item.channel] }}</span>
            </p>
            <p v-if="item.notes" class="notes">{{ item.notes }}</p>
            <div class="col-footer">
              <span class="price">{{ priceText(item) }}</span>
              <el-button
                type="danger"
                size="small"
                text
                @click.stop="handleDelete(item)"
              >
                删除
              </el-button>
            </div>
          </article>
        </template>
      </div>

      <el-empty v-else description="暂无堆积记录" />
    </div>

    <footer class="page-footer">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="totalCount"
        layout="total, prev, pager, next"
        background
      />

      <div class="footer-actions">
        <el-button type="primary" @click="openCreate">新增堆积</el-button>
      </div>
    </footer>

    <el-button type="primary" class="fab-add" @click="openCreate">+</el-button>

    <StackForm
      v-model="formVisible"
      :stack-id="editingStackId"
      @saved="handleSaved"
      @deleted="handleDeleted"
    />
  </section>
</template>

<style scoped>
.stack-page {
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 12px;
  padding: 12px 12px 0;
  background: var(--app-surface-color, #fff);
}

.search-row {
  display: flex;
  gap: 8px;
}

.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.scope-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.more-filter {
  flex-basis: 100%;
  border-top: none;
  border-bottom: none;
}

.more-filter :deep(.el-collapse-item__header) {
  height: 28px;
  font-size: 13px;
  color: var(--app-text-secondary, #888);
  border-bottom: none;
}

.more-filter :deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

.more-filter-body {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 4px;
}

.more-filter-body .el-select {
  width: 180px;
}

.more-filter-body .el-date-editor {
  width: 260px;
}

.card-list.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-list.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 12px;
}

.stack-card {
  padding: 12px 14px;
  background: var(--app-surface-color, #fff);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.15s;
}

.stack-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stack-card.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.meta {
  margin-top: 4px;
  color: var(--app-text-secondary, #888);
  font-size: 12px;
}

.notes {
  margin-top: 4px;
  color: var(--app-text-secondary, #888);
  font-size: 12px;
}

.price {
  color: var(--app-text-color, #333);
  font-weight: 600;
  white-space: nowrap;
}

.row-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.col-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color-lighter, #ebeef5);
}

.fab-add {
  display: none;
}

@media (max-width: 767px) {
  .page-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .page-footer .el-pagination {
    justify-content: center;
  }

  .footer-actions {
    display: none;
  }

  .fab-add {
    display: block;
    position: fixed;
    right: 16px;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    z-index: 100;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}
</style>
