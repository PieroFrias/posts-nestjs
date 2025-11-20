import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register in Posts System' })
  register(@Body() registerDto: RegisterDto) {
    return this.service.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login in the system' })
  login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto);
  }
}
