import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostTag } from './entities/post-tag.entity';
import { Post } from '../posts/entities';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class PostTagsService {
  constructor(
    @InjectRepository(PostTag)
    private postTagsRepository: Repository<PostTag>,
    private tagsService: TagsService,
  ) {}

  async associateTagsWithPost(post: Post, tagNames: string[], postId?: string): Promise<void> {
    if (!tagNames?.length) return;

    postId && this.deleteTagsByPost(postId);

    const tags = await this.tagsService.findOrCreate(tagNames);

    await Promise.all(
      tags.map(async (tag) => {
        const postTag = this.postTagsRepository.create({ post, tag });
        await this.postTagsRepository.save(postTag);
      }),
    );
  }

  async deleteTagsByPost(postId: string): Promise<void> {
    await this.postTagsRepository.delete({ post: { id: postId } });
  }
}
