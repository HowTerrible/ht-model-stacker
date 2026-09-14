import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** 简单的搜索结果项（仅含 id 和 name，供前端下拉使用） */
interface SearchItem {
  id: number;
  name: string;
}

@Injectable()
export class ShopSearchService {
  constructor(private readonly prisma: PrismaService) {}

  /** 按名称 / 外号模糊搜索店铺（供前端远程搜索下拉使用） */
  async search(keyword: string, pageSize = 20): Promise<SearchItem[]> {
    const kw = keyword.trim();
    if (!kw) return [];
    return this.prisma.shop.findMany({
      where: {
        OR: [{ name: { contains: kw } }, { nickname: { contains: kw } }],
      },
      select: { id: true, name: true },
      take: pageSize,
    });
  }
}