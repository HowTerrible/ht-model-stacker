import {
  CommonStatus,
  ModelType,
  ProductKind,
  ProductStatus,
  ToolType,
} from "@model-stacker/data";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export const kindOptions: SelectOption<ProductKind>[] = [
  { value: ProductKind.MODEL, label: "比例模型" },
  { value: ProductKind.TOOL_SUPPLY, label: "工具辅料" },
];

export const kindLabels: Record<ProductKind, string> = {
  [ProductKind.MODEL]: "比例模型",
  [ProductKind.TOOL_SUPPLY]: "工具辅料",
};

export const modelTypeOptions: SelectOption<ModelType>[] = [
  { value: ModelType.MILITARY_TANK, label: "军事-坦克" },
  { value: ModelType.MILITARY_AIRCRAFT, label: "军事-飞机" },
  { value: ModelType.MILITARY_SHIP, label: "军事-军舰" },
  { value: ModelType.MILITARY_FIGURE, label: "军事-兵人" },
  { value: ModelType.MILITARY_RAIL_VEHICLE, label: "军事-轨道载具" },
  { value: ModelType.CIVIL_CAR, label: "民用-民用车" },
  { value: ModelType.CIVIL_MOTORCYCLE, label: "民用-摩托车" },
  { value: ModelType.CIVIL_RAIL_VEHICLE, label: "民用-轨道载具" },
  { value: ModelType.FIGURINE, label: "手办" },
  { value: ModelType.WAR_GAME, label: "战旗（战棋）" },
  { value: ModelType.UPGRADE_SET, label: "模型套改" },
  { value: ModelType.KIT, label: "套件" },
  { value: ModelType.SCENE_MODEL, label: "场景模型" },
];

export const modelTypeLabels: Record<ModelType, string> = Object.fromEntries(
  modelTypeOptions.map((o) => [o.value, o.label]),
) as Record<ModelType, string>;

export const toolTypeOptions: SelectOption<ToolType>[] = [
  { value: ToolType.PAINT, label: "颜料" },
  { value: ToolType.BRUSH, label: "笔刷" },
  { value: ToolType.TOOL, label: "工具" },
  { value: ToolType.ACCESSORY, label: "改造件/辅料" },
  { value: ToolType.OTHER, label: "其他" },
];

export const toolTypeLabels: Record<ToolType, string> = Object.fromEntries(
  toolTypeOptions.map((o) => [o.value, o.label]),
) as Record<ToolType, string>;

export const statusOptions: SelectOption<ProductStatus>[] = [
  { value: ProductStatus.ON_SALE, label: "在售" },
  { value: ProductStatus.DISCONTINUED, label: "停产" },
  { value: ProductStatus.INACTIVE, label: "下架/隐藏" },
];

export const statusLabels: Record<ProductStatus, string> = {
  [ProductStatus.ON_SALE]: "在售",
  [ProductStatus.DISCONTINUED]: "停产",
  [ProductStatus.INACTIVE]: "下架/隐藏",
};

type TagType = "primary" | "success" | "warning" | "danger" | "info";

export const kindTagTypes: Record<ProductKind, TagType> = {
  [ProductKind.MODEL]: "primary",
  [ProductKind.TOOL_SUPPLY]: "info",
};

export const statusTagTypes: Record<ProductStatus, TagType> = {
  [ProductStatus.ON_SALE]: "success",
  [ProductStatus.DISCONTINUED]: "warning",
  [ProductStatus.INACTIVE]: "info",
};

export const commonStatusOptions: SelectOption<CommonStatus>[] = [
  { value: CommonStatus.ACTIVE, label: "启用" },
  { value: CommonStatus.INACTIVE, label: "停用" },
];

export const commonStatusLabels: Record<CommonStatus, string> = {
  [CommonStatus.ACTIVE]: "启用",
  [CommonStatus.INACTIVE]: "停用",
};

export const commonStatusTagTypes: Record<CommonStatus, TagType> = {
  [CommonStatus.ACTIVE]: "success",
  [CommonStatus.INACTIVE]: "info",
};
