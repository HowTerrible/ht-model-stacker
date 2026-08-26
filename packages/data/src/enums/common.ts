/** 通用启用状态 */
export enum CommonStatus {
  /** 启用 */
  ACTIVE = 'ACTIVE',
  /** 停用 */
  INACTIVE = 'INACTIVE',
}

/** 审核状态 */
export enum ReviewStatus {
  /** 待审核 */
  PENDING = 'PENDING',
  /** 审核通过 */
  APPROVED = 'APPROVED',
  /** 审核拒绝 */
  REJECTED = 'REJECTED',
}

/** 数据来源类型 */
export enum SourceType {
  /** 原创 */
  ORIGINAL = 'ORIGINAL',
  /** 官网 */
  OFFICIAL = 'OFFICIAL',
  /** 外链 */
  EXTERNAL = 'EXTERNAL',
}
