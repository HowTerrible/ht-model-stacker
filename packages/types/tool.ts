/** 工具
 * Tool
 */

import { DeleteType } from '.';
import { IBrandId } from './brand';
import { IPriceRecord } from './record';

export interface IToolId {
  toolId: string;
}

export enum ToolClassifyEnum {}

export interface ITool extends IToolId, IBrandId, DeleteType {
  classify: ToolClassifyEnum;

  /** 标签 */
  tag: string[];
  /** 标准价 */
  standardPrice: string;
  /** 发售时间 可为空，存在预售了然后寄了的 */
  releaseTime?: string;
  /** 超级价格 */
  ultraPriceRecords: IPriceRecord[];
}
