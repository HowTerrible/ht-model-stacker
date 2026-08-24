import { defineStore } from 'pinia';
import type { User } from '@model-stacker/data';
import { clearToken, getToken, request, setToken } from '@/api/client';

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
 * 每次应用启动凭 token 调用 /auth/me 重新获取；
 * 权限的真实校验由服务端 RolesGuard 完成，前端只做 UI 展示控制。
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
    async login(userId: number) {
      const { token, user } = await request<{ token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
      setToken(token);
      Object.assign(this, user);
    },
    async fetchProfile() {
      if (!getToken()) {
        return;
      }
      try {
        const user = await request<User>('/auth/me');
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
