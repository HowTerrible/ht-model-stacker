import type { Currency } from '../enums/price';
import type { PurchaseChannel, StackStatus } from '../enums/stack';
import type { WipStage } from '../enums/wip';
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
  /** 完成进度（阶段，开工后填写，枚举同 WipStage） */
  stage?: WipStage;
  /** 关联的烂尾记录 ID（该堆积烂尾后对应 Wip） */
  wipId?: Id;
  /** 堆积位置 */
  location?: string;
  notes?: string;
}

export interface StackQuery {
  userId: Id;
  status?: StackStatus;
  /** 按完成进度（阶段）筛选 */
  stage?: WipStage;
  /** 是否只查已关联烂尾的堆积 */
  onlyWithWip?: boolean;
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
