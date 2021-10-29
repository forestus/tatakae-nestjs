import { OmitType, PartialType } from '@nestjs/swagger';
import { TorrentEntity } from '../entities/torrent.entity';

export class CreateTorrentDTO extends PartialType(
  OmitType(TorrentEntity, []),
) {}
