import { Controller, Get } from '@nestjs/common';
import { ProductKind } from '@model-stacker/data';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return this.appService.health();
  }

  @Get('meta')
  meta() {
    return {
      productKinds: Object.values(ProductKind),
    };
  }
}
