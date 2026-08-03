/** 币种 */
export enum Currency {
  CNY = 'CNY',
  USD = 'USD',
  JPY = 'JPY',
  EUR = 'EUR',
  HKD = 'HKD',
  TWD = 'TWD',
  GBP = 'GBP',
}

/** 价格来源 */
export enum PriceSource {
  /** 手动录入 */
  MANUAL = 'MANUAL',
  /** 淘宝 */
  TAOBAO = 'TAOBAO',
  /** 京东 */
  JD = 'JD',
  /** 闲鱼 */
  XIANYU = 'XIANYU',
  /** 亚马逊 */
  AMAZON = 'AMAZON',
  /** 其他 */
  OTHER = 'OTHER',
}
