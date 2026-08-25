import type { Material, ModelScale, ModelType, ProductKind, ProductStatus, ToolType } from '../enums/product';
import type { ReviewStatus } from '../enums/common';
import type { DateTimeString, Id, Image, ReviewFields, TimestampFields } from './common';

/** 产品（模型 / 工具辅料） */
export interface Product extends TimestampFields, ReviewFields {
  id: Id;
  /** 厂家 ID */
  manufacturerId: Id;
  /** 产品名称 */
  name: string;
  /** 产品官方名称（外盒 / 说明书上的标准原文，如进口模型的外语原名） */
  officialName?: string;
  /** 货号 / 型号 */
  modelNo?: string;
  /** 种类：模型 / 工具辅料 */
  kind: ProductKind;
  /** 模型子类（可多选，用法同 tag 标记） */
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
  manuals: Image[];
  /** 照片地址列表 */
  photos: Image[];
  /** 所属题材节点 ID（题材为树形结构，见 Theme） */
  themeId?: Id;
  /** 题材标签（用于关联竞品、检索） */
  tags: string[];
  status: ProductStatus;
}

export interface ProductQuery {
  keyword?: string;
  kind?: ProductKind;
  modelTypes?: ModelType[];
  /** 按主体材质筛选 */
  material?: Material;
  manufacturerId?: Id;
  /** 按题材节点筛选 */
  themeId?: Id;
  status?: ProductStatus;
  reviewStatus?: ReviewStatus;
  tags?: string[];
  year?: number;
  page?: number;
  pageSize?: number;
}
