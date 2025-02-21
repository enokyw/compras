import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto, AuthResponseDto } from 'src/domain/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: AuthDto): Promise<AuthResponseDto> {
    return this.authService.login(credentials);
  }
}
//@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))