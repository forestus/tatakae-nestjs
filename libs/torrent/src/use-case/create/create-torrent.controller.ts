import { CreateTorrentDTO } from '@torrent/torrent/dto/create-torrent.dto';
import { BodyRequest } from '@torrent/torrent/swagger/request/body-request';
import { ApiOkResponseTypes } from '@torrent/torrent/swagger/responses/api-ok-response.swagger';
import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponseError } from '@shared/shared/swagger/not-found';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { CreateTorrentService } from './create-torrent.service';

@ApiTags('Torrent')
@Controller()
export class CreateTorrentController {
  constructor(private createTorrentService: CreateTorrentService) {}
  @ApiOperation({ summary: 'Criação de Torrent' })
  @ApiCreatedResponse({
    description: 'Criação de Regras de Submissão',
    type: ApiOkResponseTypes,
  })
  @ApiNotFoundResponse({
    description: 'Erros de não encontrado',
    type: NotFoundResponseError,
  })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @ApiBody({
    type: BodyRequest,
  })
  @Post('torrent')
  create(@Body() torrent: CreateTorrentDTO): Promise<TorrentEntity> {
    return this.createTorrentService.create(torrent);
  }
}
