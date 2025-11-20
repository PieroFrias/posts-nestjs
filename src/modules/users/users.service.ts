import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dto';
import { GeneralStatus } from '../../common/constants';
import { compareConfirmPassword, encodePassword, ErrorMessage } from '../../common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    const { email, username, password, confirmPassword } = createDto;

    const [isUsernameTaken, isEmailTaken] = await Promise.all([
      this.repo.findOne({ where: { username: ILike(username) } }),
      this.repo.findOne({ where: { email: ILike(email) } }),
    ]);

    isUsernameTaken && ErrorMessage.alreadyRegistered('User', username);
    isEmailTaken && ErrorMessage.alreadyRegistered('Email', email);

    compareConfirmPassword(password, confirmPassword);

    let newUser = this.repo.create(createDto);
    newUser.password = await encodePassword(password);

    newUser = await this.repo.save(newUser);

    delete newUser.password;

    return newUser;
  }

  async findOneActiveByUsername(username: string): Promise<User> {
    const user = await this.repo.findOne({
      where: { username },
      select: ['id', 'email', 'username', 'password', 'role', 'status'],
    });

    !user && ErrorMessage.invalidCredentials();
    user.status === GeneralStatus.INACTIVE && ErrorMessage.inactiveAccount();

    return user;
  }
}
