import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('video')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  anime_id: string;

  @ManyToOne(() => AnimeEntity, (anime) => anime.videos)
  @JoinColumn({ name: 'anime_id' })
  anime: AnimeEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
