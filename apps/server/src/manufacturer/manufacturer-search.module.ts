import { Module } from '@nestjs/common';
import { ManufacturerSearchService } from './manufacturer-search.service';
import { ManufacturerSearchController } from './manufacturer-search.controller';

@Module({
  controllers: [ManufacturerSearchController],
  providers: [ManufacturerSearchService],
  exports: [ManufacturerSearchService],
})
export class ManufacturerSearchModule {}
