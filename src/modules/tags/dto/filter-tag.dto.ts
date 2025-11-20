import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dtos';

export class FilterTagDto extends PaginationDto {
  @ApiProperty({ required: false, description: 'Filter by name' })
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
