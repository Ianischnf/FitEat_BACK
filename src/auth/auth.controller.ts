import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfil(@Req() req){
    return req.user
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validatedUserOrCoach(dto);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide.');
    }

    return this.authService.login(user);
  }
}
