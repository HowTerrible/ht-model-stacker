import type { Currency } from '../enums/price';
import type { PurchaseChannel, StackStatus } from '../enums/stack';
import type { DateTimeString, Id, TimestampFields } from './common';

/** 堆积记录（已购买的模型 / 工具辅料） */
export interface Stack extends TimestampFields {
  id: Id;
  userId: Id;
  productId: Id;
  /** 购买时间 */
  purchasedAt: DateTimeString;
  /** 购买价格 */
  purchasePrice?: number;
  currency: Currency;
  channel?: PurchaseChannel;
  status: StackStatus;
  notes?: string;
}

export interface StackQuery {
  userId: Id;
  status?: StackStatus;
  /** 按购买时间过滤 */
  startDate?: string;
  endDate?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

/** 单段统计结果 */
export interface SpendingByPeriod {
  /** 时间段标识，如 2025-01 / 2025Q1 / 2025 */
  period: string;
  /** 花销合计 */
  total: number;
  /** 笔数 */
  count: number;
}

/** 花销统计结果 */
export interface SpendingStats {
  /** 总花销 */
  total: number;
  currency: Currency;
  /** 分时间段统计 */
  byPeriod: SpendingByPeriod[];
}
