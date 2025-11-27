import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { trimIfNotEmpty } from '../../../common/utils';

export class CreateCommentDto {
  @ApiProperty({ required: true, example: 'c8a19a70-ef32-4c19-b4df-64ea093683df' })
  @IsUUID()
  postId: string;

  @ApiProperty({ required: true, example: 'Comment Title' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: false, example: 'Comment Content...' })
  @Transform(trimIfNotEmpty)
  @IsOptional()
  content?: string;
}
