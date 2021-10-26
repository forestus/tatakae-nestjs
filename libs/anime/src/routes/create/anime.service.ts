import { CreateAnimeDTO } from '@anime/anime/dto/create-anime.dto';
import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import { AnimeRepository } from '@anime/anime/repositories/anime.repository';
import { IAnimeRepository } from '@anime/anime/repositories/interfaces/anime-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateAnimeService {
  constructor(
    @Inject(AnimeRepository)
    private animeRepository: IAnimeRepository,
  ) {}

  async create(createAnimeDTO: CreateAnimeDTO): Promise<AnimeEntity> {
    return this.animeRepository.create(createAnimeDTO);
  }
}
