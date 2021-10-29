import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
} from 'typeorm';

@Entity('torrent')
export class TorrentEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  // @ManyToOne(() => Anime, (anime) => anime.torrents)
  // anime: Anime;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
