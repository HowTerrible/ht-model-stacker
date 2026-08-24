import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import type { AuthedRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { userId?: number }) {
    return this.authService.login(Number(body.userId));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  me(@Req() request: AuthedRequest) {
    return this.authService.getMe(request.user!.sub);
  }
}
