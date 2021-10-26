import { CreateAnimeDTO } from '@anime/anime/dto/create-anime.dto';
import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnimeService } from './anime.service';

@Controller('anime')
export class CreateAnimeController {
  constructor(private createAnimeService: CreateAnimeService) {}
  @Post()
  findAll(@Body() anime: CreateAnimeDTO): Promise<AnimeEntity> {
    return this.createAnimeService.create(anime);
  }
}
