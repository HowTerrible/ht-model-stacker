import type { WipStageEnum, WipStatusEnum } from '../enums/wip';
import type { DateTimeString, Id, Image, TimestampFields } from './common';

/** 烂尾记录（开封但未完成） */
export interface Wip extends TimestampFields {
  id: Id;
  userId: Id;
  productId: Id;
  /** 开工时间 */
  startedAt: DateTimeString;
  /** 制作阶段（进度量化困难，用阶段表达当前进度） */
  stage: WipStageEnum;
  /** 烂尾照片 */
  photos: Image[];
  status: WipStatusEnum;
  notes?: string;
}

export interface WipQuery {
  userId: Id;
  status?: WipStatusEnum;
  /** 按制作阶段筛选 */
  stage?: WipStageEnum;
  page?: number;
  pageSize?: number;
}
