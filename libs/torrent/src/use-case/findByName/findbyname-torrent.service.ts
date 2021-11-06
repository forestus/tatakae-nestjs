import { TorrentRepository } from '@torrent/torrent/repositories/torrent.repository';
import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { ITorrentRepository } from '@torrent/torrent/repositories/interfaces/torrent-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByNameTorrentService {
  constructor(
    @Inject(TorrentRepository)
    private torrentRepository: ITorrentRepository,
  ) {}

  async findByName(name: string): Promise<TorrentEntity[]> {
    return this.torrentRepository.findByName(name);
  }
}
