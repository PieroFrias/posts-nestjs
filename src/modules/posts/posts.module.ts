import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { PostTagsModule } from '../post-tags/post-tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule, UsersModule, PostTagsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
