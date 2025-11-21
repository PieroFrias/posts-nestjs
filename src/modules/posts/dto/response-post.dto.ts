import { Expose, Transform, Type } from 'class-transformer';
import { CategoryResponseDto } from '../../categories/dto';
import { TagResponseDto } from '../../tags/dto';
import { UserResponseDto } from '../../users/dto';
import { PostStatus } from '../../../common/constants';

export class CreatePostResponseDto {
  @Expose() id: string;

  @Transform(({ obj }) => obj.author?.id)
  @Expose()
  authorId: string;

  @Transform(({ obj }) => obj.category?.id)
  @Expose()
  categoryId: string;

  @Expose()
  tags: string[];

  @Expose() title: string;

  @Expose() content: string;

  @Expose() status: PostStatus;

  @Expose() createdAt: Date;

  @Expose() updatedAt: Date;
}

export class UpdatePostResponseDto extends CreatePostResponseDto {}

export class FindAllPostResponseDto {
  @Expose() id: string;

  @Expose() title: string;

  @Expose() content: string;

  @Expose() status: PostStatus;

  @Expose() createdAt: Date;

  @Expose() updatedAt: Date;

  @Type(() => UserResponseDto)
  @Expose()
  author: UserResponseDto;

  @Type(() => CategoryResponseDto)
  @Expose()
  category: CategoryResponseDto;

  @Type(() => TagResponseDto)
  @Expose()
  tags: TagResponseDto[];
}

export class FindOnePostResponseDto extends FindAllPostResponseDto {}

export class ChangeStatusPostResponseDto extends FindOnePostResponseDto {}
