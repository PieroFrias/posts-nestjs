import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { checkPostExists } from './helpers';
import { PostTagsService } from '../post-tags/post-tags.service';
import { ErrorMessage, SuccessMessage } from 'src/common/utils';
import { ChangeStatusResponse } from 'src/common/interfaces';

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

  async create(createDto: CreatePostDto) {
    const { title, categoryId, tags, ...rest } = createDto;

    // const user = await this.usersService.findOne(userId);
    const category = await this.categoriesService.findOne(categoryId);

    await checkPostExists(this.repo, title);

    let newPost = this.repo.create({ ...rest, title, category });
    newPost = await this.repo.save(newPost);

    await this.postTagsService.associateTagsWithPost(newPost, tags);

    const response = { ...newPost, tags };

    return {
      data: response,
      message: SuccessMessage.created('Post', title),
    };
  }

  async findAll() {
    return `This action returns all posts`;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.repo.findOne({ where: { id } });

    !post && ErrorMessage.notFound('Post', id);

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async changeStatus(id: string): Promise<ChangeStatusResponse<Post>> {
    const post = await this.findOne(id);
    const isPublished = post.isPublished === true;

    post.isPublished = isPublished ? false : true;
    await this.repo.save(post);

    const postStatus = post.isPublished;
    const newStatus = postStatus ? 'Published' : 'Draft';

    return {
      data: post,
      message: SuccessMessage.statusChanged('Post', id, newStatus),
    };
  }
}
