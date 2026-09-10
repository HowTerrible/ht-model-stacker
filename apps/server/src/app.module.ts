import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { PrismaModule } from './prisma/prisma.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, SubmissionModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule {}
