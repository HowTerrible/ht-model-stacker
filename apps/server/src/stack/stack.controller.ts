import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthedRequest } from '../auth/auth.types';
import { StackService, CreateStackDto, UpdateStackDto, ListStacksDto } from './stack.service';

/** 堆积管理接口（需登录） */
@Controller('stacks')
@UseGuards(JwtAuthGuard)
export class StackController {
  constructor(private readonly stackService: StackService) {}

  /** 查询当前用户的堆积列表（分页），支持按状态/关键字/时间范围过滤 */
  @Get()
  list(@Req() req: AuthedRequest, @Query() query: ListStacksDto) {
    return this.stackService.list(req.user!.sub, query);
  }

  /** 获取当前用户的单条堆积详情（仅限本人） */
  @Get(':id')
  getById(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.stackService.getById(req.user!.sub, Number(id));
  }

  /** 新建堆积记录（产品/厂家不强制关联资料库） */
  @Post()
  create(@Req() req: AuthedRequest, @Body() body: CreateStackDto) {
    return this.stackService.create(req.user!.sub, body);
  }

  /** 更新堆积记录（仅修改购买/状态/位置/备注等；产品/厂家不可修改） */
  @Patch(':id')
  update(@Req() req: AuthedRequest, @Param('id') id: string, @Body() body: UpdateStackDto) {
    return this.stackService.update(req.user!.sub, Number(id), body);
  }

  /** 删除堆积记录（仅限本人） */
  @Delete(':id')
  delete(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.stackService.delete(req.user!.sub, Number(id));
  }
}
