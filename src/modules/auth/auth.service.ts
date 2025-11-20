import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { LoginDto, RegisterDto } from './dto';
import { JwtPayload, LoginResponse, RegisterResponse } from './interfaces';
import { compareHashedPassword, ErrorMessage, SuccesMessage } from '../../common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    const newUser = await this.userService.create(registerDto as CreateUserDto);

    return {
      data: newUser,
      message: SuccesMessage.registered('User'),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { username, password } = loginDto;
    const user = await this.userService.findOneActiveByUsername(username);

    if (user && (await compareHashedPassword(password, user.password))) {
      const payload: JwtPayload = { id: user.id };
      const token = await this.jwtService.signAsync(payload);

      delete user.password;

      return { data: user, token };
    }

    ErrorMessage.invalidCredentials();
  }
}
