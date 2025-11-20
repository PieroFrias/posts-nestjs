import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from './dto';
import { User } from '../users/entities';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  // @ApiOperation({
  //   summary: 'Returns all published Posts with pagination',
  //   description: `\n
  //         No authentication is required to access this endpoint.
  //   `,
  // })
  // @Get()
  // findAllPublisheds(@Query() filterPostDto: FilterPostDto) {
  //   return this.service.findAll(filterPostDto);
  // }

  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'Returns all Posts with pagination (authentication is required)',
  //   description: `\n
  //         - If the authenticated user is ADMIN, the response includes all Posts.
  //         - If the authenticated user is CONTENT_MANAGER or EDITOR, the response includes only Posts whose status is not DELETED.
  //         - If the authenticated user is BASIC, the response includes only PUBLISHED Posts.
  //   `,
  // })
  // @Get('admin')
  // @Auth(Role.CONTENT_MANAGER, Role.EDITOR, Role.BASIC)
  // findAll(@Query() filterPostDto: FilterPostDto, @GetUser() authUser: User) {
  //   return this.service.findAll(filterPostDto, authUser.role);
  // }

  // @ApiOperation({
  //   summary: 'Returns details of a published Post by ID',
  //   description: `\n
  //         No authentication is required to access this endpoint.
  //   `,
  // })
  // @ApiParam({ name: 'id', description: 'ID of the Post' })
  // @Get(':id')
  // findOnePublished(@Param('id') id: number) {
  //   return this.service.findOneWithFormat(id);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Returns details of a Post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Post' })
  create(@Body() createDto: CreatePostDto) {
    return this.service.create(createDto);
  }

  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'Update a Post (authentication is required)',
  //   description: `\n
  //         This endpoint is only accessible to ADMIN, CONTENT_MANAGER and EDITOR.
  //   `,
  // })
  // @ApiParam({ name: 'id', description: 'ID of the Post' })
  // @Patch(':id')
  // @Auth(Role.CONTENT_MANAGER, Role.EDITOR)
  // update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @GetUser() authUser: User) {
  //   return this.service.update(id, updatePostDto, authUser.role, authUser.id);
  // }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change status of a Post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @Patch(':id/status')
  changeStatus(@Param('id') id: string) {
    return this.service.changeStatus(id);
  }
}
