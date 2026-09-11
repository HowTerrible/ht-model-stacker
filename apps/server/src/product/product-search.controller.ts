import { Controller, Get, Query } from '@nestjs/common';
import { ProductSearchService } from './product-search.service';

@Controller('products')
export class ProductSearchController {
  constructor(private readonly searchService: ProductSearchService) {}

  /** 按名称模糊搜索已审核通过的产品，供前端远程搜索下拉使用 */
  @Get('search')
  search(@Query('keyword') keyword: string, @Query('pageSize') pageSize: string) {
    return this.searchService.search(keyword ?? '', Number(pageSize) || 20);
  }
}
