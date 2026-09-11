import { Controller, Get, Query } from '@nestjs/common';
import { ManufacturerSearchService } from './manufacturer-search.service';

@Controller('manufacturers')
export class ManufacturerSearchController {
  constructor(private readonly searchService: ManufacturerSearchService) {}

  /** 按名称模糊搜索已审核通过的厂家，供前端远程搜索下拉使用 */
  @Get('search')
  search(@Query('keyword') keyword: string, @Query('pageSize') pageSize: string) {
    return this.searchService.search(keyword ?? '', Number(pageSize) || 20);
  }
}
