/** 文章类型 */
export enum ArticleTypeEnum {
  /** 产品趣闻 */
  TRIVIA = 'TRIVIA',
  /** 参考文献 */
  REFERENCE = 'REFERENCE',
  /** 制作窍门 / 小技巧 */
  TIPS = 'TIPS',
}

/** 文章状态 */
export enum ArticleStatusEnum {
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 已发布 */
  PUBLISHED = 'PUBLISHED',
  /** 已下线 */
  ARCHIVED = 'ARCHIVED',
}
