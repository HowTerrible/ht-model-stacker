/** 产品种类：比例模型 / 工具辅料 */
export enum ProductKind {
  /** 比例模型 */
  MODEL = 'MODEL',
  /** 工具辅料 */
  TOOL_SUPPLY = 'TOOL_SUPPLY',
}

/** 模型子类（比例模型细分，可多选，用法同 tag 标记） */
export enum ModelType {
  /** 军事模型-坦克 */
  MILITARY_TANK = 'MILITARY_TANK',
  /** 军事模型-飞机 */
  MILITARY_AIRCRAFT = 'MILITARY_AIRCRAFT',
  /** 军事模型-军舰 */
  MILITARY_SHIP = 'MILITARY_SHIP',
  /** 军事模型-兵人 */
  MILITARY_FIGURE = 'MILITARY_FIGURE',
  /** 军事模型-轨道载具 */
  MILITARY_RAIL_VEHICLE = 'MILITARY_RAIL_VEHICLE',
  /** 民用模型-民用车 */
  CIVIL_CAR = 'CIVIL_CAR',
  /** 民用模型-摩托车 */
  CIVIL_MOTORCYCLE = 'CIVIL_MOTORCYCLE',
  /** 民用模型-轨道载具 */
  CIVIL_RAIL_VEHICLE = 'CIVIL_RAIL_VEHICLE',
  /** 手办 */
  FIGURINE = 'FIGURINE',
  /** 战旗（战棋） */
  WAR_GAME = 'WAR_GAME',
  /** 模型套改（改造 / 升级件） */
  UPGRADE_SET = 'UPGRADE_SET',
  /** 套件 */
  KIT = 'KIT',
  /** 场景模型 */
  SCENE_MODEL = 'SCENE_MODEL',
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

/** 材质 */
export enum Material {
  /** 塑料射出 */
  INJECTED_PLASTIC = 'INJECTED_PLASTIC',
  /** 乐高积木 */
  LEGO_BRICK = 'LEGO_BRICK',
  /** 3D 打印 */
  _3D_PRINTED = '3D_PRINTED',
  /** 树脂 */
  RESIN = 'RESIN',
  /** 蚀刻片（铜 / 钢） */
  PHOTO_ETCHED = 'PHOTO_ETCHED',
  /** 纸 / 布 */
  PAPER_FABRIC = 'PAPER_FABRIC',
  /** 石膏 / 纸黏土等塑性土 */
  PLASTER_CLAY = 'PLASTER_CLAY',
  /** 木 / 竹 */
  WOOD_BAMBOO = 'WOOD_BAMBOO',
  /** 亚克力板 */
  ACRYLIC_SHEET = 'ACRYLIC_SHEET',
  /** 泡沫板 */
  FOAM_BOARD = 'FOAM_BOARD',
  /** 其他金属 */
  OTHER_METAL = 'OTHER_METAL',
  /** 其他 */
  OTHER = 'OTHER',
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
