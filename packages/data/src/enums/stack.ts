/** 堆积（已购买模型）状态 */
export enum StackStatus {
  /** 未开工（堆积中） */
  UNSTARTED = 'UNSTARTED',
  /** 制作中 */
  IN_PROGRESS = 'IN_PROGRESS',
  /** 已完成 */
  FINISHED = 'FINISHED',
  /** 烂尾（已转为烂尾记录） */
  WIP = 'WIP',
  /** 已出 / 转让 */
  SOLD = 'SOLD',
}

/** 购买渠道 */
export enum PurchaseChannel {
  /** 淘宝 */
  TAOBAO = 'TAOBAO',
  /** 京东 */
  JD = 'JD',
  /** 闲鱼 */
  XIANYU = 'XIANYU',
  /** 线下实体店 */
  OFFLINE = 'OFFLINE',
  /** 海外购买 */
  OVERSEAS = 'OVERSEAS',
  /** 其他 */
  OTHER = 'OTHER',
}
