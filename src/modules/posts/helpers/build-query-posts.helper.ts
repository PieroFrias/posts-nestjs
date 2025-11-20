import { Repository } from 'typeorm';
import { Post } from '../entities';
import { FilterPostDto } from '../dto';
import { calculateOffset, ErrorMessage } from '../../../common/utils';

export const buildQueryPosts = async (
  repo: Repository<Post>,
  filterDto: FilterPostDto,
): Promise<[Post[], number]> => {
  const { page = 1, pageSize = 10, categoryId, searchTerm, tagIds } = filterDto;

  const offset = calculateOffset(page, pageSize);
  const categoryIdCondition = categoryId ? 'post.category.id = :categoryId' : '1=1';
  const searchTermCondition = searchTerm
    ? '(post.title LIKE :searchTerm OR post.content LIKE :searchTerm)'
    : '1=1';
  const tagIdsCondition =
    tagIds && tagIds?.length > 0
      ? 'post.id IN (SELECT pt.post_id FROM post_tags pt WHERE pt.tag_id IN (:...tagIds))'
      : '1=1';

  const [data, totalItems] = await repo
    .createQueryBuilder('post')
    .where(categoryIdCondition, { categoryId })
    .andWhere(searchTermCondition, { searchTerm: `%${searchTerm}%` })
    .andWhere(tagIdsCondition, { tagIds })
    .leftJoinAndSelect('post.tags', 'postTags')
    .leftJoinAndSelect('postTags.tag', 'tags')
    .leftJoinAndSelect('post.user', 'user')
    .leftJoinAndSelect('post.category', 'category')
    .skip(offset)
    .take(pageSize)
    .getManyAndCount();

  !totalItems && ErrorMessage.notFoundByFilter('Posts');

  return [data, totalItems];
};
