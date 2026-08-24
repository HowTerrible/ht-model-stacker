import { defineStore } from 'pinia';
import type { User } from '@model-stacker/data';
import { clearToken, getToken, setToken } from '@/api/client';
import { getUserProfile, loginByPassword, type LoginParams } from '@/api/auth';

function emptyUser(): User {
  return {
    id: 0,
    nickname: '',
    permissions: '[]',
    createdAt: '',
    updatedAt: '',
  };
}

/**
 * 用户信息与权限仅保存在内存中（不写 localStorage），
 * 每次应用启动凭 token 重新获取用户信息；
 * 当前登录与用户信息均为 mock 数据，后端就绪后仅需替换 api/auth.ts 内部实现。
 */
export const useUserStore = defineStore('user', {
  state: (): User => emptyUser(),
  getters: {
    isLoggedIn: (state) => state.id > 0,
    permissionList: (state): string[] => {
      try {
        return JSON.parse(state.permissions) as string[];
      } catch {
        return [];
      }
    },
  },
  actions: {
    /** 账号密码登录，成功后查询并保存用户信息 */
    async login(params: LoginParams) {
      const { token } = await loginByPassword(params);
      setToken(token);
      // 登录成功后查询用户信息
      const user = await getUserProfile();
      Object.assign(this, user);
    },
    async fetchProfile() {
      if (!getToken()) {
        return;
      }
      try {
        const user = await getUserProfile();
        Object.assign(this, user);
      } catch {
        this.logout();
      }
    },
    logout() {
      clearToken();
      Object.assign(this, emptyUser());
    },
  },
});
