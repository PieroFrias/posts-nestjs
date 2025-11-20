import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from './dto';
import { checkCategoryExists, buildQueryCategories } from './helpers';
import {
  ChangeStatusResponse,
  CreateResponse,
  FindAllResponse,
  UpdateResponse,
} from '../../common/interfaces';
import { ErrorMessage, SuccessMessage } from '../../common/utils';
import { GeneralStatus } from 'src/common/constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  async create(createDto: CreateCategoryDto): Promise<CreateResponse<Category>> {
    const { name } = createDto;

    await checkCategoryExists(this.repo, name);

    let newCategory = this.repo.create(createDto);
    newCategory = await this.repo.save(newCategory);

    return {
      data: newCategory,
      message: SuccessMessage.created('Category', name),
    };
  }

  async findAll(filterDto: FilterCategoryDto): Promise<FindAllResponse<Category>> {
    const { page = 1, pageSize = 10 } = filterDto;

    const [data, totalItems] = await buildQueryCategories(this.repo, filterDto);

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.repo.findOne({ where: { id } });

    !category && ErrorMessage.notFound('Category', id);

    return category;
  }

  async update(id: string, updatedDto: UpdateCategoryDto): Promise<UpdateResponse<Category>> {
    const { name } = updatedDto;
    const category = await this.findOne(id);

    await checkCategoryExists(this.repo, name, id);

    let updatedCategory = this.repo.merge(category, updatedDto);
    updatedCategory = await this.repo.save(updatedCategory);

    return {
      data: updatedCategory,
      message: SuccessMessage.updated('Category', id),
    };
  }

  async changeStatus(id: string): Promise<ChangeStatusResponse<Category>> {
    const category = await this.findOne(id);

    const currentStatus = category.status;
    const isActive = currentStatus === GeneralStatus.ACTIVE;

    category.status = isActive ? GeneralStatus.INACTIVE : GeneralStatus.ACTIVE;
    await this.repo.save(category);

    const newStatus = category.status;

    return {
      data: category,
      message: SuccessMessage.statusChanged('Staff Category', id, newStatus),
    };
  }
}
