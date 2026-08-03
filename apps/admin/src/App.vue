<template>
  <el-container class="layout">
    <el-aside width="200px" class="layout-aside">
      <h2 class="logo">ModelStacker</h2>
      <el-menu router default-active="/">
        <el-menu-item index="/">概览</el-menu-item>
        <el-menu-item index="/product">产品管理</el-menu-item>
        <el-menu-item index="/manufacturer">厂家管理</el-menu-item>
        <el-menu-item index="/price">价格走势</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family: system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.layout {
  height: 100%;
}

.layout-aside {
  border-right: 1px solid #eee;
}

.logo {
  padding: 16px;
  font-size: 16px;
}
</style>
