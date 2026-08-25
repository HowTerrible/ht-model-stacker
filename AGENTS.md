# AGENTS.md

面向 AI 会话 / 协作者的项目约定。调整字段前务必阅读本文件。

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

## 鉴权约定

- 前端 localStorage 只存 JWT token;用户资料与权限仅存 Pinia 内存,启动时经 `/auth/me` 获取;
- 服务端用 `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles('权限码')` 做真实校验,
  权限每次请求从数据库实时读取,前端展示控制仅是体验优化。
