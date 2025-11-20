import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Tag } from '../../tags/entities';
import { Post } from '../../posts/entities';

@Entity('post_tags')
export class PostTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.postTags)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Tag, (tag) => tag.postTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
