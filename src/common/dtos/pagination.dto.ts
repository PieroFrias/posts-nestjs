import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false, description: 'Page number' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number;

  @ApiProperty({ default: 10, required: false, description: 'Items per page' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  pageSize?: number;
}
