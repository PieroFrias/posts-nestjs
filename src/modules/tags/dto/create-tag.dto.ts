import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ required: true, example: 'Example Tag' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  name: string;
}
