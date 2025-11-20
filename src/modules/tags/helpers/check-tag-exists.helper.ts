import { ILike, Not, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { ErrorMessage } from '../../../common/utils';

export const checkTagExists = async (repo: Repository<Tag>, name?: string, id?: string) => {
  const where = id ? { name: ILike(name), id: Not(id) } : { name: ILike(name) };

  const tagExists = await repo.exists({ where });

  tagExists && ErrorMessage.alreadyRegistered('Tag', name);
};
