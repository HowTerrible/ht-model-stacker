import type { ReviewStatus, SourceType } from '../enums/common';

/** 主键 ID（SQLite 自增整数） */
export type Id = number;

/** ISO8601 日期时间字符串 */
export type DateTimeString = string;

/** 图片资源（原图 + 缩略图） */
export interface Image {
  /** 原图地址 */
  url: string;
  /** 缩略图地址 */
  thumbnailUrl: string;
  /** 图片说明 */
  alt?: string;
}

/** 时间范围 */
export interface TimeRange {
  start: string;
  end: string;
}

/** 分页查询参数 */
export interface PageQuery {
  page?: number;
  pageSize?: number;
}

/** 分页结果 */
export interface Pagination<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** 统一接口响应结构 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 基础时间字段 */
export interface TimestampFields {
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

/** 审核相关字段 */
export interface ReviewFields {
  /** 审核状态 */
  reviewStatus?: ReviewStatus;
  /** 审核日期 */
  reviewDate?: DateTimeString;
  /** 审核人 ID */
  reviewerId?: Id;
  /** 审核备注 */
  reviewNote?: string;
}

/**
 * 数据来源
 * 格式："来源类型|备注"
 * - 原创：备注为空
 * - 官网：备注为 URL
 * - 外链：备注为 URL
 */
export type DataSource = string;

/** 解析数据来源字符串 */
export function parseDataSource(value?: DataSource): { type?: SourceType; note?: string } {
  if (!value) return {};
  const sep = value.indexOf('|');
  if (sep === -1) {
    return { type: value as SourceType };
  }
  return {
    type: value.substring(0, sep) as SourceType,
    note: value.substring(sep + 1) || undefined,
  };
}

/** 构造数据来源字符串 */
export function buildDataSource(type: SourceType, note?: string): DataSource {
  if (!note) return type;
  return `${type}|${note}`;
}
