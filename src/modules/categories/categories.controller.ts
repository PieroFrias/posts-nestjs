import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Category' })
  create(@Body() createDto: CreateCategoryDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all active Categories with optional filters' })
  findAllActives(@Query() filterDto: FilterCategoryDto) {
    return this.service.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
    return this.service.update(id, updateDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change status of a Category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  changeStatus(@Param('id') id: string) {
    return this.service.changeStatus(id);
  }
}
