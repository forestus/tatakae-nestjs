import { CreateTorrentDTO } from '@torrent/torrent/dto/create-torrent.dto';
import { UpdateTorrentDTO } from '@torrent/torrent/dto/update-torrent.dto';
import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { DeleteResult } from 'typeorm';

export interface ITorrentRepository {
  create(torrent: CreateTorrentDTO): Promise<TorrentEntity>;
  findByName(name: string): Promise<TorrentEntity[]>;
  findById(id: string): Promise<TorrentEntity>;
  update(torrent_id: string, updatePapersDTO: UpdateTorrentDTO): any;
  delete(torrent_id: string): Promise<DeleteResult>;
}
