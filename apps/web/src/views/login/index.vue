<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { takeRedirectPath } from '@/api/client';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const account = ref('');
const password = ref('');
const agreed = ref(false);
const loading = ref(false);
const errorMessage = ref('');

/**
 * 用户使用说明点击回调
 */
function handleShowAgreement() {}

/** 仅允许站内路径，防止开放重定向 */
function sanitizeRedirect(target: string | null | undefined): string {
  if (target && target.startsWith('/') && !target.startsWith('//')) {
    return target;
  }
  return '/';
}

function resolveRedirectTarget(): string {
  const rawQuery = route.query.redirect;
  const fromQuery = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  return sanitizeRedirect(fromQuery ?? takeRedirectPath());
}

async function handleLogin() {
  if (loading.value) {
    return;
  }
  errorMessage.value = '';

  if (!account.value.trim()) {
    errorMessage.value = '请输入账号';
    return;
  }
  if (!password.value) {
    errorMessage.value = '请输入密码';
    return;
  }
  if (!agreed.value) {
    errorMessage.value = '请先阅读并勾选用户使用说明';
    return;
  }

  loading.value = true;
  try {
    await userStore.login({ account: account.value.trim(), password: password.value });
    // 登录成功后进入 home；若登录前有被拦截的页面则优先返回该页面
    await router.replace(resolveRedirectTarget());
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '登录失败，请稍后重试';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="login-page">
    <div class="login-card">
      <h2 class="login-title">模屋</h2>
      <p class="login-subtitle">账号密码登录</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <label class="field">
          <span class="field-label">账号</span>
          <input
            v-model.trim="account"
            class="field-input"
            type="text"
            name="account"
            placeholder="请输入账号"
            autocomplete="username"
          />
        </label>

        <label class="field">
          <span class="field-label">密码</span>
          <input
            v-model="password"
            class="field-input"
            type="password"
            name="password"
            placeholder="请输入密码"
            autocomplete="current-password"
            @keyup.enter="handleLogin"
          />
        </label>

        <p v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</p>

        <label class="agreement">
          <input v-model="agreed" class="agreement-checkbox" type="checkbox" name="agreement" />
          <span>我已阅读并同意</span>
          <a class="agreement-link" role="button" tabindex="0" @click.stop.prevent="handleShowAgreement">《用户使用说明》</a>
        </label>

        <button class="login-button" type="submit" :disabled="loading">
          {{ loading ? '登录中…' : '登 录' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 32px 20px;
  background: #fff;
  border-radius: 12px;
}

.login-title {
  font-size: 24px;
  text-align: center;
}

.login-subtitle {
  margin: 8px 0 24px;
  color: #888;
  font-size: 14px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: block;
}

.field-label {
  display: block;
  margin-bottom: 6px;
  color: #666;
  font-size: 14px;
}

/* 输入框字号 >= 16px，避免 iOS Safari 聚焦时自动放大页面 */
.field-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f7f8fa;
  font-size: 16px;
  color: #333;
  outline: none;
}

.field-input:focus {
  border-color: #1677ff;
  background: #fff;
}

.field-input::placeholder {
  color: #bbb;
}

.login-error {
  padding: 10px 12px;
  border-radius: 8px;
  background: #fff1f0;
  border: 1px solid #ffccc7;
  color: #cf1322;
  font-size: 13px;
}

.agreement {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  user-select: none;
}

.agreement-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #1677ff;
  cursor: pointer;
}

.agreement-link {
  color: #1677ff;
  cursor: pointer;
}

.agreement-link:focus-visible {
  outline: 2px solid #1677ff;
  outline-offset: 2px;
  border-radius: 2px;
}

.login-button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #1677ff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.login-button:active {
  background: #0958d9;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 平板及以上屏幕：卡片增加阴影与留白 */
@media (min-width: 768px) {
  .login-page {
    padding: 48px 24px;
  }

  .login-card {
    padding: 40px 36px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }

  .login-form {
    gap: 20px;
  }
}
</style>
