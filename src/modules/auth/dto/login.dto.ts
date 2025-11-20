import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto extends PickType(CreateUserDto, ['username'] as const) {
  @ApiProperty({ required: true, example: 'Password123' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
