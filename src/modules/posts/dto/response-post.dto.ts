import { Expose, Transform, Type } from 'class-transformer';
import { CategoryResponseDto } from '../../categories/dto';
import { TagResponseDto } from '../../tags/dto';
import { UserResponseDto } from '../../users/dto';
import { PostStatus } from '../../../common/constants';
import { FindOneCommentResponseDto } from '../../comments/dto';

export class BasePostResponseDto {
  @Expose() id: string;

  @Expose() title: string;

  @Expose() content: string;

  @Expose() status: PostStatus;

  @Expose() createdAt: Date;

  @Expose() updatedAt: Date;
}

export class CreatePostResponseDto extends BasePostResponseDto {
  @Expose()
  @Transform(({ obj }) => obj.author?.id)
  authorId: string;

  @Expose()
  @Transform(({ obj }) => obj.category?.id)
  categoryId: string;

  @Expose()
  tags: string[];
}

export class UpdatePostResponseDto extends CreatePostResponseDto {}

export class FindAllPostResponseDto extends BasePostResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;

  @Expose()
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto;

  @Expose()
  @Type(() => TagResponseDto)
  tags: TagResponseDto[];
}

export class FindOnePostResponseDto extends BasePostResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;

  @Expose()
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto;

  @Expose()
  @Type(() => FindOneCommentResponseDto)
  comments: FindOneCommentResponseDto[];

  @Expose()
  @Type(() => TagResponseDto)
  tags: TagResponseDto[];
}

export class ChangeStatusPostResponseDto extends FindOnePostResponseDto {}
