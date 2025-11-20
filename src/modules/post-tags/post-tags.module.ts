import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './entities';
import { PostTagsService } from './post-tags.service';
import { PostTagsController } from './post-tags.controller';
import { TagsModule } from '../tags/tags.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostTag]), forwardRef(() => PostsModule), TagsModule],
  controllers: [PostTagsController],
  providers: [PostTagsService],
  exports: [PostTagsService],
})
export class PostTagsModule {}
