import { CreateAnimeDTO } from '@anime/anime/dto/create-anime.dto';
import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import { BodyRequest } from '@anime/anime/swagger/request/body-request';
import { ApiOkResponseTypes } from '@anime/anime/swagger/responses/api-ok-response.swagger';
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
import { CreateAnimeService } from './create-anime.service';

@ApiTags('Anime')
@Controller()
export class CreateAnimeController {
  constructor(private createAnimeService: CreateAnimeService) {}
  @ApiOperation({ summary: 'Criação de Anime' })
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
  @Post('anime')
  create(@Body() anime: CreateAnimeDTO): Promise<AnimeEntity> {
    return this.createAnimeService.create(anime);
  }
}
