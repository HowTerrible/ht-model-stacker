/** 产品种类：比例模型 / 工具辅料 */
export enum ProductKind {
  /** 比例模型 */
  MODEL = 'MODEL',
  /** 工具辅料 */
  TOOL_SUPPLY = 'TOOL_SUPPLY',
}

/** 模型子类（比例模型四大类型细分） */
export enum ModelType {
  /** 军事模型-坦克 */
  MILITARY_TANK = 'MILITARY_TANK',
  /** 军事模型-飞机 */
  MILITARY_AIRCRAFT = 'MILITARY_AIRCRAFT',
  /** 军事模型-军舰 */
  MILITARY_SHIP = 'MILITARY_SHIP',
  /** 军事模型-兵人 */
  MILITARY_FIGURE = 'MILITARY_FIGURE',
  /** 民用模型-民用车 */
  CIVIL_CAR = 'CIVIL_CAR',
  /** 民用模型-摩托车 */
  CIVIL_MOTORCYCLE = 'CIVIL_MOTORCYCLE',
  /** 手办 */
  FIGURINE = 'FIGURINE',
  /** 战旗（战棋） */
  WAR_GAME = 'WAR_GAME',
}

/** 工具辅料子类 */
export enum ToolType {
  /** 颜料 */
  PAINT = 'PAINT',
  /** 笔刷 */
  BRUSH = 'BRUSH',
  /** 工具 */
  TOOL = 'TOOL',
  /** 改造件 / 辅料 */
  ACCESSORY = 'ACCESSORY',
  /** 其他 */
  OTHER = 'OTHER',
}

/** 常见模型比例 */
export enum ModelScale {
  S_1_12 = '1/12',
  S_1_16 = '1/16',
  S_1_24 = '1/24',
  S_1_32 = '1/32',
  S_1_35 = '1/35',
  S_1_48 = '1/48',
  S_1_72 = '1/72',
  S_1_100 = '1/100',
  S_1_144 = '1/144',
  S_1_350 = '1/350',
  S_1_700 = '1/700',
  /** 无比例（手办、景品等） */
  NON_SCALE = 'NON_SCALE',
}

/** 产品状态 */
export enum ProductStatus {
  /** 在售 */
  ON_SALE = 'ON_SALE',
  /** 停产 */
  DISCONTINUED = 'DISCONTINUED',
  /** 下架 / 隐藏 */
  INACTIVE = 'INACTIVE',
}
