import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import { AnimeRepository } from '@anime/anime/repositories/anime.repository';
import { IAnimeRepository } from '@anime/anime/repositories/interfaces/anime-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByNameAnimeService {
  constructor(
    @Inject(AnimeRepository)
    private animeRepository: IAnimeRepository,
  ) {}

  async findByName(name: string): Promise<AnimeEntity[]> {
    return this.animeRepository.findByName(name);
  }
}
