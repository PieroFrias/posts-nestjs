import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config';
import { AuthController } from './modules/auth/auth.controller';
import {
  UsersModule,
  PostsModule,
  TagsModule,
  PostTagsModule,
  CommentsModule,
  CategoriesModule,
  JwtConfigModule,
  AuthModule,
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
    JwtConfigModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
