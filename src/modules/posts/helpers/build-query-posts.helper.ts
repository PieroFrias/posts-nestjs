import { Repository } from 'typeorm';
import { Post } from '../entities';
import { FilterPostDto } from '../dto';
import { PostStatus, Role } from '../../../common/constants';
import { calculateOffset, ErrorMessage, getStatusCondition } from '../../../common/utils';

export const buildQueryPosts = async (
  repo: Repository<Post>,
  filterDto: FilterPostDto,
  role?: Role,
): Promise<[Post[], number]> => {
  const { page = 1, pageSize = 10, categoryId, searchTerm, tagIds, status } = filterDto;

  const offset = calculateOffset(page, pageSize);
  const statusCondition = getStatusCondition(status, role, PostStatus, 'Posts');
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
    .where(statusCondition, { status })
    .andWhere(tagIdsCondition, { tagIds })
    .andWhere(categoryIdCondition, { categoryId })
    .andWhere(searchTermCondition, { searchTerm: `%${searchTerm}%` })
    .leftJoinAndSelect('post.postTags', 'postTags')
    .leftJoinAndSelect('postTags.tag', 'tags')
    .leftJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.category', 'category')
    .orderBy('post.createdAt', 'DESC')
    .skip(offset)
    .take(pageSize)
    .getManyAndCount();

  !totalItems && ErrorMessage.notFoundByFilter('Posts');

  return [data, totalItems];
};
