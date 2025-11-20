import { Module } from '@nestjs/common';
import { PostTagsService } from './post-tags.service';
import { PostTagsController } from './post-tags.controller';

@Module({
  controllers: [PostTagsController],
  providers: [PostTagsService],
})
export class PostTagsModule {}
