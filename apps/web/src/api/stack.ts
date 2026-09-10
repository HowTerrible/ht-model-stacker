import type { Stack } from '@model-stacker/data';

export interface ManufacturerOption {
  /** 数据库中存在的厂家 ID；用户新增选项时无 id，仅保留 name */
  id?: number;
  name: string;
}

export interface ProductOption {
  /** 数据库中存在的产品 ID；用户新增选项时无 id，仅保留 name */
  id?: number;
  name: string;
}

export interface SaveStackPayload {
  /** 厂家：选中的后端厂家为 ID；用户新增选项为名称 */
  manufacturer: number | string;
  /** 产品：选中的后端产品为 ID；用户新增选项为名称 */
  product: number | string;
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

/** 模拟网络延迟 */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockManufacturers = [
  { id: 1, name: '万代' },
  { id: 2, name: '田宫' },
  { id: 3, name: '郡士' },
  { id: 4, name: 'GSI' },
  { id: 5, name: '寿屋' },
  { id: 6, name: 'Skil' },
  { id: 7, name: 'M.S.G' },
];

const mockProducts = [
  { id: 1, name: 'MG 沙扎比 Ver.Ka' },
  { id: 2, name: 'RG 强袭自由高达' },
  { id: 3, name: '田宫薄刃剪钳' },
  { id: 4, name: '郡士油性漆 消光白' },
  { id: 5, name: 'HG 高机动扎古' },
  { id: 6, name: 'GSI 水性漆套装 12 色' },
  { id: 7, name: 'M.S.G 重武装套件' },
  { id: 8, name: '喷笔 + 龟泵套装' },
];

/**
 * 关键字搜索厂家（当前为 mock 实现）
 * TODO: 后端就绪后替换为真实接口调用，例如：
 *   request<Manufacturer[]>('/manufacturers', { method: 'GET', ... });
 */
export async function searchManufacturers(keyword: string): Promise<ManufacturerOption[]> {
  await delay();
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [];
  return mockManufacturers.filter((m) => m.name.toLowerCase().includes(kw));
}

/**
 * 关键字搜索产品（当前为 mock 实现）
 * TODO: 后端就绪后替换为真实接口调用，例如：
 *   request<Product[]>('/products', { method: 'GET', ... });
 */
export async function searchProducts(keyword: string): Promise<ProductOption[]> {
  await delay();
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [];
  return mockProducts.filter((m) => m.name.toLowerCase().includes(kw));
}

/**
 * 新建 / 更新堆积记录
 *  - create 时：新增的厂家 / 产品传入 name，后端会以该名称发起资料补充申请
 *  - update 时：厂家、产品、货号不可修改
 * TODO: 后端就绪后替换为真实接口调用
 */
export async function saveStack(
  payload: SaveStackPayload,
  id?: number,
): Promise<Stack> {
  await delay();
  // TODO 接入真实堆积接口
  return { id: id ?? 1 } as Stack;
}

/** 删除堆积记录（当前为 mock 实现） */
export async function deleteStack(id: number): Promise<void> {
  await delay();
  // TODO 接入真实堆积接口
}