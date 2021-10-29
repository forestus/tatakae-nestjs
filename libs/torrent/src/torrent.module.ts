import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TorrentEntity } from './entities/torrent.entity';
import { TorrentRepository } from './repositories/torrent.repository';
import { CreateTorrentController } from './routes/create/create-torrent.controller';
import { CreateTorrentService } from './routes/create/create-torrent.service';
import { FindByNameTorrentController } from './routes/findByName/findbyname-torrent.controller';
import { FindByNameTorrentService } from './routes/findByName/findbyname-torrent.service';

@Module({
  imports: [TypeOrmModule.forFeature([TorrentEntity])],
  controllers: [CreateTorrentController, FindByNameTorrentController],
  providers: [
    CreateTorrentService,
    TorrentRepository,
    FindByNameTorrentService,
  ],
  exports: [CreateTorrentService, FindByNameTorrentService],
})
export class TorrentModule {}
