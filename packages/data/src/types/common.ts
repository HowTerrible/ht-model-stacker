/** 主键 ID（SQLite 自增整数） */
export type Id = number;

/** ISO8601 日期时间字符串 */
export type DateTimeString = string;

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
