import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '../constants';
import { ErrorMessage } from '../../../common/utils';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'juan.torres@gmail.com' })
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'juan.torres' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({ required: true, example: 'Password123' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, { message: ErrorMessage.passwordTooWeak() })
  password: string;

  @ApiProperty({ required: true, example: 'Password123' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
