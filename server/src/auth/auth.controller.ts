import { Controller, Post, UseGuards, Request, Get, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req, @Res({passthrough: true}) res: Response) {
      return this.authService.login(req.user, res);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Res({passthrough: true}) res: Response) {
      return this.authService.logout(res);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}
