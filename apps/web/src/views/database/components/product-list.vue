<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  ModelType,
  ProductKind,
  ProductStatus,
  ToolType,
} from "@model-stacker/data";
import {
  kindLabels,
  kindOptions,
  kindTagTypes,
  modelTypeLabels,
  modelTypeOptions,
  statusOptions,
  statusTagTypes,
  toolTypeLabels,
  toolTypeOptions,
} from "../options";
import ProductItem from "./product-item.vue";

type ViewMode = "list" | "grid";

interface ProductListItem {
  id: string;
  productName: string;
  officialName?: string;
  modelNo?: string;
  manufacturerName: string;
  kind: ProductKind;
  modelTypes?: ModelType[];
  toolType?: ToolType;
  scale?: string;
  status: ProductStatus;
}

const viewMode = ref<ViewMode>("list");
const keyword = ref("");

/** 产品种类筛选（多选） */
const filterKinds = ref<ProductKind[]>([]);

/** 型号/工具子类筛选（多选） */
const filterModelTypes = ref<ModelType[]>([]);
const filterToolTypes = ref<ToolType[]>([]);

/** 折叠面板展开状态 */
const moreExpanded = ref<string[]>([]);

/** 更多筛选条件 */
const filterManufacturers = ref<string[]>([]);
const filterStatuses = ref<ProductStatus[]>([]);

const allManufacturerNames = [
  "万代 Bandai",
  "田宫 Tamiya",
  "长谷川 Hasegawa",
  "富士美 Fujimi",
  "威龙 Dragon",
  "小号手 Trumpeter",
  "MENG",
  "长城 GreatWall",
  "GSI 郡士",
  "Mr. Hobby",
];

watch(
  [filterKinds, filterModelTypes, filterToolTypes, filterManufacturers, filterStatuses],
  () => {
    page.value = 1;
  },
);

function resetMoreFilters() {
  filterManufacturers.value = [];
  filterStatuses.value = [];
}

function clearAllFilters() {
  keyword.value = "";
  filterKinds.value = [];
  filterModelTypes.value = [];
  filterToolTypes.value = [];
  resetMoreFilters();
}

/** 当 kinds 变化时，清空不相关的子类选择 */
watch(filterKinds, (kinds) => {
  if (!kinds.includes(ProductKind.MODEL)) {
    filterModelTypes.value = [];
  }
  if (!kinds.includes(ProductKind.TOOL_SUPPLY)) {
    filterToolTypes.value = [];
  }
});

const showModelTypes = computed(() =>
  filterKinds.value.length === 0 ||
  filterKinds.value.includes(ProductKind.MODEL),
);

const showToolTypes = computed(() =>
  filterKinds.value.length === 0 ||
  filterKinds.value.includes(ProductKind.TOOL_SUPPLY),
);

