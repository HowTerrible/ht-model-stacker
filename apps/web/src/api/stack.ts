import type { Stack } from '@model-stacker/data';
import { request } from './client';

export interface ManufacturerOption {
  id?: number;
  name: string;
}

export interface ProductOption {
  id?: number;
  name: string;
  modelNo?: string;
}

export interface SaveStackPayload {
  /** 厂家：选中的后端厂家为 ID；用户新增选项为名称 */
  manufacturer?: number | string;
  /** 产品：选中的后端产品为 ID；用户新增选项为名称 */
  product?: number | string;
  /** 货号 */
  modelNo?: string;
  /** 堆积位置 */
  location?: string;
  notes?: string;
  purchasedAt?: string;
  purchasePrice?: number;
  currency?: string;
  channel?: string;
  status?: string;
}

export interface StackListResult {
  items: Stack[];
  total: number;
}

export interface StackListParams {
  status?: string;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

/** 按名称模糊搜索已审核通过的厂家 */
export function searchManufacturers(keyword: string): Promise<ManufacturerOption[]> {
  if (!keyword.trim()) return Promise.resolve([]);
  const qs = new URLSearchParams({ keyword, pageSize: '20' }).toString();
  return request<ManufacturerOption[]>(`/manufacturers/search?${qs}`);
}

/** 按名称模糊搜索已审核通过的产品 */
export function searchProducts(keyword: string): Promise<ProductOption[]> {
  if (!keyword.trim()) return Promise.resolve([]);
  const qs = new URLSearchParams({ keyword, pageSize: '20' }).toString();
  return request<ProductOption[]>(`/products/search?${qs}`);
}

/** 查询当前用户的堆积列表（分页） */
export function getStacks(params: StackListParams = {}): Promise<StackListResult> {
  const clean: Record<string, string> = {};
  (Object.keys(params) as Array<keyof StackListParams>).forEach((k) => {
    const v = params[k];
    if (v !== undefined && v !== null && String(v) !== '') clean[k] = String(v);
  });
  const qs = new URLSearchParams(clean).toString();
  return request<StackListResult>(`/stacks?${qs}`);
}

/** 获取单条堆积详情 */
export function getStack(id: number): Promise<Stack> {
  return request<Stack>(`/stacks/${id}`);
}

/** 新建堆积记录（传 id 时为更新） */
export async function saveStack(payload: SaveStackPayload, id?: number): Promise<Stack> {
  if (id) {
    return request<Stack>(`/stacks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }
  return request<Stack>('/stacks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** 删除堆积记录 */
export function deleteStack(id: number): Promise<void> {
  return request<void>(`/stacks/${id}`, { method: 'DELETE' });
}
