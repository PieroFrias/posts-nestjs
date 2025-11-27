import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Tag } from './entities';
import { CreateTagDto, UpdateTagDto } from './dto';
import { checkTagExists } from './helpers';
import { ICreateResponse, IFindAllResponse, IUpdateResponse } from '../../common/interfaces';
import { ErrorMessage, SuccessMessage } from '../../common/utils';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });

    !tag && ErrorMessage.notFound('Tag', id);

    return tag;
  }

  async findOneByName(name: string): Promise<Tag | null> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    return tag || null;
  }

  async findOrCreate(tagNames: string[]): Promise<Tag[]> {
    const uniqueTags = new Set(tagNames);

    const tags = await Promise.all(
      Array.from(uniqueTags).map(async (tagName) => {
        let tag = await this.findOneByName(tagName);

        if (!tag) {
          const newTag = await this.tagRepository.save({ name: tagName });
          tag = newTag;
        }

        return tag;
      }),
    );

    return tags;
  }
}
