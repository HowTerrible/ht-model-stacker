/** 模型
 * Model
 */

import { DeleteType } from '.';
import { IBrand, IBrandId } from './brand';
import { IAccessoryPartId } from './accessoryPart';
import { IRealItemId } from './realItem';
import { IPriceRecord } from './record';

export interface IModelId {
  modelId: string;
}

export interface IModel extends IModelId, IRealItemId, IBrandId, DeleteType {
  /** 模型全名 一般指封绘上全名 */
  modelName: string;
  /** 外号 */
  nickName: string[];
  /** 标签 */
  tag: string[];
  /** 标准价 */
  standardPrice: string;
  /** 发售时间 可为空，存在预售了然后寄了的 */
  releaseTime?: string;
  /** 超级价格 */
  ultraPriceRecords: IPriceRecord[];
  /** 此处只记录发售商 */
  brand: IBrand;
  /** 备注 */
  remark?: string;
  /** 商品封面 */
  coverImg?: string;
  /** 说明书图片地址 */
  instructions?: string[];
  /** 相关模型/改件 */
  relatedItems?: Array<IModelId | IAccessoryPartId>;
}
