import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TorrentEntity } from '../entities/torrent.entity';
import { UpdateTorrentDTO } from '../dto/update-torrent.dto';
import { CreateTorrentDTO } from '../dto/create-torrent.dto';
import { ITorrentRepository } from './interfaces/torrent-repository.interface';
@Injectable()
export class TorrentRepository implements ITorrentRepository {
  constructor(
    @InjectRepository(TorrentEntity)
    private torrentRepository: Repository<TorrentEntity>,
  ) {}

  async create(torrent: CreateTorrentDTO): Promise<TorrentEntity> {
    return this.torrentRepository.save(this.torrentRepository.create(torrent));
  }

  async findByName(name: string): Promise<TorrentEntity[]> {
    return this.torrentRepository.find({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<TorrentEntity> {
    return this.torrentRepository.findOne(id);
  }

  async update(
    torrent_id: string,
    torrent: UpdateTorrentDTO,
  ): Promise<UpdateResult> {
    return this.torrentRepository.update(
      torrent_id,
      this.torrentRepository.create(torrent),
    );
  }

  async delete(torrent_id: string): Promise<DeleteResult> {
    return this.torrentRepository.delete(torrent_id);
  }
}
