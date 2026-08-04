/** 烂尾（开封未完成）状态 */
export enum WipStatus {
  /** 烂尾中 */
  WIP = 'WIP',
  /** 已重启制作 */
  RESTARTED = 'RESTARTED',
  /** 最终完成 */
  FINISHED = 'FINISHED',
  /** 已弃置 / 处理 */
  SCRAPPED = 'SCRAPPED',
}

/**
 * 制作阶段（完成进度难以量化，改用阶段描述实际进度）
 */
export enum WipStage {
  /** 拆袋未组装 */
  UNASSEMBLED = 'UNASSEMBLED',
  /** 部分组装 */
  PARTIALLY_ASSEMBLED = 'PARTIALLY_ASSEMBLED',
  /** 组装完成未上色 */
  ASSEMBLED_UNPAINTED = 'ASSEMBLED_UNPAINTED',
  /** 部分上色 */
  PARTIALLY_PAINTED = 'PARTIALLY_PAINTED',
  /** 上色未旧化 */
  PAINTED_UNWEATHERED = 'PAINTED_UNWEATHERED',
  /** 部分旧化 */
  PARTIALLY_WEATHERED = 'PARTIALLY_WEATHERED',
  /** 未喷保护漆 */
  NO_TOPCOAT = 'NO_TOPCOAT',
}
