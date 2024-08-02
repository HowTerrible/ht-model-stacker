export * from './accessoryPart';
export * from './brand';
export * from './dict';
export * from './model';
export * from './realItem';
export * from './record';
export * from './tool';
export * from './user';

export type NullableType<T> = T | null | undefined;

/** 通用布尔枚举 */
export enum CommonBooleanEnum {
  true = 1,
  false = 0,
}

/** 数据是否删除 type */
export interface DeleteType {
  delete?: CommonBooleanEnum;
  /** 删除时间 YYYY-MM-DD hh:mm:ss */
  deleteTime?: string;
  /** 删除操作人 ID */
  deleteOperatorId?: string;
  /** 删除操作人 名称 */
  deleteOperatorName?: string;
}