// TODO 待接入资料库分页查询接口，当前使用本地示例数据演示交互
const mockList: ProductListItem[] = [
  {
    id: "p01",
    productName: "MG 沙扎比 Ver.Ka",
    officialName: "MSN-04 SAZABI Ver.Ka",
    modelNo: "MG 1/100",
    manufacturerName: "万代 Bandai",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_TANK],
    scale: "1/100",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p02",
    productName: "RG 强袭自由高达",
    officialName: "ZGMF-X20A STRIKE FREEDOM GUNDAM",
    modelNo: "RG 1/144",
    manufacturerName: "万代 Bandai",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_AIRCRAFT],
    scale: "1/144",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p03",
    productName: "田宫薄刃剪钳 74123",
    modelNo: "74123",
    manufacturerName: "田宫 Tamiya",
    kind: ProductKind.TOOL_SUPPLY,
    toolType: ToolType.TOOL,
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p04",
    productName: "郡士油性漆 消光白",
    modelNo: "B-514",
    manufacturerName: "GSI 郡士",
    kind: ProductKind.TOOL_SUPPLY,
    toolType: ToolType.PAINT,
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p05",
    productName: "HG 高机动扎古",
    officialName: "MS-06F ZAKU II",
    modelNo: "HG 1/144",
    manufacturerName: "万代 Bandai",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_TANK],
    scale: "1/144",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p06",
    productName: "1/35 豹2A6 主战坦克",
    officialName: "Leopard 2A6",
    modelNo: "6383",
    manufacturerName: "田宫 Tamiya",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_TANK],
    scale: "1/35",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p07",
    productName: "GSI 水性漆套装 12 色",
    modelNo: "GS-12SET",
    manufacturerName: "GSI 郡士",
    kind: ProductKind.TOOL_SUPPLY,
    toolType: ToolType.PAINT,
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p08",
    productName: "M.S.G 重武装套件",
    modelNo: "M.S.G HW-001",
    manufacturerName: "寿屋 KOTOBUKIYA",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.UPGRADE_SET],
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p09",
    productName: "郡士渗线液 4 色套装",
    modelNo: "B-604",
    manufacturerName: "GSI 郡士",
    kind: ProductKind.TOOL_SUPPLY,
    toolType: ToolType.PAINT,
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p10",
    productName: "MG 主天使高达",
    officialName: "GF13-001NHII MOTHER GUNDAM",
    modelNo: "MG 1/100",
    manufacturerName: "万代 Bandai",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_AIRCRAFT],
    scale: "1/100",
    status: ProductStatus.DISCONTINUED,
  },
  {
    id: "p11",
    productName: "喷笔 + 龟泵套装",
    modelNo: "HP-100",
    manufacturerName: "Mr. Hobby",
    kind: ProductKind.TOOL_SUPPLY,
    toolType: ToolType.TOOL,
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p12",
    productName: "1/72 P-51D 野马战斗机",
    officialName: "P-51D Mustang",
    modelNo: "61103",
    manufacturerName: "长城 GreatWall",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_AIRCRAFT],
    scale: "1/72",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p13",
    productName: "MG 自由高达 Ver.2.0",
    officialName: "ZGMF-X10A FREEDOM GUNDAM",
    modelNo: "MG 1/100",
    manufacturerName: "万代 Bandai",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_AIRCRAFT],
    scale: "1/100",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p14",
    productName: "MENG 虎式坦克 Early Production",
    officialName: "Sd.Kfz.181 Tiger I",
    modelNo: "PS-002",
    manufacturerName: "MENG",
    kind: ProductKind.MODEL,
    modelTypes: [ModelType.MILITARY_TANK],
    scale: "1/35",
    status: ProductStatus.ON_SALE,
  },
  {
    id: "p15",
    productName: "AK 旧化土套装",
    modelNo: "AK-2092",
    manufacturerName: "AK Interactive",
    kind: ProductKind.TOOL_SUPPLY,
    toolType: ToolType.ACCESSORY,
    status: ProductStatus.ON_SALE,
  },
];

const page = ref(1);
const pageSize = ref(10);

