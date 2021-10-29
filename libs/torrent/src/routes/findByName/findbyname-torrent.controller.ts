import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { FindByNameTorrentService } from './findbyname-torrent.service';

@ApiTags('Torrent')
@Controller()
export class FindByNameTorrentController {
  constructor(private findByNameTorrentService: FindByNameTorrentService) {}
  @ApiOperation({ summary: 'Criação de Torrent' })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @Get('torrent/:name')
  create(
    @Param('name')
    name: string,
  ): Promise<TorrentEntity[]> {
    return this.findByNameTorrentService.findByName(name);
  }
}
