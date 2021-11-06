import { CreateTorrentDTO } from '@torrent/torrent/dto/create-torrent.dto';
import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { TorrentRepository } from '@torrent/torrent/repositories/torrent.repository';
import { ITorrentRepository } from '@torrent/torrent/repositories/interfaces/torrent-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateTorrentService {
  constructor(
    @Inject(TorrentRepository)
    private torrentRepository: ITorrentRepository,
  ) {}

  async create(torrent: CreateTorrentDTO): Promise<TorrentEntity> {
    return this.torrentRepository.create(torrent);
  }
}
