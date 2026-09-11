import type {
  ManufacturerSubmission,
  ProductSubmission,
  ReviewStatusEnum,
} from '@model-stacker/data';
import { request } from './client';

interface PageResult<T> {
  items: T[];
  total: number;
}

interface AdminPageQuery {
  reviewStatus?: ReviewStatusEnum;
  kind?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

function qs(query: AdminPageQuery): string {
  const clean: Record<string, string> = {};
  (Object.keys(query) as Array<keyof AdminPageQuery>).forEach((k) => {
    const v = query[k];
    if (v !== undefined && v !== null && String(v) !== '') clean[k] = String(v);
  });
  return new URLSearchParams(clean).toString();
}

/** 厂家提交审核列表 */
export function listManufacturerSubmissions(query: AdminPageQuery = {}) {
  return request<PageResult<ManufacturerSubmission>>(`/submissions/manufacturers?${qs(query)}`);
}

/** 产品提交审核列表 */
export function listProductSubmissions(query: AdminPageQuery = {}) {
  return request<PageResult<ProductSubmission>>(`/submissions/products?${qs(query)}`);
}

/** 通过厂家提交（合并进资料库） */
export function approveManufacturerSubmission(id: number) {
  return request<ManufacturerSubmission>(`/submissions/manufacturers/${id}/approve`, { method: 'POST' });
}

/** 拒绝厂家提交 */
export function rejectManufacturerSubmission(id: number, note: string) {
  return request<ManufacturerSubmission>(`/submissions/manufacturers/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

/** 通过产品提交（合并进资料库） */
export function approveProductSubmission(id: number, manufacturerId?: number) {
  return request<ProductSubmission>(`/submissions/products/${id}/approve`, {
    method: 'POST',
    body: JSON.stringify(manufacturerId != null ? { manufacturerId } : {}),
  });
}

/** 拒绝产品提交 */
export function rejectProductSubmission(id: number, note: string) {
  return request<ProductSubmission>(`/submissions/products/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}
