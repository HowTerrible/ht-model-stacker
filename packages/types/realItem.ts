/** 模型原型 */

import { DeleteType } from '.';

export interface IRealItemId {
  realItemId: string;
}

export interface IRealItem extends IRealItemId, DeleteType {}
