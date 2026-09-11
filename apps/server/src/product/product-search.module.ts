import { Module } from '@nestjs/common';
import { ProductSearchService } from './product-search.service';
import { ProductSearchController } from './product-search.controller';

@Module({
  controllers: [ProductSearchController],
  providers: [ProductSearchService],
  exports: [ProductSearchService],
})
export class ProductSearchModule {}
