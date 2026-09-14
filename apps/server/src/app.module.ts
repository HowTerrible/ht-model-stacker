import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { PrismaModule } from './prisma/prisma.module';
import { SubmissionModule } from './submission/submission.module';
import { StackModule } from './stack/stack.module';
import { ManufacturerSearchModule } from './manufacturer/manufacturer-search.module';
import { ProductSearchModule } from './product/product-search.module';
import { ShopSearchModule } from './shop/shop-search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    SubmissionModule,
    StackModule,
    ManufacturerSearchModule,
    ProductSearchModule,
    ShopSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule {}
