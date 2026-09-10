import {
  ArticleStatus,
  ArticleType,
  CommonStatus,
  Currency,
  Material,
  ModelScale,
  ModelType,
  PriceSource,
  ProductKind,
  ProductRelationType,
  ProductStatus,
  PurchaseChannel,
  ReviewStatus,
  SourceType,
  StackStatus,
  ToolType,
} from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 通用工具类型
// ---------------------------------------------------------------------------

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

// ---------------------------------------------------------------------------
// 通用状态 (CommonStatus)
// ---------------------------------------------------------------------------

export const commonStatusOptions: SelectOption<CommonStatus>[] = [
  { value: CommonStatus.ACTIVE, label: '启用' },
  { value: CommonStatus.INACTIVE, label: '停用' },
];

export const commonStatusLabels: Record<CommonStatus, string> = {
  [CommonStatus.ACTIVE]: '启用',
  [CommonStatus.INACTIVE]: '停用',
};

export const commonStatusTagTypes: Record<CommonStatus, TagType> = {
  [CommonStatus.ACTIVE]: 'success',
  [CommonStatus.INACTIVE]: 'info',
};

// ---------------------------------------------------------------------------
// 审核状态 (ReviewStatus)
// ---------------------------------------------------------------------------

export const reviewStatusOptions: SelectOption<ReviewStatus>[] = [
  { value: ReviewStatus.PENDING, label: '待审核' },
  { value: ReviewStatus.APPROVED, label: '审核通过' },
  { value: ReviewStatus.REJECTED, label: '审核拒绝' },
];

export const reviewStatusLabels: Record<ReviewStatus, string> = {
  [ReviewStatus.PENDING]: '待审核',
  [ReviewStatus.APPROVED]: '审核通过',
  [ReviewStatus.REJECTED]: '审核拒绝',
};

export const reviewStatusTagTypes: Record<ReviewStatus, TagType> = {
  [ReviewStatus.PENDING]: 'warning',
  [ReviewStatus.APPROVED]: 'success',
  [ReviewStatus.REJECTED]: 'danger',
};

// ---------------------------------------------------------------------------
// 数据来源类型 (SourceType)
// ---------------------------------------------------------------------------

export const sourceTypeOptions: SelectOption<SourceType>[] = [
  { value: SourceType.ORIGINAL, label: '原创' },
  { value: SourceType.OFFICIAL, label: '官网' },
  { value: SourceType.EXTERNAL, label: '外链' },
];

export const sourceTypeLabels: Record<SourceType, string> = {
  [SourceType.ORIGINAL]: '原创',
  [SourceType.OFFICIAL]: '官网',
  [SourceType.EXTERNAL]: '外链',
};

// ---------------------------------------------------------------------------
// 产品种类 (ProductKind)
// ---------------------------------------------------------------------------

export const kindOptions: SelectOption<ProductKind>[] = [
  { value: ProductKind.MODEL, label: '比例模型' },
  { value: ProductKind.TOOL_SUPPLY, label: '工具辅料' },
];

export const kindLabels: Record<ProductKind, string> = {
  [ProductKind.MODEL]: '比例模型',
  [ProductKind.TOOL_SUPPLY]: '工具辅料',
};

export const kindTagTypes: Record<ProductKind, TagType> = {
  [ProductKind.MODEL]: 'primary',
  [ProductKind.TOOL_SUPPLY]: 'info',
};

// ---------------------------------------------------------------------------
// 模型子类 (ModelType)
// ---------------------------------------------------------------------------

export const modelTypeOptions: SelectOption<ModelType>[] = [
  { value: ModelType.MILITARY_TANK, label: '军事-坦克' },
  { value: ModelType.MILITARY_AIRCRAFT, label: '军事-飞机' },
  { value: ModelType.MILITARY_SHIP, label: '军事-军舰' },
  { value: ModelType.MILITARY_FIGURE, label: '军事-兵人' },
  { value: ModelType.MILITARY_RAIL_VEHICLE, label: '军事-轨道载具' },
  { value: ModelType.CIVIL_CAR, label: '民用-民用车' },
  { value: ModelType.CIVIL_MOTORCYCLE, label: '民用-摩托车' },
  { value: ModelType.CIVIL_RAIL_VEHICLE, label: '民用-轨道载具' },
  { value: ModelType.FIGURINE, label: '手办' },
  { value: ModelType.WAR_GAME, label: '战旗（战棋）' },
  { value: ModelType.UPGRADE_SET, label: '模型套改' },
  { value: ModelType.KIT, label: '套件' },
  { value: ModelType.SCENE_MODEL, label: '场景模型' },
];

