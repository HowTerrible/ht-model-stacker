import type { ShopPlatformEnum } from '../enums/shop';
import type { DateTimeString, Id, TimestampFields } from './common';

/** 店铺（线上 / 线下店铺，资料库概念之一） */
export interface Shop extends TimestampFields {
  id: Id;
  /** 图标（图片地址） */
  iconUrl?: string;
  /** 店铺名称 */
  name: string;
  /** 外号 / 别名 */
  nickname?: string;
  /** 位置（线下店铺地址） */
  location?: string;
  /** 平台：淘宝 / 京东 / 闲鱼 / 亚马逊 / 线下 / 其他 */
  platform: ShopPlatformEnum;
  /** 数据更新时间（用于展示该店铺数据是否过期） */
  dataUpdatedAt: DateTimeString;
}

/** 店铺查询参数 */
export interface ShopQuery {
  /** 按名称 / 外号 / 位置模糊搜索 */
  keyword?: string;
  platform?: ShopPlatformEnum;
  page?: number;
  pageSize?: number;
}