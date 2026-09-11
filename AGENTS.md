# AGENTS.md

面向 AI 会话 / 协作者的项目约定。调整字段前务必阅读本文件。

## 项目概览

ModelStacker（堆积人）是面向「堆积人」的物品管理与统计工具：管理已购买的所有物品（不限于比例模型 / 工具辅料，可包含日用品、五金等），查询厂家、产品详情、价格走向与历史最低价，记录堆积与烂尾。堆积记录与共享资料库**不强绑定**，可通过「资料补充申请」事后补全产品 / 厂家资料。

## 堆积与资料库解耦（数据关系）

**堆积（Stack）是用户私有记录，资料库（Product / Manufacturer）是共享数据，两者不强绑定：**

- **已关联**：资料库有对应产品时，堆积通过 `productId` 关联（可选 `manufacturerId` / `categoryId`），产品名、厂家名等展示数据取自资料库；
- **未关联**：资料库无对应产品时，堆积直接保存自由文本 `itemName` / `manufacturerName` 即可，不要求先通过产品 / 厂家审核；
- **一键补库**：堆积可发起「资料补充申请」（`DataSupplementRequest`，含来源 `stackId`、申请 `type`、`name` / `manufacturerName` 等）；管理员审核建库后回填 `linkedProductId` / `linkedManufacturerId`，并**自动绑定到申请来源的堆积**；
- **产品分类**：原「题材」改称「产品分类」，英文 / code 继续使用 `theme`（`Theme`、`themeId` 等不变），树形结构同时用于分类产品与堆积物品（含日用品、五金等）。

**术语对照：** 堆积 Stack / 资料库 Database / 资料补充申请 DataSupplementRequest / 产品分类 Theme（原题材） / 烂尾 Wip（定义不变）。

## 技术框架

| 模块 | 技术 | 说明 |
| ---- | ---- | ---- |
| 堆积人前端 `apps/web` | Vue 3 + Vite + Vue Router + Pinia + Element Plus | H5 端，兼容手机访问；支持亮/暗主题切换 |
| 管理后台 `apps/admin` | Vue 3 + Vite + Vue Router + Element Plus | 后台管理，侧边栏布局 |
| 服务端 `apps/server` | NestJS + Prisma ORM + SQLite | RESTful API，JWT 鉴权 |
| 公共数据 `packages/data` | TypeScript（纯类型） | 枚举与数据结构，前后端共享的唯一来源 |
| 公共组件 `packages/components` | Vue 3 + Vite library mode | 表单字段组、详情展示、通用 UI 小件，admin/web 共用 |
| 包管理 | pnpm workspaces | Monorepo 依赖管理 |

## 目录结构

```
ModelStacker/
├── apps/
│   ├── web/           # 堆积人前端（H5）
│   │   └── src/
│   │       ├── api/           # 接口封装
│   │       ├── router/        # 路由定义
│   │       ├── stores/        # Pinia 状态（theme、user）
│   │       ├── themes/        # 亮/暗主题 token 定义
│   │       └── views/         # 页面（database、home、login、my 等）
│   ├── admin/         # 管理后台前端
│   │   └── src/
│   │       ├── api/           # 接口封装
│   │       ├── router/        # 路由定义
│   │       └── views/         # 页面（dashboard、manufacturer、product、price）
│   └── server/        # 服务端
│       ├── prisma/            # Prisma schema + dev.db
│       └── src/
│           ├── auth/          # JWT 鉴权（登录、Guard、Roles）
│           ├── common/        # 公共拦截器等
│           └── prisma/        # PrismaService 封装
└── packages/
    ├── data/          # 公共枚举、类型与显示表（单一来源）
    └── components/    # 公共 Vue 组件（表单字段组、详情展示、选项派生）
```

## 模块职责

| 模块 | 职责 | 关键文件/目录 |
| ---- | ---- | ------------- |
| `apps/web` | 用户端：查看资料库、发起资料补充申请（补库）、管理堆积/烂尾、个人统计 | `views/database/`（厂商/产品浏览）、`views/my/`（堆积管理） |
| `apps/admin` | 后台管理：对厂商、产品进行增删改查、审核资料补充申请 | `views/manufacturer/`、`views/product/`、`views/price/` |
| `apps/server` | 提供 RESTful API，处理鉴权、业务逻辑、数据库交互 | `src/auth/`（鉴权）、`prisma/schema.prisma`（数据模型） |
| `packages/data` | 枚举、显示表与 TypeScript 类型定义，前后端强制一致 | `src/enums/`、`src/labels.ts`、`src/types/` |
| `packages/components` | 共享 Vue 组件：表单字段组、详情展示、选项派生与 UI 配置 | `src/options/`、`src/manufacturer/`、`src/product/`、`src/common/` |

## 数据库工作流(重要)

项目**已删除 Prisma migrations 目录**,不使用迁移文件:

- **唯一事实来源是 `apps/server/prisma/schema.prisma`**,调整表结构只改这个文件;
- 改完后执行 `pnpm db:push` 直接同步到本地 SQLite(`dev.db`,已被 gitignore);
- **禁止**执行 `prisma migrate dev/deploy`,**禁止**提交任何 `migrations/*.sql`;
- 待结构定稿进入正式开发时,再一次性生成基线迁移(`prisma migrate dev --name init`)。

## 共享类型包

- 枚举与数据结构的单一来源是 `packages/data/src/`;
- 中文展示文案见 `packages/data/src/labels.ts` 的「显示表」（见下方枚举显示表约定）;
- web/admin 引用的是其**构建产物 `dist/`**,修改类型 / 显示表后需执行
  `pnpm --filter @model-stacker/data build`,否则下游 typecheck 用的是旧定义。

