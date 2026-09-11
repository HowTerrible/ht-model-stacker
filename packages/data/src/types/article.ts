import type { ArticleStatusEnum, ArticleTypeEnum } from '../enums/article';
import type { ReviewStatusEnum } from '../enums/common';
import type { DataSource, DateTimeString, Id, ReviewFields, TimestampFields } from './common';

/** 富文本文章（产品趣闻、参考文献、制作窍门 / 小技巧、评测、科普等），与产品、厂家多对多关联 */
export interface Article extends TimestampFields, ReviewFields {
  id: Id;
  /** 标题 */
  title: string;
  /** 文章类型 */
  type: ArticleTypeEnum;
  /** 富文本内容（HTML / Markdown 字符串） */
  content: string;
  /** 原文出处链接 */
  sourceUrl?: string;
  /** 关联产品 ID 列表（多对多，如多款同题材对比评测） */
  productIds: Id[];
  /** 关联厂家 ID 列表（多对多，如多厂家历史介绍） */
  manufacturerIds: Id[];
  /** 标签 */
  tags: string[];
  status: ArticleStatusEnum;
  /** 数据来源（格式：来源类型|备注） */
  dataSource?: DataSource;
}

export interface ArticleQuery {
  /** 按标题 / 内容模糊搜索 */
  keyword?: string;
  type?: ArticleTypeEnum;
  productId?: Id;
  manufacturerId?: Id;
  status?: ArticleStatusEnum;
  reviewStatus?: ReviewStatusEnum;
  page?: number;
  pageSize?: number;
}
