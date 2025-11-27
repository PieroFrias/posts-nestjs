import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  CreateCommentDto,
  CreateCommentResponseDto,
  FilterCommentDto,
  FindOneCommentResponseDto,
  UpdateCommentDto,
  UpdateCommentResponseDto,
} from './dto';
import { User } from '../users/entities';
import { Auth, GetUser } from '../auth/decorator';
import { Role } from '../../common/constants';
import { Serialize } from '../../common/decorators';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(CreateCommentResponseDto)
  @ApiOperation({ summary: 'Create a new comment' })
  create(@Body() createDto: CreateCommentDto, @GetUser() authUser: User) {
    return this.service.create(createDto, authUser.id);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all comments with optional filters' })
  findAll(@Query() filterDto: FilterCommentDto) {
    return this.service.findAll(filterDto);
  }

  @Get(':id')
  @Serialize(FindOneCommentResponseDto)
  @ApiParam({ name: 'id', description: 'Comment ID' })
  @ApiOperation({ summary: 'Returns details of a Comment by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @Serialize(UpdateCommentResponseDto)
  @ApiOperation({ summary: 'Update a comment' })
  update(@Param('id') id: string, @Body() updateDto: UpdateCommentDto, @GetUser() authUser: User) {
    return this.service.update(id, updateDto, authUser.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth(Role.PUBLISHER)
  @ApiOperation({ summary: 'Delete a comment' })
  remove(@Param('id') id: string, @GetUser() authUser: User) {
    return this.service.remove(id, authUser);
  }
}