## 共享组件包 (`@model-stacker/components`)

admin 与 web 共用的 Vue 组件统一放在 `packages/components/src/`:

| 目录 | 内容 | 说明 |
|------|------|------|
| `options/` | `SelectOption<T>` / `TagType` 类型 + 由显示表派生的 `*Options`、仅存的 `*TagTypes` 颜色 / 币种符号等 UI 配置 | 消除 admin、web 中重复的 options.ts |
| `common/` | `StatusTag`、`DataSourceBadge` | 通用展示小件 |
| `manufacturer/` | `ManufacturerFields`（表单字段组）、`ManufacturerDetail`（详情展示） | 不含 el-form 容器,父级用 el-form 包裹即可 |
| `product/` | `ProductFields`（表单字段组）、`ProductDetail`（详情展示） | 按 kind 条件显示模型子类/工具子类/比例 |

### 使用方式

```ts
// Vue 模板中按需引入
import { ManufacturerFields, ProductDetail, StatusTag } from '@model-stacker/components';
// 映射/选项（label 文案来自 data 包显示表，参见「枚举显示表约定」）
import { kindLabels, productStatusOptions } from '@model-stacker/components';
```

admin / web 的 `package.json` 已声明 `"@model-stacker/components": "workspace:*"`,
Vite config 已添加源码 alias,dev 模式直连 `src/`,无需额外配置。

### 构建与类型检查

- 构建: `pnpm --filter @model-stacker/components build`（Vite library mode → `dist/`）
- 类型检查: `pnpm --filter @model-stacker/components typecheck`
- 修改组件后需重新 build,否则下游 typecheck / 生产构建用的是旧产物;

## 枚举显示表约定（重要）

**枚举类型标识符统一以 `Enum` 结尾**（如 `ArticleTypeEnum`、`StackStatusEnum`），新建枚举也必须遵守;仅类型 / 值的引用处一律使用该带后缀名。

**枚举值保持英文 code（与 DB / API 一致,字符串存储,绝不改成数字），中文展示文案统一收敛到「显示表」：**

- 显示表位于 `packages/data/src/labels.ts`,形如 `Record<枚举, string>`（键=枚举值,值=中文文案,可为任意字符串,不受 TS 标识符规则限制）:

  ```ts
  export const articleTypeLabels: Record<ArticleTypeEnum, string> = {
    [ArticleTypeEnum.TRIVIA]: '产品趣闻',
    [ArticleTypeEnum.REFERENCE]: '参考文献',
    [ArticleTypeEnum.TIPS]: '制作窍门/小技巧',
  };
  ```

- **新增枚举成员时,`Record<枚举, string>` 的穷尽校验会强制要求同步补全显示表**,不会静默漏配;
- 选项数组、取值标签统一由 `enumToOptions` 派生,页面 / 组件中**禁止手写新的 `*Options` / `*Labels` 映射**（现有页面 options 文件均为从 `@model-stacker/components` 再导出的 barrel）:

  ```ts
  import { enumToOptions, stackStatusLabels } from '@model-stacker/data';
  export const stackStatusOptions = enumToOptions(stackStatusLabels, {
    formatLabel: (value, label) =>
      value === StackStatusEnum.UNSTARTED ? '未开封（堆积中）' : label,
  });
  ```

- `enumToOptions` 支持 `exclude`（排除）/ `order`（自定义顺序）/ `formatLabel`（选项文案增补）;
- 显示表只放「枚举值 → 中文文案」;颜色（`*TagTypes`）、币种符号等纯 UI 配置仍手写于 `packages/components/src/options/index.ts`,
  用 `Record<枚举, TagType>` 类型保证穷尽;
- 值即文案的枚举（如部分例子中的比例 `'1/12'`）也建议显式书写显示表，勿用「值自动等于文案」的推导——存在 `'1/87' → '1/87 (HO)'`、`NON_SCALE → '无比例'` 等例外;
- 修改 `labels.ts` 后需执行 `pnpm --filter @model-stacker/data build`。

## 鉴权约定

- 前端 localStorage 只存 JWT token;用户资料与权限仅存 Pinia 内存,启动时经 `/auth/me` 获取;
- 服务端用 `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles('权限码')` 做真实校验,
  权限每次请求从数据库实时读取,前端展示控制仅是体验优化。

## 数据来源约定

数据来源字段(`dataSource`/`manualsSource`/`photosSource`)采用字符串存储,格式为 `来源类型|备注`:

- **来源类型**(`SourceTypeEnum`枚举): `ORIGINAL`(原创) / `OFFICIAL`(官网) / `EXTERNAL`(外链);
- **备注**: 官网和外链类型用于存放 URL;说明书/照片可能存在多个地址,使用**半角逗号**分隔;
- **禁止**使用符号 `|` 作为 URL 内容的一部分。

示例:
- 原创: `ORIGINAL`
- 官网: `OFFICIAL|https://example.com/product`
- 外链(多图): `EXTERNAL|https://img1.com/a.jpg,https://img2.com/b.jpg`

辅助函数位于 `packages/data/src/types/common.ts`:
- `parseDataSource(value)` → `{ type, note }`
- `buildDataSource(type, note?)` → `string`

## 编码规范

- **枚举**: 枚举类型标识符统一以 `Enum` 结尾、枚举值用英文大写 code（字符串存储）;
  中文展示文案放 `packages/data/src/labels.ts` 显示表（详见「枚举显示表约定」）。
- **样式**: 使用 SCSS 编写，文件后缀 `.scss`。
- **Vue 文件**: `<style>` 标签使用 `<style lang="scss" scoped>`，通过嵌套选择器缩短代码行数。
