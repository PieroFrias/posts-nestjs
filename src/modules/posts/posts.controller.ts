import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from './dto';
import { User } from '../users/entities';
import { PostsService } from './posts.service';
import { Auth, GetUser } from '../auth/decorator';
import { Role } from 'src/common/constants';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Returns all published Posts with optional filters' })
  findAllPublisheds(@Query() filterDto: FilterPostDto) {
    return this.service.findAll(filterDto);
  }

  @Get('admin')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @ApiOperation({ summary: 'Returns all Posts with pagination (authentication is required)' })
  findAll(@Query() filterDto: FilterPostDto, @GetUser() authUser: User) {
    return this.service.findAll(filterDto, authUser.role);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiOperation({ summary: 'Returns details of a published Post by ID' })
  findOnePublished(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/admin')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiOperation({ summary: 'Returns details of a Post by ID' })
  findOne(@Param('id') id: string, @GetUser() authUser: User) {
    return this.service.findOne(id, authUser.role);
  }

  @Post()
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @ApiOperation({ summary: 'Create a new Post' })
  create(@Body() createDto: CreatePostDto, @GetUser() authUser: User) {
    return this.service.create(createDto, authUser.id);
  }

  @Auth(Role.PUBLISHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a Post (authentication is required)' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @GetUser() authUser: User) {
    return this.service.update(id, updatePostDto, authUser.role);
  }

  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @ApiOperation({ summary: 'Change status of a Post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @Patch(':id/admin/status')
  changeStatus(@Param('id') id: string, @GetUser() authUser: User) {
    return this.service.changeStatus(id, authUser.role);
  }
}
