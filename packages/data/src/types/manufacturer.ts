import type { CommonStatus, ReviewStatus } from '../enums/common';
import type { DataSource, Id, ReviewFields, TimestampFields } from './common';

/** 产品厂家 / 品牌 */
export interface Manufacturer extends TimestampFields, ReviewFields {
  id: Id;
  /** 厂家 / 品牌简称 */
  name: string;
  /** 厂家全称 */
  fullName?: string;
  /** 国家 / 地区 */
  country?: string;
  /** 官网地址 */
  website?: string;
  /** 简介 */
  description?: string;
  /** Logo 图片地址 */
  logoUrl?: string;
  status: CommonStatus;
  /** 数据来源（格式：来源类型|备注） */
  dataSource?: DataSource;
}

export interface ManufacturerQuery {
  keyword?: string;
  country?: string;
  status?: CommonStatus;
  reviewStatus?: ReviewStatus;
  page?: number;
  pageSize?: number;
}
