import { ArticleStatusEnum, ArticleTypeEnum } from './enums/article';
import { CommonStatusEnum, ReviewStatusEnum, SourceTypeEnum } from './enums/common';
import { PriceSourceEnum, CurrencyEnum } from './enums/price';
import {
  MaterialEnum,
  ModelScaleEnum,
  ModelTypeEnum,
  ProductKindEnum,
  ProductStatusEnum,
  ToolTypeEnum,
} from './enums/product';
import { ProductRelationTypeEnum } from './enums/relation';
import { PurchaseChannelEnum, StackStatusEnum } from './enums/stack';

// ---------------------------------------------------------------------------
// 显示表：枚举值 → 中文展示文案
// 每个枚举一张「显示表」，是选项 / 标签的唯一事实来源：
// - 键 = 枚举值（稳定标识，与 DB / API 一致）；
// - 值 = 中文文案（可为任意字符串，不受 TS 标识符规则限制）。
// 新增枚举成员时，`Record<枚举, string>` 的穷尽校验会强制提示补全显示表。
// ---------------------------------------------------------------------------

/** 文章类型显示表 */
export const articleTypeLabels: Record<ArticleTypeEnum, string> = {
  [ArticleTypeEnum.TRIVIA]: '产品趣闻',
  [ArticleTypeEnum.REFERENCE]: '参考文献',
  [ArticleTypeEnum.TIPS]: '制作窍门/小技巧',
};

/** 文章状态显示表 */
export const articleStatusLabels: Record<ArticleStatusEnum, string> = {
  [ArticleStatusEnum.DRAFT]: '草稿',
  [ArticleStatusEnum.PUBLISHED]: '已发布',
  [ArticleStatusEnum.ARCHIVED]: '已下线',
};

/** 启用状态显示表 */
export const commonStatusLabels: Record<CommonStatusEnum, string> = {
  [CommonStatusEnum.ACTIVE]: '启用',
  [CommonStatusEnum.INACTIVE]: '停用',
};

/** 审核状态显示表 */
export const reviewStatusLabels: Record<ReviewStatusEnum, string> = {
  [ReviewStatusEnum.PENDING]: '待审核',
  [ReviewStatusEnum.APPROVED]: '审核通过',
  [ReviewStatusEnum.REJECTED]: '审核拒绝',
};

/** 数据来源类型显示表 */
export const sourceTypeLabels: Record<SourceTypeEnum, string> = {
  [SourceTypeEnum.ORIGINAL]: '原创',
  [SourceTypeEnum.OFFICIAL]: '官网',
  [SourceTypeEnum.EXTERNAL]: '外链',
};

/** 产品种类显示表 */
export const kindLabels: Record<ProductKindEnum, string> = {
  [ProductKindEnum.MODEL]: '比例模型',
  [ProductKindEnum.TOOL_SUPPLY]: '工具辅料',
};

/** 模型子类显示表 */
export const modelTypeLabels: Record<ModelTypeEnum, string> = {
  [ModelTypeEnum.MILITARY_TANK]: '军事-坦克',
  [ModelTypeEnum.MILITARY_AIRCRAFT]: '军事-飞机',
  [ModelTypeEnum.MILITARY_SHIP]: '军事-军舰',
  [ModelTypeEnum.MILITARY_FIGURE]: '军事-兵人',
  [ModelTypeEnum.MILITARY_RAIL_VEHICLE]: '军事-轨道载具',
  [ModelTypeEnum.CIVIL_CAR]: '民用-民用车',
  [ModelTypeEnum.CIVIL_MOTORCYCLE]: '民用-摩托车',
  [ModelTypeEnum.CIVIL_RAIL_VEHICLE]: '民用-轨道载具',
  [ModelTypeEnum.FIGURINE]: '手办',
  [ModelTypeEnum.WAR_GAME]: '战旗（战棋）',
  [ModelTypeEnum.UPGRADE_SET]: '模型套改',
  [ModelTypeEnum.KIT]: '套件',
  [ModelTypeEnum.SCENE_MODEL]: '场景模型',
};

/** 工具辅料子类显示表 */
export const toolTypeLabels: Record<ToolTypeEnum, string> = {
  [ToolTypeEnum.PAINT]: '颜料',
  [ToolTypeEnum.BRUSH]: '笔刷',
  [ToolTypeEnum.TOOL]: '工具',
  [ToolTypeEnum.ACCESSORY]: '改造件/辅料',
  [ToolTypeEnum.OTHER]: '其他',
};

/** 产品状态显示表 */
export const productStatusLabels: Record<ProductStatusEnum, string> = {
  [ProductStatusEnum.ON_SALE]: '在售',
  [ProductStatusEnum.DISCONTINUED]: '停产',
  [ProductStatusEnum.INACTIVE]: '下架/隐藏',
};

/** 模型比例显示表（部分枚举值 ≠ 展示文案，如 '1/87' → '1/87 (HO)'） */
export const modelScaleLabels: Record<ModelScaleEnum, string> = {
  [ModelScaleEnum.S_1_12]: '1/12',
  [ModelScaleEnum.S_1_16]: '1/16',
  [ModelScaleEnum.S_1_24]: '1/24',
  [ModelScaleEnum.S_1_32]: '1/32',
  [ModelScaleEnum.S_1_35]: '1/35',
  [ModelScaleEnum.S_1_48]: '1/48',
  [ModelScaleEnum.S_1_64]: '1/64',
  [ModelScaleEnum.S_1_72]: '1/72',
  [ModelScaleEnum.S_1_87]: '1/87 (HO)',
  [ModelScaleEnum.S_1_100]: '1/100',
  [ModelScaleEnum.S_1_144]: '1/144',
  [ModelScaleEnum.S_1_160]: '1/160 (N)',
  [ModelScaleEnum.S_1_220]: '1/220 (Z)',
  [ModelScaleEnum.S_1_350]: '1/350',
  [ModelScaleEnum.S_1_700]: '1/700',
  [ModelScaleEnum.NON_SCALE]: '无比例',
  [ModelScaleEnum.OTHER]: '其他',
};

