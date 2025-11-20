import { Repository } from 'typeorm';
import { Category } from '../entities';
import { FilterCategoryDto } from '../dto';
import { calculateOffset, ErrorMessage } from '../../../common/utils';

export const buildQueryCategories = async (
  repository: Repository<Category>,
  filterCategoryDto: FilterCategoryDto,
): Promise<[Category[], number]> => {
  const { page = 1, pageSize = 10, name } = filterCategoryDto;

  const offset = calculateOffset(page, pageSize);
  const nameCondition = name ? '(category.name ILIKE :name)' : '1=1';

  const [data, totalItems] = await repository
    .createQueryBuilder('category')
    .where(nameCondition, { name: `%${name}%` })
    .orderBy('category.createdAt', 'DESC')
    .skip(offset)
    .take(pageSize)
    .getManyAndCount();

  !totalItems && ErrorMessage.notFoundByFilter('Categories');

  return [data, totalItems];
};