const filteredList = computed(() => {
  let list = mockList;

  if (filterKinds.value.length) {
    const kinds = filterKinds.value;
    list = list.filter((item) => kinds.includes(item.kind));
  }

  if (filterModelTypes.value.length) {
    const types = filterModelTypes.value;
    list = list.filter(
      (item) =>
        item.kind === ProductKind.MODEL &&
        (item.modelTypes ?? []).some((t) => types.includes(t)),
    );
  }

  if (filterToolTypes.value.length) {
    const types = filterToolTypes.value;
    list = list.filter(
      (item) =>
        item.kind === ProductKind.TOOL_SUPPLY &&
        item.toolType != null &&
        types.includes(item.toolType),
    );
  }

  if (filterManufacturers.value.length) {
    const mfrs = filterManufacturers.value;
    list = list.filter((item) => mfrs.includes(item.manufacturerName));
  }

  if (filterStatuses.value.length) {
    const statuses = filterStatuses.value;
    list = list.filter((item) => statuses.includes(item.status));
  }

  const kw = keyword.value.trim().toLowerCase();
  if (kw) {
    list = list.filter((item) =>
      [
        item.productName,
        item.officialName ?? "",
        item.modelNo ?? "",
        item.manufacturerName,
        ...(item.modelTypes ?? []).map((t) => modelTypeLabels[t] ?? ""),
        item.toolType ? (toolTypeLabels[item.toolType] ?? "") : "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(kw),
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

function handleItemClick(item: ProductListItem) {
  // TODO 对接详情弹窗
  console.log("product item click", item.id);
}

const hasActiveFilters = computed(
  () =>
    filterKinds.value.length > 0 ||
    filterModelTypes.value.length > 0 ||
    filterToolTypes.value.length > 0 ||
    filterManufacturers.value.length > 0 ||
    filterStatuses.value.length > 0,
);
</script>

<template>
  <section class="product-list-page">
    <header class="list-header">
      <div class="search-row">
        <el-input
          v-model="keyword"
          placeholder="搜索模型/厂家/工具名称、货号"
          clearable
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <div class="filter-row">
        <div class="scope-group">
          <span class="group-label">种类</span>
          <el-checkbox-group v-model="filterKinds">
            <el-checkbox-button
              v-for="o in kindOptions"
              :key="o.value"
              :value="o.value"
            >
              {{ o.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>

        <div v-if="showModelTypes" class="scope-group">
          <span class="group-label">模型</span>
          <el-checkbox-group v-model="filterModelTypes">
            <el-checkbox-button
              v-for="o in modelTypeOptions"
              :key="o.value"
              :value="o.value"
            >
              {{ o.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>

        <div v-if="showToolTypes" class="scope-group">
          <span class="group-label">工具</span>
          <el-checkbox-group v-model="filterToolTypes">
            <el-checkbox-button
              v-for="o in toolTypeOptions"
              :key="o.value"
              :value="o.value"
            >
              {{ o.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>

        <el-radio-group v-model="viewMode">
          <el-radio-button value="list">通栏</el-radio-button>
          <el-radio-button value="grid">网格</el-radio-button>
        </el-radio-group>
      </div>

      <div class="filter-row">
        <el-collapse v-model="moreExpanded" class="more-filter">
          <el-collapse-item name="more" title="更多筛选">
            <div class="more-filter-body">
              <el-select
                v-model="filterManufacturers"
                multiple
                collapse-tags
                collapse-tags-tooltip
                clearable
                placeholder="厂家"
              >
                <el-option
                  v-for="name in allManufacturerNames"
                  :key="name"
                  :label="name"
                  :value="name"
                />
              </el-select>

              <el-select
                v-model="filterStatuses"
                multiple
                collapse-tags
                collapse-tags-tooltip
                clearable
                placeholder="产品状态"
              >
                <el-option
                  v-for="o in statusOptions"
                  :key="o.value"
                  :label="o.label"
                  :value="o.value"
                />
              </el-select>

              <el-button @click="resetMoreFilters">清空</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>

        <el-button
          v-if="hasActiveFilters"
          link
          type="primary"
          @click="clearAllFilters"
        >
          清空全部筛选
        </el-button>
      </div>
    </header>

    <div v-if="pagedList.length" class="card-list" :class="viewMode">
      <ProductItem
        v-for="item in pagedList"
        :key="item.id"
        :item="item"
        :view-mode="viewMode"
        @click="handleItemClick"
      />
    </div>

    <el-empty v-else description="暂无资料记录" />

    <footer class="page-footer">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next"
        background
      />

      <div class="footer-actions">
        <el-button type="primary" disabled>新增资料</el-button>
      </div>
    </footer>

    <el-button type="primary" class="fab-add" disabled> + </el-button>
  </section>
</template>

<style scoped>
.product-list-page {
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  align-items: flex-start;
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

.group-label {
  font-size: 13px;
  color: var(--app-text-secondary, #888);
  white-space: nowrap;
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

.card-list.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-list.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
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
