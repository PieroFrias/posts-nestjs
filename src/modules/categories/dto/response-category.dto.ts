import { Expose } from 'class-transformer';

export class CategoryResponseDto {
  @Expose() id: string;

  @Expose() name: string;

  @Expose() status: string;

  @Expose() createdAt: Date;

  @Expose() updatedAt: Date;
}