export const modelTypeLabels: Record<ModelType, string> = Object.fromEntries(
  modelTypeOptions.map((o) => [o.value, o.label]),
) as Record<ModelType, string>;

// ---------------------------------------------------------------------------
// 工具辅料子类 (ToolType)
// ---------------------------------------------------------------------------

export const toolTypeOptions: SelectOption<ToolType>[] = [
  { value: ToolType.PAINT, label: '颜料' },
  { value: ToolType.BRUSH, label: '笔刷' },
  { value: ToolType.TOOL, label: '工具' },
  { value: ToolType.ACCESSORY, label: '改造件/辅料' },
  { value: ToolType.OTHER, label: '其他' },
];

export const toolTypeLabels: Record<ToolType, string> = Object.fromEntries(
  toolTypeOptions.map((o) => [o.value, o.label]),
) as Record<ToolType, string>;

// ---------------------------------------------------------------------------
// 产品状态 (ProductStatus)
// ---------------------------------------------------------------------------

export const productStatusOptions: SelectOption<ProductStatus>[] = [
  { value: ProductStatus.ON_SALE, label: '在售' },
  { value: ProductStatus.DISCONTINUED, label: '停产' },
  { value: ProductStatus.INACTIVE, label: '下架/隐藏' },
];

export const productStatusLabels: Record<ProductStatus, string> = {
  [ProductStatus.ON_SALE]: '在售',
  [ProductStatus.DISCONTINUED]: '停产',
  [ProductStatus.INACTIVE]: '下架/隐藏',
};

export const productStatusTagTypes: Record<ProductStatus, TagType> = {
  [ProductStatus.ON_SALE]: 'success',
  [ProductStatus.DISCONTINUED]: 'warning',
  [ProductStatus.INACTIVE]: 'info',
};

// ---------------------------------------------------------------------------
// 模型比例 (ModelScale)
// ---------------------------------------------------------------------------

export const modelScaleOptions: SelectOption<ModelScale>[] = [
  { value: ModelScale.S_1_12, label: '1/12' },
  { value: ModelScale.S_1_16, label: '1/16' },
  { value: ModelScale.S_1_24, label: '1/24' },
  { value: ModelScale.S_1_32, label: '1/32' },
  { value: ModelScale.S_1_35, label: '1/35' },
  { value: ModelScale.S_1_48, label: '1/48' },
  { value: ModelScale.S_1_64, label: '1/64' },
  { value: ModelScale.S_1_72, label: '1/72' },
  { value: ModelScale.S_1_87, label: '1/87 (HO)' },
  { value: ModelScale.S_1_100, label: '1/100' },
  { value: ModelScale.S_1_144, label: '1/144' },
  { value: ModelScale.S_1_160, label: '1/160 (N)' },
  { value: ModelScale.S_1_220, label: '1/220 (Z)' },
  { value: ModelScale.S_1_350, label: '1/350' },
  { value: ModelScale.S_1_700, label: '1/700' },
  { value: ModelScale.NON_SCALE, label: '无比例' },
  { value: ModelScale.OTHER, label: '其他' },
];

export const modelScaleLabels: Record<ModelScale, string> = Object.fromEntries(
  modelScaleOptions.map((o) => [o.value, o.label]),
) as Record<ModelScale, string>;

// ---------------------------------------------------------------------------
// 材质 (Material)
// ---------------------------------------------------------------------------

