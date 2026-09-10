import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ManufacturerSubmission as MsType,
  ProductSubmission as PsType,
  ManufacturerSubmissionInput,
  ProductSubmissionInput,
} from '@model-stacker/data';
import { PrismaService } from '../prisma/prisma.service';

/** 数组 / JSON 内容统一按 JSON 字符串落库（与资料库字段口径一致） */
function toJson(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  return JSON.stringify(value);
}

function fromJson<T = unknown>(value: string | null | undefined): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

/** 数据库行 -> 类型层对象（解包 JSON 字段） */
function mapManufacturerSubmission(row: any): MsType {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    fullName: row.fullName ?? undefined,
    country: row.country ?? undefined,
    website: row.website ?? undefined,
    description: row.description ?? undefined,
    logoUrl: row.logoUrl ?? undefined,
    dataSource: row.dataSource ?? undefined,
    note: row.note ?? undefined,
    reviewStatus: row.reviewStatus,
    reviewDate: row.reviewDate?.toISOString() ?? undefined,
    reviewerId: row.reviewerId ?? undefined,
    reviewNote: row.reviewNote ?? undefined,
    linkedManufacturerId: row.linkedManufacturerId ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapProductSubmission(row: any): PsType {
  return {
    id: row.id,
    userId: row.userId,
    manufacturerId: row.manufacturerId ?? undefined,
    manufacturerName: row.manufacturerName ?? undefined,
    themeId: row.themeId ?? undefined,
    name: row.name,
    officialName: row.officialName ?? undefined,
    modelNo: row.modelNo ?? undefined,
    kind: row.kind,
    modelTypes: (fromJson<string[]>(row.modelTypes) ?? []) as PsType['modelTypes'],
    toolType: row.toolType ?? undefined,
    material: row.material ?? undefined,
    accessoryMaterials: (fromJson<string[]>(row.accessoryMaterials) ?? []) as PsType['accessoryMaterials'],
    scale: row.scale ?? undefined,
    year: row.year ?? undefined,
    releaseDate: row.releaseDate?.toISOString() ?? undefined,
    description: row.description ?? undefined,
    manuals: fromJson<string[]>(row.manuals) ?? [],
    photos: fromJson<string[]>(row.photos) ?? [],
    tags: fromJson<string[]>(row.tags) ?? [],
    dataSource: row.dataSource ?? undefined,
    manualsSource: row.manualsSource ?? undefined,
    photosSource: row.photosSource ?? undefined,
    note: row.note ?? undefined,
    reviewStatus: row.reviewStatus,
    reviewDate: row.reviewDate?.toISOString() ?? undefined,
    reviewerId: row.reviewerId ?? undefined,
    reviewNote: row.reviewNote ?? undefined,
    linkedProductId: row.linkedProductId ?? undefined,
    linkedManufacturerId: row.linkedManufacturerId ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * 提交箱业务：用户提交厂家 / 产品资料，管理员审核。
 * - 提交：写入 ManufacturerSubmission / ProductSubmission（PENDING）。
 * - 通过：把提交内容「合并」进正式资料库（Manufacturer / Product），并回填 linkedXxxId。
 * - 拒绝：仅更新审核状态与备注。
 */
@Injectable()
export class SubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- 用户提交 ----------

  async submitManufacturer(userId: number, dto: ManufacturerSubmissionInput): Promise<MsType> {
    if (!dto.name?.trim()) {
      throw new BadRequestException('厂名必填');
    }
    const row = await this.prisma.manufacturerSubmission.create({
      data: {
        userId,
        name: dto.name.trim(),
        fullName: dto.fullName,
        country: dto.country,
        website: dto.website,
        description: dto.description,
        logoUrl: dto.logoUrl,
        dataSource: dto.dataSource,
        note: dto.note,
      },
    });
    return mapManufacturerSubmission(row);
  }

  async submitProduct(userId: number, dto: ProductSubmissionInput): Promise<PsType> {
    if (!dto.name?.trim()) {
      throw new BadRequestException('产品名必填');
    }
    const row = await this.prisma.productSubmission.create({
      data: {
        userId,
        manufacturerId: dto.manufacturerId,
        manufacturerName: dto.manufacturerName,
        themeId: dto.themeId,
        name: dto.name.trim(),
        officialName: dto.officialName,
        modelNo: dto.modelNo,
        kind: dto.kind,
        modelTypes: toJson(dto.modelTypes) ?? '[]',
        toolType: dto.toolType,
        material: dto.material,
        accessoryMaterials: '[]',
        scale: dto.scale,
        year: dto.year,
        releaseDate: dto.releaseDate ? new Date(dto.releaseDate) : undefined,
        description: dto.description,
        manuals: '[]',
        photos: '[]',
        tags: '[]',
        dataSource: dto.dataSource,
        manualsSource: dto.manualsSource,
        photosSource: dto.photosSource,
        note: dto.note,
      },
    });
    return mapProductSubmission(row);
  }

  // ---------- 我的提交（用户查询） ----------

  async listMyManufacturerSubmissions(
    userId: number,
    query: { reviewStatus?: string; page?: number; pageSize?: number },
  ): Promise<{ items: MsType[]; total: number }> {
    const { page = 1, pageSize = 20, reviewStatus } = query;
    const where: Prisma.ManufacturerSubmissionWhereInput = { userId, ...(reviewStatus ? { reviewStatus } : {}) };
    const [items, total] = await Promise.all([
      this.prisma.manufacturerSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.manufacturerSubmission.count({ where }),
    ]);
    return { items: items.map(mapManufacturerSubmission), total };
  }

  async listMyProductSubmissions(
    userId: number,
    query: { reviewStatus?: string; page?: number; pageSize?: number },
  ): Promise<{ items: PsType[]; total: number }> {
    const { page = 1, pageSize = 20, reviewStatus } = query;
    const where: Prisma.ProductSubmissionWhereInput = { userId, ...(reviewStatus ? { reviewStatus } : {}) };
    const [items, total] = await Promise.all([
      this.prisma.productSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.productSubmission.count({ where }),
    ]);
    return { items: items.map(mapProductSubmission), total };
  }

  // ---------- 管理员：列表 ----------

  async listManufacturerSubmissions(query: {
    reviewStatus?: string;
    keyword?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: MsType[]; total: number }> {
    const { page = 1, pageSize = 20, reviewStatus, keyword } = query;
    const where: Prisma.ManufacturerSubmissionWhereInput = {
      ...(reviewStatus ? { reviewStatus } : {}),
      ...(keyword ? { OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }] } : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.manufacturerSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.manufacturerSubmission.count({ where }),
    ]);
    return { items: items.map(mapManufacturerSubmission), total };
  }

  async listProductSubmissions(query: {
    reviewStatus?: string;
    kind?: string;
    keyword?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: PsType[]; total: number }> {
    const { page = 1, pageSize = 20, reviewStatus, kind, keyword } = query;
    const where: Prisma.ProductSubmissionWhereInput = {
      ...(reviewStatus ? { reviewStatus } : {}),
      ...(kind ? { kind } : {}),
      ...(keyword ? { OR: [{ name: { contains: keyword } }, { manufacturerName: { contains: keyword } }] } : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.productSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.productSubmission.count({ where }),
    ]);
    return { items: items.map(mapProductSubmission), total };
  }

  // ---------- 管理员：审核 ----------

  /** 通过厂家提交：合并进 Manufacturer（或复用同名厂家），并回填 */
  async approveManufacturer(id: number, reviewerId: number): Promise<MsType> {
    const sub = await this.prisma.manufacturerSubmission.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('提交不存在');
    if (sub.reviewStatus !== 'PENDING') throw new BadRequestException('该提交已处理');

    const result = await this.prisma.$transaction(async (tx) => {
      // 复用同名已存在厂家（避免重复建档）
      const existing = await tx.manufacturer.findUnique({ where: { name: sub.name } });
      const manufacturer =
        existing ??
        (await tx.manufacturer.create({
          data: {
            name: sub.name,
            fullName: sub.fullName,
            country: sub.country,
            website: sub.website,
            description: sub.description,
            logoUrl: sub.logoUrl,
            dataSource: sub.dataSource,
            reviewStatus: 'APPROVED',
            reviewDate: new Date(),
            reviewerId,
            reviewNote: `由提交 #${sub.id} 审核建库`,
          },
        }));

      const row = await tx.manufacturerSubmission.update({
        where: { id },
        data: {
          reviewStatus: 'APPROVED',
          reviewDate: new Date(),
          reviewerId,
          linkedManufacturerId: manufacturer.id,
        },
      });
      return { row, manufacturer };
    });

    return mapManufacturerSubmission(result.row);
  }

  /** 拒绝厂家提交 */
  async rejectManufacturer(id: number, reviewerId: number, note: string): Promise<MsType> {
    const sub = await this.prisma.manufacturerSubmission.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('提交不存在');
    if (sub.reviewStatus !== 'PENDING') throw new BadRequestException('该提交已处理');

    const row = await this.prisma.manufacturerSubmission.update({
      where: { id },
      data: { reviewStatus: 'REJECTED', reviewDate: new Date(), reviewerId, reviewNote: note },
    });
    return mapManufacturerSubmission(row);
  }

  /** 通过产品提交：解析/新建厂家、建产品或复用同名产品，并回填 */
  async approveProduct(id: number, reviewerId: number, overrides?: { manufacturerId?: number }): Promise<PsType> {
    const sub = await this.prisma.productSubmission.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('提交不存在');
    if (sub.reviewStatus !== 'PENDING') throw new BadRequestException('该提交已处理');

    const after = await this.prisma.$transaction(async (tx) => {
      // 1. 解析厂家：优先用审核指定的 manufacturerId，其次提交自带 manufacturerId，再按 manufacturerName 匹配 / 新建
      let manufacturerId = overrides?.manufacturerId ?? sub.manufacturerId ?? undefined;
      if (manufacturerId == null && sub.manufacturerName) {
        const existingMf = await tx.manufacturer.findUnique({ where: { name: sub.manufacturerName } });
        if (existingMf) {
          manufacturerId = existingMf.id;
        } else {
          const createdMf = await tx.manufacturer.create({
            data: {
              name: sub.manufacturerName,
              reviewStatus: 'APPROVED',
              reviewDate: new Date(),
              reviewerId,
              reviewNote: `由产品提交 #${sub.id} 自动建档`,
            },
          });
          manufacturerId = createdMf.id;
        }
      }
      if (manufacturerId == null) {
        throw new BadRequestException('该产品提交缺少厂家信息，审核时请指定厂家');
      }

      // 2. 复用同名产品（同厂家下同名），否则新建
      const sameName = manufacturerId
        ? await tx.product.findFirst({
            where: { name: sub.name, manufacturerId: manufacturerId as number },
          })
        : null;
      const product =
        sameName ??
        (await tx.product.create({
          data: {
            manufacturerId: manufacturerId as number,
            themeId: sub.themeId,
            name: sub.name,
            officialName: sub.officialName,
            modelNo: sub.modelNo,
            kind: sub.kind,
            modelTypes: sub.modelTypes,
            toolType: sub.toolType,
            material: sub.material,
            accessoryMaterials: sub.accessoryMaterials,
            scale: sub.scale,
            year: sub.year,
            releaseDate: sub.releaseDate,
            description: sub.description,
            manuals: sub.manuals,
            photos: sub.photos,
            tags: sub.tags,
            dataSource: sub.dataSource,
            manualsSource: sub.manualsSource,
            photosSource: sub.photosSource,
            reviewStatus: 'APPROVED',
            reviewDate: new Date(),
            reviewerId,
            reviewNote: `由提交 #${sub.id} 审核建库`,
          },
        }));

      const row = await tx.productSubmission.update({
        where: { id },
        data: {
          reviewStatus: 'APPROVED',
          reviewDate: new Date(),
          reviewerId,
          linkedProductId: product.id,
          linkedManufacturerId: manufacturerId as number,
        },
      });
      return { row, product };
    });

    return mapProductSubmission(after.row);
  }

  /** 拒绝产品提交 */
  async rejectProduct(id: number, reviewerId: number, note: string): Promise<PsType> {
    const sub = await this.prisma.productSubmission.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('提交不存在');
    if (sub.reviewStatus !== 'PENDING') throw new BadRequestException('该提交已处理');

    const row = await this.prisma.productSubmission.update({
      where: { id },
      data: { reviewStatus: 'REJECTED', reviewDate: new Date(), reviewerId, reviewNote: note },
    });
    return mapProductSubmission(row);
  }

  /** 提交人本人查看详情（用于前端展示提交内容；仅限本人） */
  async assertOwner(submitterUserId: number, actualUserId: number): Promise<void> {
    if (submitterUserId !== actualUserId) throw new ForbiddenException('无权查看他人提交');
  }
}
