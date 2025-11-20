import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ required: true, example: 'Category Name' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  name: string;
}
