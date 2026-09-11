import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** 简单的搜索结果项（仅含 id 和 name，供前端下拉使用） */
interface SearchItem {
  id: number;
  name: string;
}

@Injectable()
export class ManufacturerSearchService {
  constructor(private readonly prisma: PrismaService) {}

  /** 按名称模糊搜索已审核通过的厂家（供前端远程搜索下拉使用） */
  async search(keyword: string, pageSize = 20): Promise<SearchItem[]> {
    const kw = keyword.trim();
    if (!kw) return [];
    return this.prisma.manufacturer.findMany({
      where: {
        reviewStatus: 'APPROVED',
        name: { contains: kw },
      },
      select: { id: true, name: true },
      take: pageSize,
    });
  }
}
