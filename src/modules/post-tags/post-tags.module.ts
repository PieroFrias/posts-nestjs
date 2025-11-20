import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './entities';
import { PostTagsService } from './post-tags.service';
import { PostTagsController } from './post-tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostTag])],
  controllers: [PostTagsController],
  providers: [PostTagsService],
})
export class PostTagsModule {}
