# ModelStacker · 堆积人模型管理平台

面向「堆积人」的产品管理与统计工具：管理已购买的所有物品（不限于比例模型 / 工具辅料，可包含日用品、五金等），查询厂家、产品详情、价格走向与历史最低价，记录堆积与烂尾。

## 目录结构

```
ModelStacker/
├── apps/
│   ├── web/        # 堆积人前端（H5，兼容手机访问，Vue3 + Vite + Pinia）
│   ├── admin/      # 管理后台前端（Vue3 + Element Plus）
│   └── server/     # 服务端（NestJS + Prisma + SQLite）
└── packages/
    └── data/       # 公共数据模块：枚举、数据结构（前后端共享，单一来源）
```

## 技术栈

| 模块 | 技术 |
| ---- | ---- |
| 堆积人前端 | Vue3 + Vite + Vue Router + Pinia |
| 管理后台 | Vue3 + Element Plus |
| 服务端 | NestJS + Prisma ORM |
| 数据库 | SQLite（本地文件，暂不独立部署） |
| 共享数据 | TypeScript 包 `@model-stacker/data` |
| 包管理 | pnpm workspaces |

## 术语词典

| 术语 | 英文 / Code | 说明 |
| ---- | ---- | ---- |
| 堆积 | Stack | 已购买的物品，不限于模型、工具，可包含日用品、五金等 |
| 堆积人 | Stacker | 购买并积攒物品的用户，项目主要用户 |
| 资料库 | Database | 产品与厂家的数据集合，包含产品详情、历史价格、竞品关联等；堆积与资料库不强绑定 |
| 资料补充申请 | DataSupplementRequest | 用户添加堆积时，若资料库中无对应产品 / 厂家，一键提交的补库申请；审核建库后自动绑定到来源堆积 |
| 产品 | Product | 资料库中的商品（模型 / 工具辅料等） |
| 比例模型 | Model | 按比例缩小的模型，含军事、民用、手办、战旗等类型 |
| 工具辅料 | Tool & Supply | 制作所需的工具与耗材 |
| 烂尾 | Wip | 开封但未做完的模型 |
| 制作阶段 | WipStage | 烂尾 / 制作进度的阶段描述（拆袋未组装 → … → 未喷保护漆） |
| 产品分类 | Theme | 原「题材」，树形分类结构，用于分类产品及堆积物品（日用品、五金等） |
| 竞品 | Competitor | 其他厂家同分类 / 同类产品，供堆积人对比参照 |
| 厂家 | Manufacturer | 产品生产厂家 / 品牌 |
| 价格走向 | Price Trend | 产品历史价格变化序列 |
| 历史最低价 | Lowest Price | 产品记录中的最低价格 |

## 堆积与资料库解耦

堆积（Stack）与人共享资料库（Product / Manufacturer）**不强绑定**：

- **已存在**：资料库中有对应产品时，堆积通过 `productId`（可选 `manufacturerId` / `categoryId`）建立关联；
- **不存在**：资料库中无对应产品时，堆积直接记录 `itemName` / `manufacturerName` 等自由信息即可保存，无需先通过任何审核；
- **一键补库**：用户可从堆积发起「资料补充申请」（`DataSupplementRequest`），把品名 / 厂家名 / 货号等作为补充资料提交审核；管理员建库后，申请回填 `linkedProductId` / `linkedManufacturerId`，并**自动绑定到申请来源的堆积**。

> 该设计去掉了「加堆积必须同时审核产品、厂家」的强约束，低门槛记录购买行为，资料库内容可事后众包补全。

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 构建公共数据模块（其他模块依赖它）
pnpm --filter @model-stacker/data build

# 3. 初始化数据库（按 schema.prisma 生成 dev.db + Prisma Client）
pnpm db:push

