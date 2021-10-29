import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { FindByNameAnimeService } from './findbyname-anime.service';

@ApiTags('Anime')
@Controller()
export class FindByNameAnimeController {
  constructor(private findByNameAnimeService: FindByNameAnimeService) {}
  @ApiOperation({ summary: 'Criação de Anime' })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @Get('anime/:name')
  create(
    @Param('name')
    name: string,
  ): Promise<AnimeEntity[]> {
    return this.findByNameAnimeService.findByName(name);
  }
}
