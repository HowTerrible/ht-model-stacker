import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 0 as number,
    nickname: '' as string,
  }),
  getters: {
    isLoggedIn: (state) => state.id > 0,
  },
});
