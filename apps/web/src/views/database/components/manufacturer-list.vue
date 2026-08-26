<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { CommonStatus } from "@model-stacker/data";
import { commonStatusOptions } from "../options";
import ManufacturerItem from "./manufacturer-item.vue";

type ViewMode = "list" | "grid";

interface ManufacturerListItem {
  id: string;
  name: string;
  fullName?: string;
  country?: string;
  website?: string;
  description?: string;
  status: CommonStatus;
}

const viewMode = ref<ViewMode>("list");
const keyword = ref("");

const moreExpanded = ref<string[]>([]);
const filterStatuses = ref<CommonStatus[]>([]);
const filterCountries = ref<string[]>([]);

const allCountries = [
  "日本",
  "中国",
  "美国",
  "德国",
  "英国",
  "韩国",
  "其他",
];

watch([filterStatuses, filterCountries], () => {
  page.value = 1;
});

function resetMoreFilters() {
  filterStatuses.value = [];
  filterCountries.value = [];
}

function clearAllFilters() {
  keyword.value = "";
  resetMoreFilters();
}

// TODO 待接入厂家分页查询接口，当前使用本地示例数据演示交互
const mockList: ManufacturerListItem[] = [
  {
    id: "m01",
    name: "万代 Bandai",
    fullName: "BANDAI NAMCO Holdings Inc.",
    country: "日本",
    website: "https://bandai-namco.com",
    description: "全球最大模型玩具厂商，高达系列版权方",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m02",
    name: "田宫 Tamiya",
    fullName: "TAMIYA INC.",
    country: "日本",
    website: "https://www.tamiya.com",
    description: "老牌模型厂商，以军模和四驱车闻名",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m03",
    name: "长谷川 Hasegawa",
    fullName: "Hasegawa Corporation",
    country: "日本",
    website: "https://www.hasegawa-model.co.jp",
    description: "专注航空与军事模型",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m04",
    name: "富士美 Fujimi",
    fullName: "FUJIMI CORPORATION",
    country: "日本",
    description: "日本综合模型厂商，产品线丰富",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m05",
    name: "威龙 Dragon",
    fullName: "Dragon Models Limited",
    country: "中国香港",
    description: "以 1/35 军事模型和合金车模著称",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m06",
    name: "小号手 Trumpeter",
    fullName: "Hobby Boss",
    country: "中国",
    website: "https://www Trumpeter.com",
    description: "中国最大模型厂商，产品覆盖军模、船模、飞机",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m07",
    name: "MENG",
    fullName: "MENG MODEL",
    country: "中国",
    website: "https://www.meng-model.com",
    description: "新锐模型品牌，以高精度开模著称",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m08",
    name: "长城 GreatWall",
    fullName: "GreatWall Hobby",
    country: "中国",
    description: "专注 1/72 航空模型",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m09",
    name: "GSI 郡士",
    fullName: "GSI Creos Corporation",
    country: "日本",
    website: "https://www.gsi-creos.com",
    description: "模型辅料巨头，涂料、工具、渗线液等",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m10",
    name: "Mr. Hobby",
    fullName: "GSI Creos (Mr. Hobby 品牌线)",
    country: "日本",
    description: "GSI 旗下模型工具与辅料品牌",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m11",
    name: "寿屋 KOTOBUKIYA",
    fullName: "KOTOBUKIYA Co., Ltd.",
    country: "日本",
    website: "https://www.kotobukiya.co.jp",
    description: "手办与拼装模型厂商，MSG 系列",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m12",
    name: "AK Interactive",
    fullName: "AK Interactive S.L.",
    country: "西班牙",
    website: "https://www.ak-interactive.com",
    description: "模型旧化与涂装辅料品牌",
    status: CommonStatus.ACTIVE,
  },
  {
    id: "m13",
    name: "MiniArt",
    fullName: "MiniArt Co., Ltd.",
    country: "韩国",
    description: "韩国拼装模型与手办品牌",
    status: CommonStatus.INACTIVE,
  },
];

const page = ref(1);
const pageSize = ref(10);

const filteredList = computed(() => {
  let list = mockList;

  if (filterStatuses.value.length) {
    const statuses = filterStatuses.value;
    list = list.filter((item) => statuses.includes(item.status));
  }

  if (filterCountries.value.length) {
    const countries = filterCountries.value;
    list = list.filter(
      (item) => item.country != null && countries.includes(item.country),
    );
  }

  const kw = keyword.value.trim().toLowerCase();
  if (kw) {
    list = list.filter((item) =>
      [item.name, item.fullName ?? "", item.country ?? "", item.description ?? ""]
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

function handleItemClick(item: ManufacturerListItem) {
  // TODO 对接详情弹窗
  console.log("manufacturer item click", item.id);
}

const hasActiveFilters = computed(
  () => filterStatuses.value.length > 0 || filterCountries.value.length > 0,
);
</script>

<template>
  <section class="mfr-list-page">
    <header class="list-header">
      <div class="search-row">
        <el-input
          v-model="keyword"
          placeholder="搜索厂家名称、全称、国家"
          clearable
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <div class="filter-row">
        <el-radio-group v-model="viewMode">
          <el-radio-button value="list">通栏</el-radio-button>
          <el-radio-button value="grid">网格</el-radio-button>
        </el-radio-group>

        <div class="filter-actions">
          <el-collapse v-model="moreExpanded" class="more-filter">
            <el-collapse-item name="more" title="更多筛选">
              <div class="more-filter-body">
                <el-select
                  v-model="filterCountries"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  placeholder="国家/地区"
                >
                  <el-option
                    v-for="c in allCountries"
                    :key="c"
                    :label="c"
                    :value="c"
                  />
                </el-select>

                <el-select
                  v-model="filterStatuses"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  placeholder="状态"
                >
                  <el-option
                    v-for="o in commonStatusOptions"
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
      </div>
    </header>

    <div v-if="pagedList.length" class="card-list" :class="viewMode">
      <ManufacturerItem
        v-for="item in pagedList"
        :key="item.id"
        :item="item"
        @click="handleItemClick"
      />
    </div>

    <el-empty v-else description="暂无厂家资料" />

    <footer class="page-footer">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next"
        background
      />

      <div class="footer-actions">
        <el-button type="primary" disabled>新增厂家</el-button>
      </div>
    </footer>

    <el-button type="primary" class="fab-add" disabled> + </el-button>
  </section>
</template>

<style scoped>
.mfr-list-page {
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

.filter-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.more-filter {
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
  gap: 8px;
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
