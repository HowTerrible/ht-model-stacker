<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  Currency,
  ProductKind,
  PurchaseChannel,
  StackStatus,
} from "@model-stacker/data";
import StackForm from "../components/stack-form.vue";
import {
  channelLabels,
  channelOptions,
  currencySymbols,
  kindLabels,
  kindTagTypes,
  statusLabels,
  statusOptions,
  statusTagTypes,
} from "../components/options";

/** 列表视图模式：list 通栏（卡片占满整行）/ grid 网格（一行多卡片） */
type ViewMode = "list" | "grid";

/** 产品种类筛选：全部 / 仅模型 / 仅工具辅料 */
type KindScope = "ALL" | ProductKind;

interface StackListItem {
  id: string;
  productName: string;
  kind: ProductKind;
  status: StackStatus;
  purchasedAt: string;
  purchasePrice?: number;
  currency: Currency;
  channel?: PurchaseChannel;
  notes?: string;
}

const viewMode = ref<ViewMode>("list");
const keyword = ref("");

/** 产品种类筛选：全部 / 仅模型 / 仅工具辅料 */
const kindScope = ref<KindScope>("ALL");

/** 折叠面板展开状态 */
const moreExpanded = ref<string[]>([]);

/** 更多筛选条件：状态 / 渠道 / 购买时间范围 */
const filterStatuses = ref<StackStatus[]>([]);
const filterChannels = ref<PurchaseChannel[]>([]);
const purchaseRange = ref<[string, string] | null>(null);

watch([kindScope, filterStatuses, filterChannels, purchaseRange], () => {
  page.value = 1;
});

function resetMoreFilters() {
  filterStatuses.value = [];
  filterChannels.value = [];
  purchaseRange.value = null;
}

// TODO 待接入堆积分页查询接口，当前使用本地示例数据演示交互
const mockList: StackListItem[] = [
  {
    id: "s01",
    productName: "MG 沙扎比 Ver.Ka",
    kind: ProductKind.MODEL,
    status: StackStatus.IN_PROGRESS,
    purchasedAt: "2026-07-12",
    purchasePrice: 465,
    currency: Currency.CNY,
    channel: PurchaseChannel.TAOBAO,
    notes: "万代再版购入",
  },
  {
    id: "s02",
    productName: "RG 强袭自由高达",
    kind: ProductKind.MODEL,
    status: StackStatus.UNSTARTED,
    purchasedAt: "2026-08-01",
    purchasePrice: 210,
    currency: Currency.CNY,
    channel: PurchaseChannel.PDD,
  },
  {
    id: "s03",
    productName: "田宫薄刃剪钳 74123",
    kind: ProductKind.TOOL_SUPPLY,
    status: StackStatus.FINISHED,
    purchasedAt: "2026-06-18",
    purchasePrice: 138,
    currency: Currency.CNY,
    channel: PurchaseChannel.JD,
  },
  {
    id: "s04",
    productName: "郡士油性漆 消光白",
    kind: ProductKind.TOOL_SUPPLY,
    status: StackStatus.FINISHED,
    purchasedAt: "2026-06-20",
    purchasePrice: 22,
    currency: Currency.CNY,
    channel: PurchaseChannel.TAOBAO,
  },
  {
    id: "s05",
    productName: "HG 高机动扎古 Team Monstre Custom",
    kind: ProductKind.MODEL,
    status: StackStatus.WIP,
    purchasedAt: "2026-05-02",
    purchasePrice: 95,
    currency: Currency.CNY,
    channel: PurchaseChannel.XIANYU,
    notes: "已转烂尾记录",
  },
  {
    id: "s06",
    productName: "RG 沙扎比",
    kind: ProductKind.MODEL,
    status: StackStatus.UNSTARTED,
    purchasedAt: "2026-08-10",
    purchasePrice: 268,
    currency: Currency.CNY,
    channel: PurchaseChannel.TAOBAO,
    notes: "预售等待发货",
  },
  {
    id: "s07",
    productName: "GSI 水性漆套装 12 色",
    kind: ProductKind.TOOL_SUPPLY,
    status: StackStatus.IN_PROGRESS,
    purchasedAt: "2026-07-28",
    purchasePrice: 168,
    currency: Currency.CNY,
    channel: PurchaseChannel.JD,
  },
  {
    id: "s08",
    productName: "M.S.G 重武装套件",
    kind: ProductKind.MODEL,
    status: StackStatus.SOLD,
    purchasedAt: "2026-04-15",
    purchasePrice: 3200,
    currency: Currency.JPY,
    channel: PurchaseChannel.OVERSEAS,
    notes: "已转让出坑",
  },
  {
    id: "s09",
    productName: "水口刀 + 打磨海绵组合",
    kind: ProductKind.TOOL_SUPPLY,
    status: StackStatus.FINISHED,
    purchasedAt: "2026-05-30",
    purchasePrice: 45.5,
    currency: Currency.CNY,
    channel: PurchaseChannel.PDD,
  },
  {
    id: "s10",
    productName: "MG 主天使高达",
    kind: ProductKind.MODEL,
    status: StackStatus.FINISHED,
    purchasedAt: "2026-03-21",
    purchasePrice: 235,
    currency: Currency.CNY,
    channel: PurchaseChannel.OFFLINE,
    notes: "店庆购入",
  },
  {
    id: "s11",
    productName: "喷笔 + 龟泵套装",
    kind: ProductKind.TOOL_SUPPLY,
    status: StackStatus.UNSTARTED,
    purchasedAt: "2026-07-05",
    purchasePrice: 520,
    currency: Currency.HKD,
    channel: PurchaseChannel.OVERSEAS,
  },
  {
    id: "s12",
    productName: "HG 苍白骑士 D型",
    kind: ProductKind.MODEL,
    status: StackStatus.UNSTARTED,
    purchasedAt: "2026-08-18",
    purchasePrice: 120,
    currency: Currency.CNY,
    channel: PurchaseChannel.XIANYU,
    notes: "二手几乎全新",
  },
];

