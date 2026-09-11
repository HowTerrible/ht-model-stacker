import type { CurrencyEnum } from '../enums/price';
import type { PurchaseChannelEnum, StackStatusEnum } from '../enums/stack';
import type { WipStageEnum } from '../enums/wip';
import type { DateTimeString, Id, TimestampFields } from './common';

/**
 * 堆积记录：已购买的物品，不限于模型、工具，
 * 可包含各种日用品、五金等内容。
 *
 * 堆积与资料库不强绑定：
 * - 资料库中有对应产品时，通过 productId 建立关联；
 * - 资料库中没有时，直接填写 itemName / manufacturerName 等自由信息，
 *   并可创建 DataSupplementRequest 一键申请补充资料，审核建库后自动回填绑定。
 */
export interface Stack extends TimestampFields {
  id: Id;
  userId: Id;
  /** 关联的资料库产品 ID（不强绑定；资料库无对应产品时留空） */
  productId?: Id;
  /** 关联的资料库厂家 ID（不强绑定；不关联产品时可单独选厂家） */
  manufacturerId?: Id;
  /** 所属产品分类 ID（可选，关联 Theme 节点） */
  categoryId?: Id;
  /** 品名（未关联资料库产品时填写；已关联时可留空） */
  itemName?: string;
  /** 厂家 / 品牌名（未关联资料库厂家时填写） */
  manufacturerName?: string;
  /** 货号 / 型号（不强绑定；不关联产品时可直接输入） */
  modelNo?: string;
  /** 购买时间 */
  purchasedAt?: DateTimeString;
  /** 购买价格 */
  purchasePrice?: number;
  currency: CurrencyEnum;
  channel?: PurchaseChannelEnum;
  status: StackStatusEnum;
  /** 完成进度（阶段，开工后填写，枚举同 WipStageEnum） */
  stage?: WipStageEnum;
  /** 关联的烂尾记录 ID（该堆积烂尾后对应 Wip） */
  wipId?: Id;
  /** 堆积位置 */
  location?: string;
  notes?: string;
}

export interface StackQuery {
  userId: Id;
  status?: StackStatusEnum;
  /** 按完成进度（阶段）筛选 */
  stage?: WipStageEnum;
  /** 是否只查已关联烂尾的堆积 */
  onlyWithWip?: boolean;
  /** 是否只查已关联资料库产品的堆积 */
  onlyWithProduct?: boolean;
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
  currency: CurrencyEnum;
  /** 分时间段统计 */
  byPeriod: SpendingByPeriod[];
}