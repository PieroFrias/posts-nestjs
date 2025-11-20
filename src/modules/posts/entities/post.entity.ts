import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities';
import { Comment } from '../../comments/entities';
import { PostTag } from '../../post-tags/entities';
import { Category } from '../../categories/entities';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', name: 'is_published', default: false })
  isPublished: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostTag, (postTag) => postTag.post)
  postTags: PostTag[];
}
