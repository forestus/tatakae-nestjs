import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('descriptions')
export class DescriptionEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  episodes: string;

  @Column()
  picture: string;

  @Column()
  score: string;

  @Column()
  aired: string;

  @Column()
  status: string;

  @Column()
  genres: string;

  @Column()
  synopsys: string;

  @OneToOne(() => AnimeEntity, (anime) => anime.description)
  anime: AnimeEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
