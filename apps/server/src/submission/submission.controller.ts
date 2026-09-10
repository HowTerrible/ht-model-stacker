import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Permission, ManufacturerSubmissionInput, ProductSubmissionInput } from '@model-stacker/data';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { AuthedRequest } from '../auth/auth.types';
import { SubmissionService } from './submission.service';

const AdminGuards = [JwtAuthGuard, RolesGuard];

/** 分页查询参数 */
interface PageQuery {
  reviewStatus?: string;
  keyword?: string;
  kind?: string;
  page?: number;
  pageSize?: number;
}

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly service: SubmissionService) {}

  // ---------- 用户提交（需登录）----------

  /**
   * 提交厂家资料。
   * 写入 ManufacturerSubmission（状态 PENDING），供管理员审核。
   * 请求体为厂家各字段（见 ManufacturerSubmissionInput）。
   */
  @Post('manufacturers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  submitManufacturer(@Req() req: AuthedRequest, @Body() body: ManufacturerSubmissionInput) {
    return this.service.submitManufacturer(req.user!.sub, body);
  }

  /**
   * 提交产品资料。
   * 写入 ProductSubmission（状态 PENDING），供管理员审核。
   * 请求体为产品各字段（见 ProductSubmissionInput）；
   * 厂家不强绑定：可传 manufacturerId 或仅传 manufacturerName 自由文本。
   */
  @Post('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  submitProduct(@Req() req: AuthedRequest, @Body() body: ProductSubmissionInput) {
    return this.service.submitProduct(req.user!.sub, body);
  }

  /**
   * 查询「我的」厂家提交列表（分页）。
   * 仅返回当前登录用户发起的厂家提交，可按 reviewStatus 过滤。
   */
  @Get('my/manufacturers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  myManufacturers(@Req() req: AuthedRequest, @Query() query: PageQuery) {
    return this.service.listMyManufacturerSubmissions(req.user!.sub, query);
  }

  /**
   * 查询「我的」产品提交列表（分页）。
   * 仅返回当前登录用户发起的产品提交，可按 reviewStatus 过滤。
   */
  @Get('my/products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  myProducts(@Req() req: AuthedRequest, @Query() query: PageQuery) {
    return this.service.listMyProductSubmissions(req.user!.sub, query);
  }

  // ---------- 管理员：列表与审核（需 ADMIN 权限）----------

  /**
   * 管理员：厂家提交审核列表（分页）。
   * 可按 reviewStatus / keyword 过滤，用于审核工作台展示待处理提交。
   */
  @Get('manufacturers')
  @Roles(Permission.ADMIN)
  @UseGuards(...AdminGuards)
  listManufacturers(@Query() query: PageQuery) {
    return this.service.listManufacturerSubmissions(query);
  }

  /**
   * 管理员：产品提交审核列表（分页）。
   * 可按 reviewStatus / kind / keyword 过滤，用于审核工作台展示待处理提交。
   */
  @Get('products')
  @Roles(Permission.ADMIN)
  @UseGuards(...AdminGuards)
  listProducts(@Query() query: PageQuery) {
    return this.service.listProductSubmissions(query);
  }

  /**
   * 管理员：通过「厂家提交」。
   * 将该提交「合并」进正式资料库 Manufacturer（同名已存在则复用），
   * 并把合并结果写回 submission.linkedManufacturerId。
   */
  @Post('manufacturers/:id/approve')
  @Roles(Permission.ADMIN)
  @UseGuards(...AdminGuards)
  approveManufacturer(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.service.approveManufacturer(Number(id), req.user!.sub);
  }

  /**
   * 管理员：拒绝「厂家提交」。
   * 仅更新审核状态为 REJECTED 并记录审核意见（reviewNote），不写正式库。
   * 请求体：{ note?: string } 拒绝原因（选填）。
   */
  @Post('manufacturers/:id/reject')
  @Roles(Permission.ADMIN)
  @UseGuards(...AdminGuards)
  rejectManufacturer(@Req() req: AuthedRequest, @Param('id') id: string, @Body() body: { note?: string }) {
    return this.service.rejectManufacturer(Number(id), req.user!.sub, body.note ?? '');
  }

  /**
   * 管理员：通过「产品提交」。
   * 解析 / 新建厂家（优先请求体指定 manufacturerId，其次提交自带，再按 manufacturerName 自动建档），
   * 合并进正式产品表 Product（同名同厂家已存在则复用产品），
   * 并把合并结果写回 submission.linkedProductId / linkedManufacturerId。
   * 请求体：{ manufacturerId?: number } 可选，审核时手动指定厂家。
   */
  @Post('products/:id/approve')
  @Roles(Permission.ADMIN)
  @UseGuards(...AdminGuards)
  approveProduct(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Body() body: { manufacturerId?: number },
  ) {
    return this.service.approveProduct(Number(id), req.user!.sub, { manufacturerId: body.manufacturerId });
  }

  /**
   * 管理员：拒绝「产品提交」。
   * 仅更新审核状态为 REJECTED 并记录审核意见（reviewNote），不写正式库。
   * 请求体：{ note?: string } 拒绝原因（选填）。
   */
  @Post('products/:id/reject')
  @Roles(Permission.ADMIN)
  @UseGuards(...AdminGuards)
  rejectProduct(@Req() req: AuthedRequest, @Param('id') id: string, @Body() body: { note?: string }) {
    return this.service.rejectProduct(Number(id), req.user!.sub, body.note ?? '');
  }
}
