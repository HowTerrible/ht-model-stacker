import type {
  ManufacturerSubmission,
  ManufacturerSubmissionInput,
  ProductSubmission,
  ProductSubmissionInput,
  ReviewStatus,
} from '@model-stacker/data';
import { request } from './client';

/** 分页包装（后端返回 { items, total }，此处转为 Pagination 结构） */
interface PageResult<T> {
  items: T[];
  total: number;
}

/** 提交厂家资料 */
export function submitManufacturer(payload: ManufacturerSubmissionInput) {
  return request<ManufacturerSubmission>('/submissions/manufacturers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** 提交产品资料 */
export function submitProduct(payload: ProductSubmissionInput) {
  return request<ProductSubmission>('/submissions/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** 我的厂家提交列表 */
export function listMyManufacturerSubmissions(params: {
  reviewStatus?: ReviewStatus;
  page?: number;
  pageSize?: number;
}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return request<PageResult<ManufacturerSubmission>>(`/submissions/my/manufacturers?${qs}`);
}

/** 我的产品提交列表 */
export function listMyProductSubmissions(params: {
  reviewStatus?: ReviewStatus;
  page?: number;
  pageSize?: number;
}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return request<PageResult<ProductSubmission>>(`/submissions/my/products?${qs}`);
}
