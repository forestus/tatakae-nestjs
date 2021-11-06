import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentEntity } from './entities/torrent.entity';
import { TorrentRepository } from './repositories/torrent.repository';
import { CreateTorrentController } from './use-case/create/create-torrent.controller';
import { CreateTorrentService } from './use-case/create/create-torrent.service';
import { DownloadTorrentController } from './use-case/download-torrent/download-torrent.controller';
import { DownloadTorrentService } from './use-case/download-torrent/download-torrent.service';
import { FindByNameTorrentController } from './use-case/findByName/findbyname-torrent.controller';
import { FindByNameTorrentService } from './use-case/findByName/findbyname-torrent.service';

@Module({
  imports: [TypeOrmModule.forFeature([TorrentEntity])],
  controllers: [
    CreateTorrentController,
    FindByNameTorrentController,
    DownloadTorrentController,
  ],
  providers: [
    CreateTorrentService,
    TorrentRepository,
    FindByNameTorrentService,
    DownloadTorrentService,
  ],
  exports: [CreateTorrentService, FindByNameTorrentService],
})
export class TorrentModule {}
