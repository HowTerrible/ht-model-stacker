/** 改件
 * Model modifications
 */

import { DeleteType } from '.';
import { IBrandId } from './brand';
import { IModel } from './model';
import { IRealItemId } from './realItem';

export interface IAccessoryPartId {
  accessoryPartId: string;
}

/** 改件类型 1: 树脂件; 2: 金属件; 3: 套改; 4: 三弟打印; 5: 其他; 6: 场景件; */
export enum AccessoryPartTypeEnum {
  树脂件 = 1,
  /** 蚀刻片/车制件 */
  金属件 = 2,
  套改 = 3,
  三弟打印 = 4,
  其他 = 5,
  场景件 = 6,
}

/** 改件位置 1: 炮管; 2: 轮子; 3: 履带; 4: 其他; */
export enum AccessoryPartPartEnum {
  /** 炮管/枪管 英文都是barrel */
  炮管 = 1,
  轮子 = 2,
  履带 = 3,
  其他 = 4,
}

export interface IAccessoryPart extends IModel, DeleteType, IAccessoryPartId {
  /** 改件类型 1: 树脂件; 2: 金属件; 3: 套改; 4: 三弟打印; 5: 其他; 6: 场景件; */
  type: AccessoryPartTypeEnum;
  /** 改件位置 1: 炮管; 2: 轮子; 3: 履带; 4: 其他; */
  accessoryPartPart?: AccessoryPartPartEnum[];
  /** 改件位置的补充 */
  accessoryPartPartText?: string;
}
