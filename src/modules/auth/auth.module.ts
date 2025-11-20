import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtConfigModule } from './jwt-config.module';
import { JwtStrategy } from './strategies';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, JwtConfigModule, PassportModule],
})
export class AuthModule {}
