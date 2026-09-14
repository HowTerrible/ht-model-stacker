import { Module } from '@nestjs/common';
import { ShopSearchService } from './shop-search.service';
import { ShopSearchController } from './shop-search.controller';

@Module({
  controllers: [ShopSearchController],
  providers: [ShopSearchService],
  exports: [ShopSearchService],
})
export class ShopSearchModule {}