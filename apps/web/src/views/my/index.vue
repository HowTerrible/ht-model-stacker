<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import StackForm from './components/stack-form.vue';

const router = useRouter();

const formVisible = ref(false);

/** 汇率参考卡片展示项（汇率数据待接入，先以 -- 占位） */
const rateItems = [
  { label: '美元 → 人民币' },
  { label: '日元 → 人民币' },
  { label: '港币 → 人民币' },
  { label: '人民币 → 美元' },
  { label: '人民币 → 日元' },
  { label: '人民币 → 港币' },
];

/** 本月 / 上月统计行 */
const monthRows = ['堆积数量', '堆积花销', '花销最高的堆积'];

/** 累计统计行 */
const totalRows = ['堆积数量', '堆积花销'];

function goMyStack() {
  router.push({ name: 'my-stack' });
}
</script>

<template>
  <section class="profile-page">
    <div class="page-toolbar">
      <el-button type="primary" @click="formVisible = true">新增堆积</el-button>
    </div>

    <div class="card-grid">
      <article class="card">
        <h3>汇率参考</h3>
        <ul class="stat-list">
          <li v-for="item in rateItems" :key="item.label">
            <span>{{ item.label }}</span>
            <b>--</b>
          </li>
        </ul>
      </article>

      <article class="card">
        <h3>本月</h3>
        <ul class="stat-list">
          <li v-for="row in monthRows" :key="row">
            <span>{{ row }}</span>
            <b>--</b>
          </li>
        </ul>
      </article>

      <article class="card">
        <h3>上月</h3>
        <ul class="stat-list">
          <li v-for="row in monthRows" :key="row">
            <span>{{ row }}</span>
            <b>--</b>
          </li>
        </ul>
      </article>

      <article class="card">
        <h3>累计</h3>
        <ul class="stat-list">
          <li v-for="row in totalRows" :key="row">
            <span>{{ row }}</span>
            <b>--</b>
          </li>
        </ul>
      </article>
    </div>

    <StackForm v-model="formVisible" @saved="goMyStack" />
  </section>
</template>

<style scoped>
.page-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 12px;
}

.card {
  padding: 14px;
  background: var(--app-surface-color, #fff);
  border-radius: 8px;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 15px;
}

.stat-list {
  list-style: none;
}

.stat-list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  color: var(--app-text-secondary, #888);
  border-bottom: 1px dashed var(--el-border-color-lighter, #ebeef5);
}

.stat-list li:last-child {
  border-bottom: none;
}

.stat-list b {
  color: var(--app-text-color, #333);
  font-weight: 600;
}
</style>
