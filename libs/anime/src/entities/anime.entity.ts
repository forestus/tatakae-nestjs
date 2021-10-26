import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  // @OneToMany(() => Torrent, (torrent) => torrent.anime)
  // torrents: Torrent[];

  // @OneToMany(() => Video, (video) => video.anime)
  // videos: Video[];

  // @OneToOne(() => Description)
  // @JoinColumn()
  // description: Description;
}
