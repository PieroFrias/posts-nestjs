import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities';
import { CreateCommentDto, FilterCommentDto, UpdateCommentDto } from './dto';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
import { buildQueryComments } from './helpers';
import { Role } from '../../common/constants';
import { ErrorMessage, SuccessMessage } from '../../common/utils';
import { ICreateResponse, IFindAllResponse, IUpdateResponse } from '../../common/interfaces';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async create(createDto: CreateCommentDto, authorId: string): Promise<ICreateResponse<Comment>> {
    const { postId, title } = createDto;

    const [post, author] = await Promise.all([
      this.postsService.findOne(postId),
      this.usersService.findOne(authorId),
    ]);

    let newComment = this.repo.create({ ...createDto, post, author });
    newComment = await this.repo.save(newComment);

    return {
      data: newComment,
      message: SuccessMessage.created('Comment', title),
    };
  }

  async findAll(filterDto: FilterCommentDto): Promise<IFindAllResponse<Comment>> {
    const { page = 1, pageSize = 10 } = filterDto;

    const [data, totalItems] = await buildQueryComments(this.repo, filterDto);
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.repo.findOne({
      where: { id },
      relations: ['post', 'author'],
    });

    !comment && ErrorMessage.notFound('Comment', id);

    return comment;
  }

  async update(
    id: string,
    updateDto: UpdateCommentDto,
    authorId: string,
  ): Promise<IUpdateResponse<Comment>> {
    const comment = await this.findOne(id);
    const isCommentCreator = authorId == comment.author.id;

    !isCommentCreator && ErrorMessage.onlyCreatorCanModifyComment();

    let updatedComment = this.repo.merge(comment, updateDto);
    updatedComment = await this.repo.save(updatedComment);

    return {
      data: updatedComment,
      message: SuccessMessage.updated('Comment', id),
    };
  }

  async remove(id: string, author: User) {
    const { id: authorId, role } = author;
    const comment = await this.findOne(id);
    const isAdmin = role == Role.ADMIN;
    const isCommentCreator = authorId == comment.author.id;

    !isAdmin && !isCommentCreator && ErrorMessage.onlyCreatorOrAdminCanRemoveComment();

    await this.repo.remove(comment);

    return {
      message: SuccessMessage.deleted('Comment', id),
    };
  }
}