# 4. 启动
pnpm dev:server   # 后端 http://localhost:3000/api
pnpm dev:web      # 堆积人前端 http://localhost:5173
pnpm dev:admin    # 管理后台  http://localhost:5174
```

常用命令：

```bash
pnpm build        # 全量构建（自动按依赖顺序）
pnpm typecheck    # 全量类型检查
pnpm db:push      # 调整 schema.prisma 后同步数据库结构
pnpm db:studio    # Prisma Studio 可视化查看数据库
```

> 数据库约定：项目当前**不使用迁移文件**，`schema.prisma` 是唯一事实来源，
> 改表后执行 `pnpm db:push` 即可；禁止提交 `prisma/migrations/`。详见 `AGENTS.md`。

## 数据约定

- 枚举值以 `packages/data` 为唯一来源，数据库中以字符串形式存储枚举 code；
- 数据库交互统一封装在 `apps/server/src/prisma/`（`PrismaService`），后续切换数据库只需调整 `schema.prisma` 的 datasource 并重新迁移。

## 产品分类（Theme）分级规则

产品分类（原「题材」，code 不变使用 `theme`）是树形结构，用于详细分类产品，也覆盖堆积中的日用品、五金等物品：

```
虎式坦克E型 -> 军事 -> 二战 -> 坦克 -> 重型坦克 -> 虎式
法拉利 250GT -> 民用 -> 60年代 -> 法拉利
双刃钳 -> 工具 -> 剪钳 -> 水口钳 -> 双刃钳
螺丝刀 -> 五金 -> 手工具
```

借鉴生物学「界门纲目科属种」的命名思路，但**不强制固定层数**，采用「固定根层 + 弹性子层 + 同级同维度」：

| 生物学 | 比例模型示例 | 工具辅料示例 |
| ---- | ---- | ---- |
| 界 Kingdom | 模型 / 工具辅料 / 日用品 / 五金 …（根，固定） | 同左 |
| 门 Phylum | 军事 / 民用 / 手办 / 战旗 | 工具 / 辅料 |
| 纲 Class | 二战 / 60年代 | 剪钳 |
| 目 Order | 坦克 / 法拉利 | 水口钳 |
| 科 Family | 重型坦克 | 双刃钳 |
| 属 Genus | 虎式 | （按需） |
| 种 Species | 虎式E型 | — |

**建议规则：**

1. **根层固定、枚举维护**：根层分类固定（如「模型 / 工具辅料 / 日用品 / 五金」），保证导航一致性；往下允许 1~N 层，建议封顶 5~6 层。
2. **同级同维度**：同一父节点的所有子节点必须是同一分类属性。如「坦克」下只能都是坦克类型（重型/中型/轻坦），不能混入时代维度。
3. **单一分类轴**：树只承担「分类」一条轴。时间（60年代）、品牌（法拉利）、厂家、题材等多维度用产品 `tags` 与竞品关联表达，避免一棵树被多维度撑爆。
4. **命名唯一**：同级 name 唯一，且根→叶全路径唯一。
5. **产品挂叶子，可挂中间**：默认挂叶子节点；「二战坦克」这类整体题材也可挂中间节点，便于浏览。
6. **删除保护**：已有产品关联的节点禁止直接删除。

**实现要点**：`theme` 表自关联成树，带 `level`（深度，根为 0）与 `path`（物化路径 `/父id/.../自身id/`）字段，查子树直接用 `path = '/1/5/' OR path LIKE '/1/5/%'`，无需递归。

## 说明与提醒

1. **SQLite 定位**：SQLite 适合单实例、小规模部署，无需独立数据库服务，备份即复制 `prisma/dev.db` 文件；但不支持多实例横向扩展，若未来并发增大需切换 PostgreSQL/MySQL（Prisma 已封装好，切换成本低）。
2. **说明书 / 照片存储**：目前产品表中用 URL 字段指向外部文件，后续若自建文件存储，建议独立一个对象存储 / 静态文件模块。
3. **价格采集**：产品价格走向目前依赖管理后台手工录入；若需自动抓取，建议后续独立「采集模块」。
4. **Excel 导入**：堆积的 Excel 导入需在后端引入解析库（如 `xlsx`），属业务功能，后续实现。
5. **权限体系**：已搭好 JWT 鉴权骨架（`apps/server/src/auth/`，登录 stub 待接入真实凭证）；前端 localStorage 只存 token、权限存内存仅做展示控制，服务端 Guard 强制校验。