export const materialOptions: SelectOption<Material>[] = [
  { value: Material.INJECTED_PLASTIC, label: '塑料射出' },
  { value: Material.LEGO_BRICK, label: '乐高积木' },
  { value: Material._3D_PRINTED, label: '3D 打印' },
  { value: Material.RESIN, label: '树脂' },
  { value: Material.PHOTO_ETCHED, label: '蚀刻片' },
  { value: Material.PAPER_FABRIC, label: '纸/布' },
  { value: Material.PLASTER_CLAY, label: '石膏/纸黏土' },
  { value: Material.WOOD_BAMBOO, label: '木/竹' },
  { value: Material.ACRYLIC_SHEET, label: '亚克力板' },
  { value: Material.FOAM_BOARD, label: '泡沫板' },
  { value: Material.OTHER_METAL, label: '其他金属' },
  { value: Material.OTHER, label: '其他' },
];

export const materialLabels: Record<Material, string> = Object.fromEntries(
  materialOptions.map((o) => [o.value, o.label]),
) as Record<Material, string>;

// ---------------------------------------------------------------------------
// 堆积状态 (StackStatus)
// ---------------------------------------------------------------------------

export const stackStatusOptions: SelectOption<StackStatus>[] = [
  { value: StackStatus.UNSTARTED, label: '未开封（堆积中）' },
  { value: StackStatus.OPENED, label: '已开封' },
  { value: StackStatus.IN_PROGRESS, label: '制作中' },
  { value: StackStatus.FINISHED, label: '已完成' },
  { value: StackStatus.WIP, label: '烂尾' },
  { value: StackStatus.USED_UP, label: '已用完' },
  { value: StackStatus.EXPIRED, label: '已过期' },
  { value: StackStatus.SOLD, label: '已出/转让' },
];

export const stackStatusLabels: Record<StackStatus, string> = {
  [StackStatus.UNSTARTED]: '未开封',
  [StackStatus.OPENED]: '已开封',
  [StackStatus.IN_PROGRESS]: '制作中',
  [StackStatus.FINISHED]: '已完成',
  [StackStatus.WIP]: '烂尾',
  [StackStatus.USED_UP]: '已用完',
  [StackStatus.EXPIRED]: '已过期',
  [StackStatus.SOLD]: '已出/转让',
};

export const stackStatusTagTypes: Record<StackStatus, TagType> = {
  [StackStatus.UNSTARTED]: 'warning',
  [StackStatus.OPENED]: 'primary',
  [StackStatus.IN_PROGRESS]: 'primary',
  [StackStatus.FINISHED]: 'success',
  [StackStatus.WIP]: 'danger',
  [StackStatus.USED_UP]: 'info',
  [StackStatus.EXPIRED]: 'info',
  [StackStatus.SOLD]: 'info',
};

// ---------------------------------------------------------------------------
// 购买渠道 (PurchaseChannel)
// ---------------------------------------------------------------------------

export const purchaseChannelOptions: SelectOption<PurchaseChannel>[] = [
  { value: PurchaseChannel.TAOBAO, label: '淘宝' },
  { value: PurchaseChannel.JD, label: '京东' },
  { value: PurchaseChannel.PDD, label: '拼多多' },
  { value: PurchaseChannel.XIANYU, label: '闲鱼' },
  { value: PurchaseChannel.OFFLINE, label: '线下实体店' },
  { value: PurchaseChannel.OVERSEAS, label: '海外购买' },
  { value: PurchaseChannel.OTHER, label: '其他' },
];

export const purchaseChannelLabels: Record<PurchaseChannel, string> = {
  [PurchaseChannel.TAOBAO]: '淘宝',
  [PurchaseChannel.JD]: '京东',
  [PurchaseChannel.PDD]: '拼多多',
  [PurchaseChannel.XIANYU]: '闲鱼',
  [PurchaseChannel.OFFLINE]: '线下实体店',
  [PurchaseChannel.OVERSEAS]: '海外购买',
  [PurchaseChannel.OTHER]: '其他',
};

// ---------------------------------------------------------------------------
// 币种 (Currency)
// ---------------------------------------------------------------------------

export const currencyOptions: SelectOption<Currency>[] = [
  { value: Currency.CNY, label: '人民币 CNY' },
  { value: Currency.USD, label: '美元 USD' },
  { value: Currency.JPY, label: '日元 JPY' },
  { value: Currency.HKD, label: '港币 HKD' },
  { value: Currency.EUR, label: '欧元 EUR' },
  { value: Currency.TWD, label: '新台币 TWD' },
  { value: Currency.GBP, label: '英镑 GBP' },
];

