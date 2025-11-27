import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from './dto';
import { buildQueryPosts, checkPostExists } from './helpers';
import { UsersService } from '../users/users.service';
import { PostTagsService } from '../post-tags/post-tags.service';
import { CategoriesService } from '../categories/categories.service';
import { PostStatus, Role } from '../../common/constants';
import { ErrorMessage, getStatusConditionByRole, SuccessMessage } from '../../common/utils';
import {
  IChangeStatusResponse,
  ICreateResponse,
  IFindAllResponse,
  IUpdateResponse,
} from '../../common/interfaces';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
    @Inject(forwardRef(() => PostTagsService))
    private readonly postTagsService: PostTagsService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createDto: CreatePostDto, authorId: string): Promise<ICreateResponse<Post>> {
    const { title, categoryId, tags, ...rest } = createDto;

    const author = await this.usersService.findOne(authorId);
    const category = await this.categoriesService.findOne(categoryId);

    await checkPostExists(this.repo, title);

    let newPost = this.repo.create({ ...rest, title, category, author });
    newPost = await this.repo.save(newPost);

    await this.postTagsService.associateTagsWithPost(newPost, tags);

    const response = { ...newPost, tags };

    return {
      data: response,
      message: SuccessMessage.created('Post', title),
    };
  }

  async findAll(filterDto: FilterPostDto, role?: Role): Promise<IFindAllResponse<Post>> {
    const { page = 1, pageSize = 10 } = filterDto;

    const [posts, totalItems] = await buildQueryPosts(this.repo, filterDto, role);
    const totalPages = Math.ceil(totalItems / pageSize);

    const data = posts.map((post) => ({
      ...post,
      tags: post.postTags.map((pt) => ({ ...pt.tag })),
    }));

    return {
      data,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async findOne(id: string, role?: Role): Promise<Post> {
    const statusCondition = getStatusConditionByRole(role, PostStatus);

    const post = await this.repo.findOne({
      where: { id, ...statusCondition },
      relations: ['author', 'category', 'comments.author', 'postTags.tag'],
    });

    !post && ErrorMessage.notFound('Post', id);

    const data = {
      ...post,
      tags: post.postTags.map((item) => ({ ...item.tag })),
      comments: post.comments.map((item) => ({ ...item })),
    };

    return data;
  }

  async update(id: string, updateDto: UpdatePostDto, role: Role): Promise<IUpdateResponse<Post>> {
    const { title, categoryId, tags, ...rest } = updateDto;

    const [post, category] = await Promise.all([
      this.findOne(id, role),
      categoryId && this.categoriesService.findOne(categoryId),
      checkPostExists(this.repo, title, id),
    ]);

    let updatedPost = this.repo.merge(post, { ...rest, title, category });
    updatedPost = await this.repo.save(updatedPost);

    await this.postTagsService.associateTagsWithPost(updatedPost, tags, id);

    const response = { ...updatedPost, tags };

    return {
      data: response,
      message: SuccessMessage.updated('Post', id),
    };
  }

  async changeStatus(id: string, role: Role): Promise<IChangeStatusResponse<Post>> {
    const post = await this.findOne(id, role);
    const isPublished = post.status === PostStatus.PUBLISHED;

    post.status = isPublished ? PostStatus.DRAFT : PostStatus.PUBLISHED;
    await this.repo.save(post);

    const newStatus = post.status;

    return {
      data: post,
      message: SuccessMessage.statusChanged('Post', id, newStatus),
    };
  }
}