const page = ref(1);
const pageSize = ref(10);

/** 关键字 + 种类 + 更多条件过滤后的全量结果 */
const filteredList = computed(() => {
  let list = mockList;
  if (kindScope.value !== "ALL") {
    list = list.filter((item) => item.kind === kindScope.value);
  }
  if (filterStatuses.value.length) {
    const statuses = filterStatuses.value;
    list = list.filter((item) => statuses.includes(item.status));
  }
  if (filterChannels.value.length) {
    const channels = filterChannels.value;
    list = list.filter(
      (item) => !!item.channel && channels.includes(item.channel),
    );
  }
  // purchasedAt 为 YYYY-MM-DD 格式，字符串比较即为时间先后
  const [dateFrom, dateTo] = purchaseRange.value ?? [];
  if (dateFrom) {
    list = list.filter((item) => item.purchasedAt >= dateFrom);
  }
  if (dateTo) {
    list = list.filter((item) => item.purchasedAt <= dateTo);
  }
  const kw = keyword.value.trim().toLowerCase();
  if (kw) {
    list = list.filter((item) =>
      `${item.productName} ${item.notes ?? ""}`.toLowerCase().includes(kw),
    );
  }
  return list;
});

const total = computed(() => filteredList.value.length);

watch(total, (value) => {
  const maxPage = Math.max(1, Math.ceil(value / pageSize.value));
  if (page.value > maxPage) page.value = 1;
});

const pagedList = computed(() =>
  filteredList.value.slice(
    (page.value - 1) * pageSize.value,
    page.value * pageSize.value,
  ),
);

function handleSearch() {
  page.value = 1;
}

const formVisible = ref(false);

function handleSaved() {
  handleSearch();
}

function priceText(item: StackListItem): string {
  if (item.purchasePrice == null) return "--";
  return `${currencySymbols[item.currency]}${item.purchasePrice.toFixed(2)}`;
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
            <el-radio-button :value="ProductKind.MODEL">仅模型</el-radio-button>
            <el-radio-button :value="ProductKind.TOOL_SUPPLY"
              >仅工具辅料</el-radio-button
            >
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

    <div v-if="pagedList.length" class="card-list" :class="viewMode">
      <template v-if="viewMode === 'list'">
        <article
          v-for="item in pagedList"
          :key="item.id"
          class="stack-card row"
        >
          <div class="row-info">
            <div class="card-head">
              <h4 class="name">{{ item.productName }}</h4>
              <el-tag size="small" :type="kindTagTypes[item.kind]">
                {{ kindLabels[item.kind] }}
              </el-tag>
              <el-tag size="small" :type="statusTagTypes[item.status]">
                {{ statusLabels[item.status] }}
              </el-tag>
            </div>
            <p class="meta">
              {{ item.purchasedAt }}
              <span v-if="item.channel">
                · {{ channelLabels[item.channel] }}</span
              >
              <span v-if="item.notes"> · {{ item.notes }}</span>
            </p>
          </div>
          <span class="price">{{ priceText(item) }}</span>
        </article>
      </template>

      <template v-else>
        <article
          v-for="item in pagedList"
          :key="item.id"
          class="stack-card col"
        >
          <div class="card-head">
            <h4 class="name">{{ item.productName }}</h4>
          </div>
          <div class="tags">
            <el-tag size="small" :type="kindTagTypes[item.kind]">
              {{ kindLabels[item.kind] }}
            </el-tag>
            <el-tag size="small" :type="statusTagTypes[item.status]">
              {{ statusLabels[item.status] }}
            </el-tag>
          </div>
          <p class="meta">
            {{ item.purchasedAt }}
            <span v-if="item.channel">
              · {{ channelLabels[item.channel] }}</span
            >
          </p>
          <p v-if="item.notes" class="notes">{{ item.notes }}</p>
          <span class="price">{{ priceText(item) }}</span>
        </article>
      </template>
    </div>

    <el-empty v-else description="暂无堆积记录" />

    <footer class="page-footer">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next"
        background
      />

      <div class="footer-actions">
        <el-button type="primary" @click="formVisible = true"
          >新增堆积</el-button
        >
      </div>
    </footer>

    <!-- 移动端：悬浮于右下角的新增按钮 -->
    <el-button type="primary" class="fab-add" @click="formVisible = true">
      +
    </el-button>

    <StackForm v-model="formVisible" @saved="handleSaved" />
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

.stack-card.col .price {
  display: block;
  margin-top: 8px;
  text-align: right;
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

/* 移动端悬浮新增按钮，桌面端隐藏 */
.fab-add {
  display: none;
}

/* 移动端保持分页（不使用下拉加载），footer 改纵向排布，新增按钮改为右下角悬浮 */
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
