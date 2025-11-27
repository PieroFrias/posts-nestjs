import { Expose, Transform, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/dto';
import { FindOnePostResponseDto } from '../../posts/dto';

export class BaseCommentResponseDto {
  @Expose() id: string;

  @Expose() title: string;

  @Expose() content: string;

  @Expose() createdAt: Date;

  @Expose() updatedAt: Date;
}

export class CreateCommentResponseDto extends BaseCommentResponseDto {
  @Expose()
  @Transform(({ obj }) => obj?.post.id)
  postId: string;

  @Expose()
  @Transform(({ obj }) => obj?.author.id)
  authorId: string;
}

export class UpdateCommentResponseDto extends CreateCommentResponseDto {}

export class FindAllCommentResponseDto extends BaseCommentResponseDto {
  @Expose()
  @Type(() => FindOnePostResponseDto)
  post: FindOnePostResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;
}

export class FindOneCommentResponseDto extends BaseCommentResponseDto {
  @Expose()
  @Type(() => FindOnePostResponseDto)
  post: FindOnePostResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;
}
