import { Module } from '@nestjs/common';
import { TorrentService } from './torrent.service';

@Module({
  providers: [TorrentService],
  exports: [TorrentService],
})
export class TorrentModule {}
