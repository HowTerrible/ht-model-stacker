import type { User } from '@model-stacker/data';

export interface LoginParams {
  /** 账号 */
  account: string;
  /** 密码 */
  password: string;
}

/** 模拟网络延迟 */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 账号密码登录（当前为 mock 实现）
 * TODO: 后端就绪后替换为真实接口调用，例如：
 *   request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify(params) });
 */
export async function loginByPassword(params: LoginParams): Promise<{ token: string }> {
  await delay();

  // TODO: 以下账号密码为虚拟 mock 数据，后端就绪后删除
  const mockAccount = 'admin';
  const mockPassword = '123456';
  if (params.account !== mockAccount || params.password !== mockPassword) {
    throw new Error('账号或密码错误');
  }

  // TODO: token 为虚拟 mock 数据，后端就绪后由服务端签发
  const mockToken = 'mock-token-0123456789';
  return { token: mockToken };
}

/**
 * 查询当前登录用户信息（当前为 mock 实现）
 * TODO: 后端就绪后替换为真实接口调用，例如：
 *   request<User>('/auth/me');
 */
export async function getUserProfile(): Promise<User> {
  await delay();

  // TODO: 以下用户信息为虚拟 mock 数据，后端就绪后删除
  const mockUser: User = {
    id: 1,
    nickname: '堆积人',
    phone: '13800000000',
    permissions: '[]',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-24T00:00:00.000Z',
  };
  return mockUser;
}
