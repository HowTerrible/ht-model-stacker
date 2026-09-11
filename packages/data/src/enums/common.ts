/** 通用权限码（存储于 User.permissions 的 JSON 数组中） */
export enum PermissionEnum {
  /** 管理员：可审核提交、管理资料库 */
  ADMIN = 'ADMIN',
}

/** 通用启用状态 */
export enum CommonStatusEnum {
  /** 启用 */
  ACTIVE = 'ACTIVE',
  /** 停用 */
  INACTIVE = 'INACTIVE',
}

/** 审核状态 */
export enum ReviewStatusEnum {
  /** 待审核 */
  PENDING = 'PENDING',
  /** 审核通过 */
  APPROVED = 'APPROVED',
  /** 审核拒绝 */
  REJECTED = 'REJECTED',
}

/** 数据来源类型 */
export enum SourceTypeEnum {
  /** 原创 */
  ORIGINAL = 'ORIGINAL',
  /** 官网 */
  OFFICIAL = 'OFFICIAL',
  /** 外链 */
  EXTERNAL = 'EXTERNAL',
}
