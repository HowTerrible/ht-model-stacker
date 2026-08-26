<script setup lang="ts">
import { ref } from "vue";
import ManufacturerList from "./components/manufacturer-list.vue";
import ProductList from "./components/product-list.vue";

const activeTab = ref<"manufacturer" | "product">("manufacturer");
</script>

<template>
  <section class="database-page">
    <el-radio-group v-model="activeTab" size='large' class="tab-bar">
      <el-radio-button value="manufacturer">品牌/厂商</el-radio-button>
      <el-radio-button value="product">模型/辅料</el-radio-button>
    </el-radio-group>

    <KeepAlive>
      <ManufacturerList v-if="activeTab === 'manufacturer'" />
      <ProductList v-else />
    </KeepAlive>
  </section>
</template>

<style scoped>
.database-page {
  display: flex;
  flex-direction: column;
}

.tab-bar {
  display: flex;
  margin-bottom: 12px;
}

.tab-bar :deep(.el-radio-button__inner) {
  flex: 1;
  width: 100%;
}
</style>
