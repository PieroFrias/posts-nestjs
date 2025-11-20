import { ILike, Not, Repository } from 'typeorm';
import { Category } from '../entities';
import { ErrorMessage } from '../../../common/utils';

export const checkCategoryExists = async (
  repo: Repository<Category>,
  name: string,
  id?: string,
) => {
  if (!name && id) return;

  const where = id ? { name: ILike(name), id: Not(id) } : { name: ILike(name) };

  const categoryExists = await repo.exists({ where });

  categoryExists && ErrorMessage.alreadyRegistered('Category', name);
};
