import { Repository } from 'typeorm';
import { Comment } from '../entities';
import { FilterCommentDto } from '../dto';
import { calculateOffset, ErrorMessage } from '../../../common/utils';

export const buildQueryComments = async (
  repo: Repository<Comment>,
  filterDto: FilterCommentDto,
): Promise<[Comment[], number]> => {
  const { page = 1, pageSize = 10, authorId, postId, searchTerm } = filterDto;

  const offset = calculateOffset(page, pageSize);
  const postIdCondition = postId ? 'comment.post.id = :postId' : '1=1';
  const authorIdCondition = authorId ? 'comment.author.id = :authorId' : '1=1';
  const searchTermCondition = searchTerm
    ? '(comment.title LIKE :searchTerm OR comment.content LIKE :searchTerm)'
    : '1=1';

  const [data, totalItems] = await repo
    .createQueryBuilder('comment')
    .where(authorIdCondition, { authorId })
    .andWhere(postIdCondition, { postId })
    .andWhere(searchTermCondition, { searchTerm: `%${searchTerm}%` })
    .leftJoinAndSelect('comment.author', 'author')
    .leftJoin('comment.post', 'post')
    .addSelect(['post.id', 'post.title', 'post.status', 'post.createdAt', 'post.updatedAt'])
    .orderBy('comment.createdAt', 'DESC')
    .skip(offset)
    .take(pageSize)
    .getManyAndCount();

  !totalItems && ErrorMessage.notFoundByFilter('Comments');

  return [data, totalItems];
};