/** 材质显示表 */
export const materialLabels: Record<MaterialEnum, string> = {
  [MaterialEnum.INJECTED_PLASTIC]: '塑料射出',
  [MaterialEnum.LEGO_BRICK]: '乐高积木',
  [MaterialEnum._3D_PRINTED]: '3D 打印',
  [MaterialEnum.RESIN]: '树脂',
  [MaterialEnum.PHOTO_ETCHED]: '蚀刻片',
  [MaterialEnum.PAPER_FABRIC]: '纸/布',
  [MaterialEnum.PLASTER_CLAY]: '石膏/纸黏土',
  [MaterialEnum.WOOD_BAMBOO]: '木/竹',
  [MaterialEnum.ACRYLIC_SHEET]: '亚克力板',
  [MaterialEnum.FOAM_BOARD]: '泡沫板',
  [MaterialEnum.OTHER_METAL]: '其他金属',
  [MaterialEnum.OTHER]: '其他',
};

/** 堆积状态显示表（短文案；选项中的扩写文案由组件层 formatLabel 派生） */
export const stackStatusLabels: Record<StackStatusEnum, string> = {
  [StackStatusEnum.UNSTARTED]: '未开封',
  [StackStatusEnum.OPENED]: '已开封',
  [StackStatusEnum.IN_PROGRESS]: '制作中',
  [StackStatusEnum.FINISHED]: '已完成',
  [StackStatusEnum.WIP]: '烂尾',
  [StackStatusEnum.USED_UP]: '已用完',
  [StackStatusEnum.EXPIRED]: '已过期',
  [StackStatusEnum.SOLD]: '已出/转让',
};

/** 购买渠道显示表 */
export const purchaseChannelLabels: Record<PurchaseChannelEnum, string> = {
  [PurchaseChannelEnum.TAOBAO]: '淘宝',
  [PurchaseChannelEnum.JD]: '京东',
  [PurchaseChannelEnum.PDD]: '拼多多',
  [PurchaseChannelEnum.XIANYU]: '闲鱼',
  [PurchaseChannelEnum.OFFLINE]: '线下实体店',
  [PurchaseChannelEnum.OVERSEAS]: '海外购买',
  [PurchaseChannelEnum.OTHER]: '其他',
};

/** 币种显示表（简称；选项可借助 formatLabel 拼出带 ISO 码的完整文案） */
export const currencyLabels: Record<CurrencyEnum, string> = {
  [CurrencyEnum.CNY]: '人民币',
  [CurrencyEnum.USD]: '美元',
  [CurrencyEnum.JPY]: '日元',
  [CurrencyEnum.HKD]: '港币',
  [CurrencyEnum.EUR]: '欧元',
  [CurrencyEnum.TWD]: '新台币',
  [CurrencyEnum.GBP]: '英镑',
};

/** 价格来源显示表 */
export const priceSourceLabels: Record<PriceSourceEnum, string> = {
  [PriceSourceEnum.MANUAL]: '手动录入',
  [PriceSourceEnum.TAOBAO]: '淘宝',
  [PriceSourceEnum.JD]: '京东',
  [PriceSourceEnum.XIANYU]: '闲鱼',
  [PriceSourceEnum.AMAZON]: '亚马逊',
  [PriceSourceEnum.OTHER]: '其他',
};

/** 产品关联类型显示表 */
export const productRelationTypeLabels: Record<ProductRelationTypeEnum, string> = {
  [ProductRelationTypeEnum.COMPETITOR]: '竞品',
  [ProductRelationTypeEnum.SERIES]: '同系列',
  [ProductRelationTypeEnum.OTHER]: '其他关联',
};

// ---------------------------------------------------------------------------
// 显示表 → 选项数组
// ---------------------------------------------------------------------------

export interface EnumToOptionsOptions<TValue extends string> {
  /** 需要排除的枚举值（如不想出现在选项里的「其他」） */
  exclude?: readonly TValue[];
  /** 自定义顺序；未列出的值按显示表声明顺序跟在后面 */
  order?: readonly TValue[];
  /** 自定义选项文案；如币种选项 '人民币 CNY' = 显示表 '人民币' + ISO 码 */
  formatLabel?: (value: TValue, label: string) => string;
}

/**
 * 由显示表派生下拉 / 多选选项数组。
 * 模板中取文案仍用 `labels[value]`（O(1)，无需反转）。
 */
export function enumToOptions<TValue extends string>(
  labels: Record<TValue, string>,
  options?: EnumToOptionsOptions<TValue>,
): Array<{ value: TValue; label: string }> {
  const entries = Object.entries(labels) as Array<[TValue, string]>;
  const filtered = options?.exclude?.length
    ? entries.filter(([value]) => !(options.exclude as readonly TValue[]).includes(value))
    : entries;

  const toOption = ([value, label]: [TValue, string]) => ({
    value,
    label: options?.formatLabel ? options.formatLabel(value, label) : label,
  });

  if (!options?.order?.length) {
    return filtered.map(toOption);
  }

  const order = options.order as readonly TValue[];
  const head = order
    .filter((value) => Object.prototype.hasOwnProperty.call(labels, value))
    .map((value) => [value, labels[value]] as [TValue, string]);
  const tail = filtered.filter(([value]) => !order.includes(value));
  return [...head, ...tail].map(toOption);
}