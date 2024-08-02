/** 购买记录
 * Purchase history
 */

import { DeleteType } from '.';
import { IModelId } from './model';
import { IAccessoryPartId } from './accessoryPart';

export interface IRecordId {
  recordId: string;
}

/** 订单中项目的记录
 * 和订单记录构成循环引用, 方便索引
 */
export interface IOrderItemRecord extends IRecordId, DeleteType {
  /** 不一定非得是模型 */
  itemId?: IModelId | IAccessoryPartId;
  /** 不是已记录的模型或改件, 建议写上名字 */
  itemName?: string;
  /** 子产品价格, 尽量记录计算优惠后 */
  price: string;
}

/** 订单记录 */
export interface IOrderRecord extends IRecordId, DeleteType {
  /** 订单时间 */
  orderTime: string;
  /** 订单价格 */
  price: string;
  /** 优惠构成 纯文本描述 */
  discount?: string;
  /** 备注 */
  remark?: string;
  /** 订单中的物品 */
  items: Array<IOrderItemRecord>;
}

/** 价格记录 */
export interface IPriceRecord extends DeleteType {
  /** 价格 */
  price: string;
  /** 价格对应的时间 */
  date: string;
  /** 渠道 */
  chanel: string;
  /** 备注 */
  remark?: string;
}
