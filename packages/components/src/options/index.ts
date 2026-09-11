import {
  ArticleStatusEnum,
  ArticleTypeEnum,
  CommonStatusEnum,
  CurrencyEnum,
  MaterialEnum,
  ModelScaleEnum,
  ModelTypeEnum,
  PriceSourceEnum,
  ProductKindEnum,
  ProductRelationTypeEnum,
  ProductStatusEnum,
  PurchaseChannelEnum,
  ReviewStatusEnum,
  SourceTypeEnum,
  StackStatusEnum,
  ToolTypeEnum,
} from '@model-stacker/data';
import {
  articleStatusLabels,
  articleTypeLabels,
  commonStatusLabels,
  currencyLabels,
  enumToOptions,
  kindLabels,
  materialLabels,
  modelScaleLabels,
  modelTypeLabels,
  priceSourceLabels,
  productRelationTypeLabels,
  productStatusLabels,
  purchaseChannelLabels,
  reviewStatusLabels,
  sourceTypeLabels,
  stackStatusLabels,
  toolTypeLabels,
} from '@model-stacker/data';

// 选项（value+label）与标签（value→label 的反查表）统一由 data 包显示表派生，
// 此处仅保留无法由显示表推导的 UI 配置：TagType 颜色、币种符号、个别选项文案增补。

// ---------------------------------------------------------------------------
// 通用工具类型
// ---------------------------------------------------------------------------

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

// ---------------------------------------------------------------------------
// 通用状态 (CommonStatusEnum)
// ---------------------------------------------------------------------------

export const commonStatusOptions: SelectOption<CommonStatusEnum>[] =
  enumToOptions(commonStatusLabels);

export const commonStatusTagTypes: Record<CommonStatusEnum, TagType> = {
  [CommonStatusEnum.ACTIVE]: 'success',
  [CommonStatusEnum.INACTIVE]: 'info',
};

export { commonStatusLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 审核状态 (ReviewStatusEnum)
// ---------------------------------------------------------------------------

export const reviewStatusOptions: SelectOption<ReviewStatusEnum>[] =
  enumToOptions(reviewStatusLabels);

export const reviewStatusTagTypes: Record<ReviewStatusEnum, TagType> = {
  [ReviewStatusEnum.PENDING]: 'warning',
  [ReviewStatusEnum.APPROVED]: 'success',
  [ReviewStatusEnum.REJECTED]: 'danger',
};

export { reviewStatusLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 数据来源类型 (SourceTypeEnum)
// ---------------------------------------------------------------------------

export const sourceTypeOptions: SelectOption<SourceTypeEnum>[] =
  enumToOptions(sourceTypeLabels);

export { sourceTypeLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 产品种类 (ProductKindEnum)
// ---------------------------------------------------------------------------

export const kindOptions: SelectOption<ProductKindEnum>[] = enumToOptions(kindLabels);

export const kindTagTypes: Record<ProductKindEnum, TagType> = {
  [ProductKindEnum.MODEL]: 'primary',
  [ProductKindEnum.TOOL_SUPPLY]: 'info',
};

export { kindLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 模型子类 (ModelTypeEnum)
// ---------------------------------------------------------------------------

export const modelTypeOptions: SelectOption<ModelTypeEnum>[] =
  enumToOptions(modelTypeLabels);

export { modelTypeLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 工具辅料子类 (ToolTypeEnum)
// ---------------------------------------------------------------------------

export const toolTypeOptions: SelectOption<ToolTypeEnum>[] =
  enumToOptions(toolTypeLabels);

export { toolTypeLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 产品状态 (ProductStatusEnum)
// ---------------------------------------------------------------------------

export const productStatusOptions: SelectOption<ProductStatusEnum>[] =
  enumToOptions(productStatusLabels);

export const productStatusTagTypes: Record<ProductStatusEnum, TagType> = {
  [ProductStatusEnum.ON_SALE]: 'success',
  [ProductStatusEnum.DISCONTINUED]: 'warning',
  [ProductStatusEnum.INACTIVE]: 'info',
};

export { productStatusLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 模型比例 (ModelScaleEnum)
// ---------------------------------------------------------------------------

export const modelScaleOptions: SelectOption<ModelScaleEnum>[] =
  enumToOptions(modelScaleLabels);

export { modelScaleLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 材质 (MaterialEnum)
// ---------------------------------------------------------------------------

export const materialOptions: SelectOption<MaterialEnum>[] =
  enumToOptions(materialLabels);

export { materialLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 堆积状态 (StackStatusEnum)
// ---------------------------------------------------------------------------

export const stackStatusOptions: SelectOption<StackStatusEnum>[] = enumToOptions(
  stackStatusLabels,
  {
    formatLabel: (value, label) =>
      value === StackStatusEnum.UNSTARTED ? '未开封（堆积中）' : label,
  },
);

export const stackStatusTagTypes: Record<StackStatusEnum, TagType> = {
  [StackStatusEnum.UNSTARTED]: 'warning',
  [StackStatusEnum.OPENED]: 'primary',
  [StackStatusEnum.IN_PROGRESS]: 'primary',
  [StackStatusEnum.FINISHED]: 'success',
  [StackStatusEnum.WIP]: 'danger',
  [StackStatusEnum.USED_UP]: 'info',
  [StackStatusEnum.EXPIRED]: 'info',
  [StackStatusEnum.SOLD]: 'info',
};

export { stackStatusLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 购买渠道 (PurchaseChannelEnum)
// ---------------------------------------------------------------------------

export const purchaseChannelOptions: SelectOption<PurchaseChannelEnum>[] =
  enumToOptions(purchaseChannelLabels);

export { purchaseChannelLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 币种 (CurrencyEnum)
// ---------------------------------------------------------------------------

export const currencyOptions: SelectOption<CurrencyEnum>[] = enumToOptions(
  currencyLabels,
  {
    formatLabel: (value, label) => `${label} ${value}`,
  },
);

export const currencySymbols: Record<CurrencyEnum, string> = {
  [CurrencyEnum.CNY]: '¥',
  [CurrencyEnum.USD]: '$',
  [CurrencyEnum.JPY]: 'JP¥',
  [CurrencyEnum.HKD]: 'HK$',
  [CurrencyEnum.EUR]: '€',
  [CurrencyEnum.TWD]: 'NT$',
  [CurrencyEnum.GBP]: '£',
};

export { currencyLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 价格来源 (PriceSourceEnum)
// ---------------------------------------------------------------------------

export const priceSourceOptions: SelectOption<PriceSourceEnum>[] =
  enumToOptions(priceSourceLabels);

export { priceSourceLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 产品关联类型 (ProductRelationTypeEnum)
// ---------------------------------------------------------------------------

export const productRelationTypeOptions: SelectOption<ProductRelationTypeEnum>[] =
  enumToOptions(productRelationTypeLabels);

export { productRelationTypeLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 文章类型 (ArticleTypeEnum)
// ---------------------------------------------------------------------------

export const articleTypeOptions: SelectOption<ArticleTypeEnum>[] =
  enumToOptions(articleTypeLabels);

export { articleTypeLabels } from '@model-stacker/data';

// ---------------------------------------------------------------------------
// 文章状态 (ArticleStatusEnum)
// ---------------------------------------------------------------------------

export const articleStatusOptions: SelectOption<ArticleStatusEnum>[] =
  enumToOptions(articleStatusLabels);

export const articleStatusTagTypes: Record<ArticleStatusEnum, TagType> = {
  [ArticleStatusEnum.DRAFT]: 'info',
  [ArticleStatusEnum.PUBLISHED]: 'success',
  [ArticleStatusEnum.ARCHIVED]: 'warning',
};

export { articleStatusLabels } from '@model-stacker/data';