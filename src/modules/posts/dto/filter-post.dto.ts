import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../../../common/dtos';
import { BaseStatus, PostStatus } from '../../../common/constants';

export class FilterPostDto extends PaginationDto {
  @ApiProperty({ required: false, description: `Filter by Author PA PROBAR NOMÁ` })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiProperty({ required: false, description: `Filter by Category` })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ required: false, type: [String], description: `Filter by Tags` })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tagIds?: string[];

  @ApiProperty({ required: false, description: `Filter by title or content` })
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ required: false, type: 'string', enum: PostStatus })
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PostStatus)
  status?: BaseStatus;
}
