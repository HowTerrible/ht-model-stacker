import type { Currency, PriceSource } from '../enums/price';
import type { DateTimeString, Id, TimestampFields } from './common';

/** 产品价格记录（用于价格走向、历史最低价） */
export interface PriceRecord extends TimestampFields {
  id: Id;
  productId: Id;
  /** 价格 */
  price: number;
  currency: Currency;
  source: PriceSource;
  /** 来源链接 */
  sourceUrl?: string;
  /** 记录时间（价格对应的时间点） */
  recordedAt: DateTimeString;
  note?: string;
}

/** 价格走向图上的单个数据点 */
export interface PriceTrendPoint {
  recordedAt: DateTimeString;
  price: number;
  currency: Currency;
  source: PriceSource;
}

/** 产品价格汇总 */
export interface PriceSummary {
  /** 历史最低价 */
  lowest: PriceTrendPoint | null;
  /** 历史最高价 */
  highest: PriceTrendPoint | null;
  /** 最近一次价格 */
  latest: PriceTrendPoint | null;
  /** 趋势点列表 */
  trend: PriceTrendPoint[];
}
