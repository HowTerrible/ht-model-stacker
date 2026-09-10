/** 堆积（已购买物品）状态 */
export enum StackStatus {
  /** 未开封（堆积中） */
  UNSTARTED = 'UNSTARTED',
  /** 已开封 */
  OPENED = 'OPENED',
  /** 制作中 / 使用中 */
  IN_PROGRESS = 'IN_PROGRESS',
  /** 已完成 */
  FINISHED = 'FINISHED',
  /** 烂尾（已转为烂尾记录） */
  WIP = 'WIP',
  /** 已用完（日用品、五金等消耗品） */
  USED_UP = 'USED_UP',
  /** 已过期 */
  EXPIRED = 'EXPIRED',
  /** 已出 / 转让 */
  SOLD = 'SOLD',
}

/** 购买渠道 */
export enum PurchaseChannel {
  /** 淘宝 */
  TAOBAO = 'TAOBAO',
  /** 京东 */
  JD = 'JD',
  /** 拼多多 */
  PDD = 'PDD',
  /** 闲鱼 */
  XIANYU = 'XIANYU',
  /** 线下实体店 */
  OFFLINE = 'OFFLINE',
  /** 海外购买 */
  OVERSEAS = 'OVERSEAS',
  /** 其他 */
  OTHER = 'OTHER',
}
