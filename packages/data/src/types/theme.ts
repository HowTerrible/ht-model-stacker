import type { CommonStatus } from '../enums/common';
import type { DateTimeString, Id, TimestampFields } from './common';

/**
 * 产品分类节点（原题材，code 仍用 theme），树形结构，用于详细分类
 * 产品及堆积物品，覆盖比例模型、工具辅料，也可包含日用品、五金等。
 *
 * 示例：
 *   虎式坦克E型 -> 军事 -> 二战 -> 坦克 -> 重型坦克 -> 虎式
 *   法拉利 250GT -> 民用 -> 60年代 -> 法拉利
 *   双刃钳 -> 工具 -> 剪钳 -> 水口钳 -> 双刃钳
 *   螺丝刀 -> 五金 -> 手工具
 *
 * 分级规则（借鉴生物学「界门纲目科属种」的命名思路，但不强制固定层数）：
 *   1. 根层固定、枚举维护：根层分类固定，保证导航一致性；
 *      往下允许 1~N 层，建议封顶 5~6 层。
 *   2. 同级同维度：同一父节点的所有子节点必须是同一分类属性，
 *      如「坦克」下只能都是坦克类型（重型/中型/轻坦），不能混入时代维度。
 *   3. 单一分类轴：树只承担「分类」一条轴；时间（60年代）、品牌（法拉利）、
 *      厂家、题材等多维度用 Product.tags 与竞品关联表达。
 *   4. 同级 name 唯一，且根->叶全路径唯一。
 *   5. 产品默认挂叶子节点，也允许挂在有意义的中间节点（如「二战坦克」）。
 *   6. 已有产品关联的节点禁止直接删除。
 *
 * 生物学名词参考映射（仅作层级命名约定，不强制层数）：
 *   界/Kingdom -> 根分类：模型 / 工具辅料 / 日用品 / 五金 …
 *   门/Phylum -> 军事 / 民用 / 手办 / 战旗；工具 / 辅料
 *   纲/Class  -> 二战 / 60年代；剪钳
 *   目/Order  -> 坦克 / 法拉利；水口钳
 *   科/Family -> 重型坦克；双刃钳
 *   属/Genus  -> 虎式；（工具按需）
 *   种/Species-> 虎式E型；—（具体产品）
 */
export interface Theme extends TimestampFields {
  id: Id;
  /** 父节点 ID，根节点为 null */
  parentId: Id | null;
  /** 节点名称，如「军事」「二战」「重型坦克」「虎式」 */
  name: string;
  /** 层级深度，根节点为 0 */
  level: number;
  /**
   * 物化路径：/父id/.../自身id/，如 /1/5/9/
   * 查「某节点整棵子树」：path = '/1/5/' OR path LIKE '/1/5/%'
   */
  path: string;
  /** 同级排序号 */
  sortOrder: number;
  status: CommonStatus;
  /** 子节点（查询携带 withChildren 时返回） */
  children?: Theme[];
}

/** 产品分类查询参数 */
export interface ThemeQuery {
  /** 父节点 ID；null 表示查询顶层；不传表示整棵树 */
  parentId?: Id | null;
  /** 是否递归带出子节点 */
  withChildren?: boolean;
  /** 按名称模糊搜索 */
  keyword?: string;
  status?: CommonStatus;
  /** 按深度过滤 */
  level?: number;
  /** 按物化路径前缀过滤（查某节点整棵子树） */
  pathPrefix?: string;
}

/** 题材路径节点（根到当前节点） */
export interface ThemePathNode {
  id: Id;
  name: string;
}

/**
 * 产品分类全路径，如：
 *   [{ 军事 }, { 二战 }, { 坦克 }, { 重型坦克 }, { 虎式 }]
 */
export type ThemePath = ThemePathNode[];
