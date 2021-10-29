import { DescriptionEntity } from '@description/description/entities/description.entity';
import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { VideoEntity } from '@video/video/entities/video.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('anime')
export class AnimeEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TorrentEntity, (torrent) => torrent.anime)
  torrents: TorrentEntity[];

  @OneToMany(() => VideoEntity, (video) => video.anime)
  videos: VideoEntity[];

  @OneToOne(() => DescriptionEntity)
  @JoinColumn()
  description: DescriptionEntity;
}
