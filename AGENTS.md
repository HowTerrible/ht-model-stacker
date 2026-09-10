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
    ├── data/          # 公共枚举与类型（单一来源）
    └── components/    # 公共 Vue 组件（表单字段组、详情展示、选项映射）
```

## 模块职责

| 模块 | 职责 | 关键文件/目录 |
| ---- | ---- | ------------- |
| `apps/web` | 用户端：查看资料库、发起资料补充申请（补库）、管理堆积/烂尾、个人统计 | `views/database/`（厂商/产品浏览）、`views/my/`（堆积管理） |
| `apps/admin` | 后台管理：对厂商、产品进行增删改查、审核资料补充申请 | `views/manufacturer/`、`views/product/`、`views/price/` |
| `apps/server` | 提供 RESTful API，处理鉴权、业务逻辑、数据库交互 | `src/auth/`（鉴权）、`prisma/schema.prisma`（数据模型） |
| `packages/data` | 枚举与 TypeScript 类型定义，前后端强制一致 | `src/enums/`、`src/types/` |
| `packages/components` | 共享 Vue 组件：表单字段组、详情展示、选项映射 | `src/options/`、`src/manufacturer/`、`src/product/`、`src/common/` |

## 数据库工作流(重要)

项目**已删除 Prisma migrations 目录**,不使用迁移文件:

- **唯一事实来源是 `apps/server/prisma/schema.prisma`**,调整表结构只改这个文件;
- 改完后执行 `pnpm db:push` 直接同步到本地 SQLite(`dev.db`,已被 gitignore);
- **禁止**执行 `prisma migrate dev/deploy`,**禁止**提交任何 `migrations/*.sql`;
- 待结构定稿进入正式开发时,再一次性生成基线迁移(`prisma migrate dev --name init`)。

## 共享类型包

- 枚举与数据结构的单一来源是 `packages/data/src/`;
- web/admin 引用的是其**构建产物 `dist/`**,修改类型后需执行
  `pnpm --filter @model-stacker/data build`,否则下游 typecheck 用的是旧定义。

## 共享组件包 (`@model-stacker/components`)

admin 与 web 共用的 Vue 组件统一放在 `packages/components/src/`:

| 目录 | 内容 | 说明 |
|------|------|------|
| `options/` | `SelectOption<T>` 接口 + 所有枚举的 `*Options` / `*Labels` / `*TagTypes` 映射 | 消除 admin、web 中重复的 options.ts |
| `common/` | `StatusTag`、`DataSourceBadge` | 通用展示小件 |
| `manufacturer/` | `ManufacturerFields`（表单字段组）、`ManufacturerDetail`（详情展示） | 不含 el-form 容器,父级用 el-form 包裹即可 |
| `product/` | `ProductFields`（表单字段组）、`ProductDetail`（详情展示） | 按 kind 条件显示模型子类/工具子类/比例 |

### 使用方式

```ts
// Vue 模板中按需引入
import { ManufacturerFields, ProductDetail, StatusTag } from '@model-stacker/components';
// 映射/选项
import { kindLabels, productStatusOptions } from '@model-stacker/components';
```

admin / web 的 `package.json` 已声明 `"@model-stacker/components": "workspace:*"`,
Vite config 已添加源码 alias,dev 模式直连 `src/`,无需额外配置。

### 构建与类型检查

- 构建: `pnpm --filter @model-stacker/components build`（Vite library mode → `dist/`）
- 类型检查: `pnpm --filter @model-stacker/components typecheck`
- 修改组件后需重新 build,否则下游 typecheck / 生产构建用的是旧产物;

## 鉴权约定

- 前端 localStorage 只存 JWT token;用户资料与权限仅存 Pinia 内存,启动时经 `/auth/me` 获取;
- 服务端用 `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles('权限码')` 做真实校验,
  权限每次请求从数据库实时读取,前端展示控制仅是体验优化。

## 数据来源约定

数据来源字段(`dataSource`/`manualsSource`/`photosSource`)采用字符串存储,格式为 `来源类型|备注`:

- **来源类型**(`SourceType`枚举): `ORIGINAL`(原创) / `OFFICIAL`(官网) / `EXTERNAL`(外链);
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

- **样式**: 使用 SCSS 编写，文件后缀 `.scss`。
- **Vue 文件**: `<style>` 标签使用 `<style lang="scss" scoped>`，通过嵌套选择器缩短代码行数。
