import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto, AuthResponseDto } from 'src/domain/auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: 200, description: 'SessionId and SessionTimeout' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async login(@Body() credentials: AuthDto): Promise<AuthResponseDto> {
    return this.authService.login(credentials);
  }
}