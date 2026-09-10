import type { ReviewStatus } from '../enums/common';
import type { Material, ModelScale, ModelType, ProductKind, ToolType } from '../enums/product';
import type { DataSource, DateTimeString, Id, ReviewFields, TimestampFields } from './common';

/**
 * 厂家提交（用户提交 / 管理员审核）。
 *
 * 方案B：用户提交的厂家资料先落在独立「提交箱」，管理员审核通过后
 * 合并进正式资料库 Manufacturer，并回填 linkedManufacturerId。
 * 与 DataSupplementRequest（堆积一键补库申请）不同，这里是完整的厂家资料条目。
 */
export interface ManufacturerSubmission extends TimestampFields, ReviewFields {
  id: Id;
  /** 提交人 ID（查询本人的提交数据时，按 userId 直接过滤） */
  userId: Id;
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
  /** 数据来源（格式：来源类型|备注） */
  dataSource?: DataSource;
  /** 提交人补充说明 */
  note?: string;
  /** 审核通过并建库后回填：关联的正式厂家 ID */
  linkedManufacturerId?: Id;
}

/** 厂家提交查询参数 */
export interface ManufacturerSubmissionQuery {
  /** 提交人 */
  userId?: Id;
  reviewStatus?: ReviewStatus;
  /** 按名称 / 简介模糊搜索 */
  keyword?: string;
  page?: number;
  pageSize?: number;
}

/** 厂家提交入参（用户填写内容） */
export type ManufacturerSubmissionInput = Pick<
  ManufacturerSubmission,
  'name' | 'fullName' | 'country' | 'website' | 'description' | 'logoUrl' | 'dataSource' | 'note'
>;

/**
 * 产品提交（用户提交 / 管理员审核）。
 *
 * 方案B：用户提交的产品资料先落在独立「提交箱」，管理员审核通过后
 * 合并进正式资料库 Product。
 * 提交产品不强制关联已有厂家：有则填 manufacturerId，没有可填
 * manufacturerName 自由文本（审核建库 / 建厂家后回填关联）。
 */
export interface ProductSubmission extends TimestampFields, ReviewFields {
  id: Id;
  /** 提交人 ID */
  userId: Id;
  /** 关联的已有厂家 ID（可选，不强绑定） */
  manufacturerId?: Id;
  /** 厂家名（未关联已有厂家时填写，作为厂家匹配 / 新建依据） */
  manufacturerName?: string;
  /** 所属题材节点 ID（可选） */
  themeId?: Id;
  /** 产品名称 */
  name: string;
  /** 产品官方名称 */
  officialName?: string;
  /** 货号 / 型号 */
  modelNo?: string;
  /** 种类：模型 / 工具辅料 */
  kind: ProductKind;
  /** 模型子类（可多选） */
  modelTypes: ModelType[];
  /** 工具辅料子类 */
  toolType?: ToolType;
  /** 主体材质 */
  material?: Material;
  /** 配件（材质枚举数组） */
  accessoryMaterials: Material[];
  /** 比例 */
  scale?: ModelScale | string;
  /** 发售年份 */
  year?: number;
  /** 发售日期 */
  releaseDate?: DateTimeString;
  /** 简介 */
  description?: string;
  /** 说明书图片地址列表 */
  manuals: string[];
  /** 照片地址列表 */
  photos: string[];
  /** 题材标签 */
  tags: string[];
  dataSource?: DataSource;
  manualsSource?: DataSource;
  photosSource?: DataSource;
  /** 提交人补充说明 */
  note?: string;
  /** 审核通过并建库后回填：关联的正式产品 ID */
  linkedProductId?: Id;
  /** 审核通过并建库后回填：关联的正式厂家 ID */
  linkedManufacturerId?: Id;
}

/** 产品提交查询参数 */
export interface ProductSubmissionQuery {
  /** 提交人 */
  userId?: Id;
  kind?: ProductKind;
  manufacturerId?: Id;
  reviewStatus?: ReviewStatus;
  /** 按名称 / 备注模糊搜索 */
  keyword?: string;
  page?: number;
  pageSize?: number;
}

/** 产品提交入参（用户填写内容） */
export type ProductSubmissionInput = Omit<
  ProductSubmission,
  | 'id'
  | 'userId'
  | 'reviewStatus'
  | 'reviewDate'
  | 'reviewerId'
  | 'reviewNote'
  | 'linkedProductId'
  | 'linkedManufacturerId'
  | 'createdAt'
  | 'updatedAt'
  | 'accessoryMaterials'
  | 'manuals'
  | 'photos'
  | 'tags'
>;
