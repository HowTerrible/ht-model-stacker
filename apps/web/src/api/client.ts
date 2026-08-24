import type { ApiResponse } from '@model-stacker/data';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const TOKEN_KEY = 'auth.token';
const REDIRECT_KEY = 'auth.redirect';

/** 请求超时时间（毫秒），超时后自动中断请求 */
const REQUEST_TIMEOUT = 15000;

/** 本地只持久化登录凭证，不缓存用户资料与权限 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** 记录被登录拦截前的页面路径，重新登录成功后跳回 */
export function saveRedirectPath(path: string): void {
  sessionStorage.setItem(REDIRECT_KEY, path);
}

/** 取出并清除记录的来源页面路径 */
export function takeRedirectPath(): string | null {
  const path = sessionStorage.getItem(REDIRECT_KEY);
  if (path) {
    sessionStorage.removeItem(REDIRECT_KEY);
  }
  return path;
}

/** 未登录 / 登录超时（401）时跳转登录页 */
function redirectToLogin(): void {
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  // 已在登录页时不重复跳转
  if (current === '/login' || current.startsWith('/login?') || current.startsWith('/login/')) {
    return;
  }
  saveRedirectPath(current);
  window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timer: ReturnType<typeof setTimeout> = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    let res: Response;
    try {
      res = await fetch(`${BASE_URL}${path}`, { ...options, headers, signal: controller.signal });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('请求超时，请稍后重试');
      }
      throw error;
    }

    if (res.status === 401) {
      // 登录超时或未登录：清除本地凭证并跳转登录页（记录来源页面以便重新登录后返回）
      clearToken();
      redirectToLogin();
      throw new Error('未登录或登录已过期');
    }
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const body = (await res.json()) as ApiResponse<T>;
    return body.data;
  } finally {
    clearTimeout(timer);
  }
}
