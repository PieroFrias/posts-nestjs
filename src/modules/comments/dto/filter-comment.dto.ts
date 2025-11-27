import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dtos';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterCommentDto extends PaginationDto {
  @ApiProperty({ required: false, description: `Filter by Author` })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiProperty({ required: false, description: `Filter by Post` })
  @IsOptional()
  @IsUUID()
  postId?: string;

  @ApiProperty({ required: false, description: `Filter by title or content` })
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  searchTerm?: string;
}
