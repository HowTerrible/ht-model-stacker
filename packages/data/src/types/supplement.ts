import type { ReviewStatusEnum } from '../enums/common';
import type { SupplementTypeEnum } from '../enums/supplement';
import type { DateTimeString, Id, ReviewFields, TimestampFields } from './common';

/**
 * 资料补充申请。
 *
 * 堆积与资料库不强绑定：用户添加堆积时若资料库中没有对应产品 / 厂家，
 * 可一键提交补充申请；管理员审核并建库后，自动回填绑定到申请来源的堆积。
 */
export interface DataSupplementRequest extends TimestampFields, ReviewFields {
  id: Id;
  /** 申请人 ID */
  userId: Id;
  /** 来源堆积 ID（该申请由某个堆积发起） */
  stackId: Id;
  /** 申请类型：补充产品 / 补充厂家 */
  type: SupplementTypeEnum;
  /** 名称（产品名 / 厂家名） */
  name: string;
  /** 厂家名（type 为 PRODUCT 时补充，作为厂家匹配依据） */
  manufacturerName?: string;
  /** 补充说明 / 备注 */
  note?: string;
  /** 审核通过并建库后回填：关联的资料库产品 ID */
  linkedProductId?: Id;
  /** 审核通过并建库后回填：关联的资料库厂家 ID */
  linkedManufacturerId?: Id;
}

export interface DataSupplementRequestQuery {
  /** 申请人 */
  userId?: Id;
  /** 按来源堆积筛选 */
  stackId?: Id;
  type?: SupplementTypeEnum;
  reviewStatus?: ReviewStatusEnum;
  /** 按名称 / 备注模糊搜索 */
  keyword?: string;
  page?: number;
  pageSize?: number;
}