import type { Stack } from '@model-stacker/data';

export interface ManufacturerOption {
  /** 数据库中存在的厂家 ID；用户新增选项时无 id，仅保留 name */
  id?: number;
  name: string;
}

export interface SaveStackPayload {
  /** 厂家：选中的后端厂家为 ID；用户新增选项为名称 */
  manufacturer: number | string;
  /** 产品名称 */
  productName: string;
  /** 货号 */
  modelNo: string;
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
 * 新建 / 更新堆积记录
 *  - create 时：新增的厂家传入 name，后端会以该名称新建审核申请
 *  - update 时：厂家、产品名称、货号不可修改
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
