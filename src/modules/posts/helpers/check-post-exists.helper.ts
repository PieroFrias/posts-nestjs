import { ILike, Not, Repository } from 'typeorm';
import { Post } from '../entities';
import { ErrorMessage } from '../../../common/utils';

export const checkPostExists = async (repo: Repository<Post>, title: string, id?: string) => {
  if (!title && id) return;

  const where = id ? { title: ILike(title), id: Not(id) } : { title: ILike(title) };

  const postExists = await repo.exists({ where });

  postExists && ErrorMessage.alreadyRegistered('Post', title);
};
