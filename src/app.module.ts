import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config';
import {
  UsersModule,
  PostsModule,
  TagsModule,
  PostTagsModule,
  CommentsModule,
  CategoriesModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
    PostTagsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
