import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Stack } from '@model-stacker/data';
import { PrismaService } from '../prisma/prisma.service';

// ---------------------------------------------------------------------------
// 数据库行 → 类型层对象
// ---------------------------------------------------------------------------

function mapStack(row: any): Stack {
  return {
    id: row.id,
    userId: row.userId,
    productId: row.productId ?? undefined,
    manufacturerId: row.manufacturerId ?? undefined,
    categoryId: row.categoryId ?? undefined,
    itemName: row.itemName ?? row.product?.name ?? undefined,
    manufacturerName: row.manufacturerName ?? row.manufacturer?.name ?? undefined,
    kind: row.product?.kind ?? undefined,
    modelNo: row.modelNo ?? undefined,
    orderNo: row.orderNo ?? undefined,
    purchasedAt: row.purchasedAt?.toISOString().split('T')[0] ?? undefined,
    purchasePrice: row.purchasePrice ?? undefined,
    currency: row.currency,
    shippedAt: row.shippedAt?.toISOString().split('T')[0] ?? undefined,
    receivedAt: row.receivedAt?.toISOString().split('T')[0] ?? undefined,
    expressCompany: row.expressCompany ?? undefined,
    trackingNo: row.trackingNo ?? undefined,
    shopId: row.shopId ?? undefined,
    shopName: row.shopName ?? row.shop?.name ?? undefined,
    channel: row.channel ?? undefined,
    status: row.status,
    likeness: row.likeness ?? undefined,
    stage: row.stage ?? undefined,
    wipId: row.wipId ?? undefined,
    location: row.location ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** 堆积分页/详情查询共用的关联子查询 */
const stackInclude = {
  product: { select: { name: true, kind: true } },
  manufacturer: { select: { name: true } },
  shop: { select: { name: true } },
} as const;

// ---------------------------------------------------------------------------
// DTO
// ---------------------------------------------------------------------------

export interface CreateStackDto {
  manufacturer?: number | string;
  product?: number | string;
  itemName?: string;
  manufacturerName?: string;
  modelNo?: string;
  orderNo?: string;
  purchasedAt?: string;
  purchasePrice?: number;
  currency?: string;
  shippedAt?: string;
  receivedAt?: string;
  expressCompany?: string;
  trackingNo?: string;
  channel?: string;
  /** 购买店铺：选中的后端店铺为 ID；用户新增为名称 */
  shop?: number | string;
  status?: string;
  likeness?: number;
  location?: string;
  notes?: string;
}

export interface UpdateStackDto {
  orderNo?: string;
  purchasedAt?: string;
  purchasePrice?: number;
  currency?: string;
  shippedAt?: string;
  receivedAt?: string;
  expressCompany?: string;
  trackingNo?: string;
  channel?: string;
  /** 购买店铺：选中的后端店铺为 ID；用户新增为名称 */
  shop?: number | string;
  status?: string;
  likeness?: number;
  location?: string;
  notes?: string;
}

export interface ListStacksDto {
  status?: string;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

@Injectable()
export class StackService {
  constructor(private readonly prisma: PrismaService) {}

  /** 获取当前用户的堆积列表（分页） */
  async list(userId: number, dto: ListStacksDto): Promise<{ items: Stack[]; total: number }> {
    const { status, keyword, startDate, endDate } = dto;
    const page = Math.max(1, Number(dto.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(dto.pageSize) || 20));
    const where: Prisma.StackWhereInput = { userId };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.purchasedAt = {};
      if (startDate) (where.purchasedAt as any).gte = new Date(startDate);
      if (endDate) (where.purchasedAt as any).lte = new Date(endDate + 'T23:59:59');
    }

    if (keyword?.trim()) {
      const kw = keyword.trim();
      where.OR = [
        { itemName: { contains: kw } },
        { manufacturerName: { contains: kw } },
        { modelNo: { contains: kw } },
        { notes: { contains: kw } },
      ];
    }

    const [rows, total] = await Promise.all([
      this.prisma.stack.findMany({
        where,
        orderBy: { purchasedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: stackInclude,
      }),
      this.prisma.stack.count({ where }),
    ]);

    return { items: rows.map(mapStack), total };
  }

  /** 获取当前用户的单条堆积（仅限本人） */
  async getById(userId: number, id: number): Promise<Stack> {
    const row = await this.prisma.stack.findUnique({
      where: { id },
      include: stackInclude,
    });
    if (!row) throw new NotFoundException('堆积不存在');
    if (row.userId !== userId) throw new ForbiddenException('无权查看他人堆积');
    return mapStack(row);
  }

  /** 创建堆积记录 */
  async create(userId: number, dto: CreateStackDto): Promise<Stack> {
    let manufacturerId: number | undefined;
    let productId: number | undefined;
    let itemName: string | undefined;
    let manufacturerName: string | undefined;
    let modelNo: string | undefined;
    let shopId: number | undefined;
    let shopName: string | undefined;

    // 解析厂家：数字 = 选中已有厂家，字符串 = 新建文字
    if (dto.manufacturer != null) {
      if (typeof dto.manufacturer === 'number') {
        manufacturerId = dto.manufacturer;
      } else {
        const text = String(dto.manufacturer).trim();
        if (text) manufacturerName = text;
      }
    }

    // 解析产品：数字 = 选中已有产品，字符串 = 新建文字
    if (dto.product != null) {
      if (typeof dto.product === 'number') {
        productId = dto.product;
        modelNo = dto.modelNo || undefined;
      } else {
        const text = String(dto.product).trim();
        if (text) itemName = text;
        modelNo = dto.modelNo || undefined;
      }
    }

    if (!itemName && productId == null) {
      throw new BadRequestException('必须填写产品或选择已有产品');
    }

    // 解析店铺：数字 = 选中已有店铺，字符串 = 新建文字
    if (dto.shop != null) {
      if (typeof dto.shop === 'number') {
        shopId = dto.shop;
      } else {
        const text = String(dto.shop).trim();
        if (text) shopName = text;
      }
    }

    const row = await this.prisma.stack.create({
      data: {
        userId,
        productId: productId ?? undefined,
        manufacturerId: manufacturerId ?? undefined,
        itemName: itemName ?? undefined,
        manufacturerName: manufacturerName ?? undefined,
        modelNo: modelNo ?? undefined,
        orderNo: dto.orderNo || undefined,
        purchasedAt: dto.purchasedAt ? new Date(dto.purchasedAt) : undefined,
        purchasePrice: dto.purchasePrice,
        currency: dto.currency || 'CNY',
        shippedAt: dto.shippedAt ? new Date(dto.shippedAt) : undefined,
        receivedAt: dto.receivedAt ? new Date(dto.receivedAt) : undefined,
        expressCompany: dto.expressCompany || undefined,
        trackingNo: dto.trackingNo || undefined,
        channel: dto.channel || undefined,
        shopId: shopId ?? undefined,
        shopName: shopName ?? undefined,
        status: dto.status || 'UNSTARTED',
        likeness: dto.likeness,
        location: dto.location || undefined,
        notes: dto.notes || undefined,
      },
      include: stackInclude,
    });

    return mapStack(row);
  }

  /** 更新堆积记录（仅限本人；产品/厂家/货号不可修改） */
  async update(userId: number, id: number, dto: UpdateStackDto): Promise<Stack> {
    const row = await this.prisma.stack.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('堆积不存在');
    if (row.userId !== userId) throw new ForbiddenException('无权修改他人堆积');

    const updated = await this.prisma.stack.update({
      where: { id },
      data: {
        orderNo: dto.orderNo,
        purchasedAt: dto.purchasedAt ? new Date(dto.purchasedAt) : undefined,
        purchasePrice: dto.purchasePrice,
        currency: dto.currency,
        shippedAt: dto.shippedAt ? new Date(dto.shippedAt) : undefined,
        receivedAt: dto.receivedAt ? new Date(dto.receivedAt) : undefined,
        expressCompany: dto.expressCompany,
        trackingNo: dto.trackingNo,
        channel: dto.channel,
        shopId: typeof dto.shop === 'number' ? dto.shop : undefined,
        shopName: typeof dto.shop === 'string' ? dto.shop || undefined : undefined,
        status: dto.status,
        likeness: dto.likeness,
        location: dto.location,
        notes: dto.notes,
      },
      include: stackInclude,
    });

    return mapStack(updated);
  }

  /** 删除堆积记录（仅限本人） */
  async delete(userId: number, id: number): Promise<void> {
    const row = await this.prisma.stack.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('堆积不存在');
    if (row.userId !== userId) throw new ForbiddenException('无权删除他人堆积');
    await this.prisma.stack.delete({ where: { id } });
  }
}
