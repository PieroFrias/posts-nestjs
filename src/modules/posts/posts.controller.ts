import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ChangeStatusPostResponseDto,
  CreatePostDto,
  CreatePostResponseDto,
  FilterPostDto,
  FindAllPostResponseDto,
  FindOnePostResponseDto,
  UpdatePostDto,
  UpdatePostResponseDto,
} from './dto';
import { User } from '../users/entities';
import { PostsService } from './posts.service';
import { Auth, GetUser } from '../auth/decorator';
import { Role } from '../../common/constants';
import { Serialize } from '../../common/decorators';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(CreatePostResponseDto)
  @ApiOperation({ summary: 'Create a new Post' })
  create(@Body() createDto: CreatePostDto, @GetUser() authUser: User) {
    return this.service.create(createDto, authUser.id);
  }

  @Get()
  @Serialize(FindAllPostResponseDto)
  @ApiOperation({ summary: 'Returns all published Posts with optional filters' })
  findAllPublisheds(@Query() filterDto: FilterPostDto) {
    return this.service.findAll(filterDto);
  }

  @Get('admin')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(FindAllPostResponseDto)
  @ApiOperation({ summary: 'Returns all Posts with pagination (authentication is required)' })
  findAll(@Query() filterDto: FilterPostDto, @GetUser() authUser: User) {
    return this.service.findAll(filterDto, authUser.role);
  }

  @Get(':id')
  @Serialize(FindOnePostResponseDto)
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiOperation({ summary: 'Returns details of a published Post by ID' })
  findOnePublished(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/admin')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(FindOnePostResponseDto)
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiOperation({ summary: 'Returns details of a Post by ID' })
  findOne(@Param('id') id: string, @GetUser() authUser: User) {
    return this.service.findOne(id, authUser.role);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(UpdatePostResponseDto)
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiOperation({ summary: 'Update a Post (authentication is required)' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @GetUser() authUser: User) {
    return this.service.update(id, updatePostDto, authUser.role);
  }

  @Patch(':id/admin/status')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(ChangeStatusPostResponseDto)
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiOperation({ summary: 'Change status of a Post' })
  changeStatus(@Param('id') id: string, @GetUser() authUser: User) {
    return this.service.changeStatus(id, authUser.role);
  }
}
