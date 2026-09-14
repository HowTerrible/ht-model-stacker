import { Controller, Get, Query } from '@nestjs/common';
import { ShopSearchService } from './shop-search.service';

@Controller('shops')
export class ShopSearchController {
  constructor(private readonly searchService: ShopSearchService) {}

  /** 按名称 / 外号模糊搜索店铺，供前端远程搜索下拉使用 */
  @Get('search')
  search(@Query('keyword') keyword: string, @Query('pageSize') pageSize: string) {
    return this.searchService.search(keyword ?? '', Number(pageSize) || 20);
  }
}