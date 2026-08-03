import type { ApiResponse } from '@model-stacker/data';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const body = (await res.json()) as ApiResponse<T>;
  return body.data;
}
