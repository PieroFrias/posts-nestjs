import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, PostsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
