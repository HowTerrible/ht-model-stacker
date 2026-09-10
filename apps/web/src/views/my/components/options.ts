import { Currency, ProductKind, PurchaseChannel, StackStatus } from '@model-stacker/data';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export const currencyOptions: SelectOption<Currency>[] = [
  { value: Currency.CNY, label: '人民币 CNY' },
  { value: Currency.USD, label: '美元 USD' },
  { value: Currency.JPY, label: '日元 JPY' },
  { value: Currency.HKD, label: '港币 HKD' },
  { value: Currency.EUR, label: '欧元 EUR' },
  { value: Currency.TWD, label: '新台币 TWD' },
  { value: Currency.GBP, label: '英镑 GBP' },
];

export const channelOptions: SelectOption<PurchaseChannel>[] = [
  { value: PurchaseChannel.TAOBAO, label: '淘宝' },
  { value: PurchaseChannel.JD, label: '京东' },
  { value: PurchaseChannel.PDD, label: '拼多多' },
  { value: PurchaseChannel.XIANYU, label: '闲鱼' },
  { value: PurchaseChannel.OFFLINE, label: '线下实体店' },
  { value: PurchaseChannel.OVERSEAS, label: '海外购买' },
  { value: PurchaseChannel.OTHER, label: '其他' },
];

export const statusOptions: SelectOption<StackStatus>[] = [
  { value: StackStatus.UNSTARTED, label: '未开封（堆积中）' },
  { value: StackStatus.OPENED, label: '已开封' },
  { value: StackStatus.IN_PROGRESS, label: '制作中' },
  { value: StackStatus.FINISHED, label: '已完成' },
  { value: StackStatus.WIP, label: '烂尾' },
  { value: StackStatus.USED_UP, label: '已用完' },
  { value: StackStatus.EXPIRED, label: '已过期' },
  { value: StackStatus.SOLD, label: '已出 / 转让' },
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

export const channelLabels: Record<PurchaseChannel, string> = {
  [PurchaseChannel.TAOBAO]: '淘宝',
  [PurchaseChannel.JD]: '京东',
  [PurchaseChannel.PDD]: '拼多多',
  [PurchaseChannel.XIANYU]: '闲鱼',
  [PurchaseChannel.OFFLINE]: '线下实体店',
  [PurchaseChannel.OVERSEAS]: '海外购买',
  [PurchaseChannel.OTHER]: '其他',
};

export const statusLabels: Record<StackStatus, string> = {
  [StackStatus.UNSTARTED]: '未开封',
  [StackStatus.OPENED]: '已开封',
  [StackStatus.IN_PROGRESS]: '制作中',
  [StackStatus.FINISHED]: '已完成',
  [StackStatus.WIP]: '烂尾',
  [StackStatus.USED_UP]: '已用完',
  [StackStatus.EXPIRED]: '已过期',
  [StackStatus.SOLD]: '已出 / 转让',
};

type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export const statusTagTypes: Record<StackStatus, TagType> = {
  [StackStatus.UNSTARTED]: 'warning',
  [StackStatus.OPENED]: 'primary',
  [StackStatus.IN_PROGRESS]: 'primary',
  [StackStatus.FINISHED]: 'success',
  [StackStatus.WIP]: 'danger',
  [StackStatus.USED_UP]: 'info',
  [StackStatus.EXPIRED]: 'info',
  [StackStatus.SOLD]: 'info',
};

export const kindLabels: Record<ProductKind, string> = {
  [ProductKind.MODEL]: '模型',
  [ProductKind.TOOL_SUPPLY]: '工具辅料',
};

export const kindTagTypes: Record<ProductKind, TagType> = {
  [ProductKind.MODEL]: 'primary',
  [ProductKind.TOOL_SUPPLY]: 'info',
};