export const currencyLabels: Record<Currency, string> = {
  [Currency.CNY]: '人民币',
  [Currency.USD]: '美元',
  [Currency.JPY]: '日元',
  [Currency.HKD]: '港币',
  [Currency.EUR]: '欧元',
  [Currency.TWD]: '新台币',
  [Currency.GBP]: '英镑',
};

export const currencySymbols: Record<Currency, string> = {
  [Currency.CNY]: '¥',
  [Currency.USD]: '$',
  [Currency.JPY]: 'JP¥',
  [Currency.HKD]: 'HK$',
  [Currency.EUR]: '€',
  [Currency.TWD]: 'NT$',
  [Currency.GBP]: '£',
};

// ---------------------------------------------------------------------------
// 价格来源 (PriceSource)
// ---------------------------------------------------------------------------

export const priceSourceOptions: SelectOption<PriceSource>[] = [
  { value: PriceSource.MANUAL, label: '手动录入' },
  { value: PriceSource.TAOBAO, label: '淘宝' },
  { value: PriceSource.JD, label: '京东' },
  { value: PriceSource.XIANYU, label: '闲鱼' },
  { value: PriceSource.AMAZON, label: '亚马逊' },
  { value: PriceSource.OTHER, label: '其他' },
];

export const priceSourceLabels: Record<PriceSource, string> = {
  [PriceSource.MANUAL]: '手动录入',
  [PriceSource.TAOBAO]: '淘宝',
  [PriceSource.JD]: '京东',
  [PriceSource.XIANYU]: '闲鱼',
  [PriceSource.AMAZON]: '亚马逊',
  [PriceSource.OTHER]: '其他',
};

// ---------------------------------------------------------------------------
// 产品关联类型 (ProductRelationType)
// ---------------------------------------------------------------------------

export const productRelationTypeOptions: SelectOption<ProductRelationType>[] = [
  { value: ProductRelationType.COMPETITOR, label: '竞品' },
  { value: ProductRelationType.SERIES, label: '同系列' },
  { value: ProductRelationType.OTHER, label: '其他关联' },
];

export const productRelationTypeLabels: Record<ProductRelationType, string> = {
  [ProductRelationType.COMPETITOR]: '竞品',
  [ProductRelationType.SERIES]: '同系列',
  [ProductRelationType.OTHER]: '其他关联',
};

// ---------------------------------------------------------------------------
// 文章类型 (ArticleType)
// ---------------------------------------------------------------------------

export const articleTypeOptions: SelectOption<ArticleType>[] = [
  { value: ArticleType.TRIVIA, label: '产品趣闻' },
  { value: ArticleType.REFERENCE, label: '参考文献' },
  { value: ArticleType.TIPS, label: '制作窍门/小技巧' },
];

export const articleTypeLabels: Record<ArticleType, string> = {
  [ArticleType.TRIVIA]: '产品趣闻',
  [ArticleType.REFERENCE]: '参考文献',
  [ArticleType.TIPS]: '制作窍门/小技巧',
};

// ---------------------------------------------------------------------------
// 文章状态 (ArticleStatus)
// ---------------------------------------------------------------------------

export const articleStatusOptions: SelectOption<ArticleStatus>[] = [
  { value: ArticleStatus.DRAFT, label: '草稿' },
  { value: ArticleStatus.PUBLISHED, label: '已发布' },
  { value: ArticleStatus.ARCHIVED, label: '已下线' },
];

export const articleStatusLabels: Record<ArticleStatus, string> = {
  [ArticleStatus.DRAFT]: '草稿',
  [ArticleStatus.PUBLISHED]: '已发布',
  [ArticleStatus.ARCHIVED]: '已下线',
};

export const articleStatusTagTypes: Record<ArticleStatus, TagType> = {
  [ArticleStatus.DRAFT]: 'info',
  [ArticleStatus.PUBLISHED]: 'success',
  [ArticleStatus.ARCHIVED]: 'warning',
};
