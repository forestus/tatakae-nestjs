import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { IsString } from 'class-validator';
import { DownloadTorrentService } from './download-torrent.service';

class BodyParams {
  @IsString()
  anime: string;
  @IsString()
  torrentName: string;
  @IsString()
  link: string;
}
@ApiTags('Torrent')
@Controller()
export class DownloadTorrentController {
  constructor(private downloadTorrentService: DownloadTorrentService) {}
  @ApiOperation({ summary: 'Criação de Description' })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @Post('torrents/download/')
  download(@Body() { anime, torrentName, link }: BodyParams): Promise<any> {
    return this.downloadTorrentService.downloadTorrent(
      anime,
      torrentName,
      link,
    );
  }
}
