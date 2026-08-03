<script setup lang="ts"></script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">ModelStacker</h1>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <nav class="app-nav">
      <router-link to="/">堆积</router-link>
      <router-link to="/stats">花销</router-link>
      <router-link to="/wip">烂尾</router-link>
    </nav>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  font-family: system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f5f6f8;
  color: #333;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 640px;
  margin: 0 auto;
}

.app-header {
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.app-title {
  font-size: 18px;
}

.app-main {
  flex: 1;
  padding: 12px;
}

.app-nav {
  display: flex;
  border-top: 1px solid #eee;
  background: #fff;
}

.app-nav a {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  color: #666;
}

.app-nav a.router-link-active {
  color: #1677ff;
  font-weight: 600;
}
</style>
