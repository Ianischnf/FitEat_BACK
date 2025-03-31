import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfil(@Req() req){
    return req.user
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validatedUserOrCoach(loginDto);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide.');
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto)
  }
}
