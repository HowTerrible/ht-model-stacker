/** 烂尾（开封未完成）状态 */
export enum WipStatus {
  /** 烂尾中 */
  ABANDONED = 'ABANDONED',
  /** 已重启制作 */
  RESTARTED = 'RESTARTED',
  /** 最终完成 */
  FINISHED = 'FINISHED',
  /** 已弃置 / 处理 */
  SCRAPPED = 'SCRAPPED',
}
