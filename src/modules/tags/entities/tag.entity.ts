import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostTag } from '../../post-tags/entities';
import { GeneralStatus } from '../../../common/constants';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ type: 'enum', enum: GeneralStatus, default: GeneralStatus.ACTIVE })
  status: GeneralStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PostTag, (postTag) => postTag.tag)
  postTags: PostTag[];
}
