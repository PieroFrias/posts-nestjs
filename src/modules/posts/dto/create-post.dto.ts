import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { trimIfNotEmpty } from '../../../common/utils';

export class CreatePostDto {
  @ApiProperty({ required: true, example: 'c5b99f5f-60f7-43e2-8d8d-1d89aeceeb0e' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ required: true, example: 'Juan' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: false, example: 'Post Content.' })
  @Transform(trimIfNotEmpty)
  @IsOptional()
  content?: string;

  @ApiProperty({
    required: false,
    example: ['nestjs', 'typescript'],
    description: 'Optional tags to associate with the Post',
  })
  @Transform(({ value }) => [...new Set(value.map((tag: string) => tag?.trim()))])
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: false, description: 'Indicates if the post will be published or not' })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPublished: boolean;
}
