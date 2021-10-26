import { CreateAnimeDTO } from '@anime/anime/dto/create-anime.dto';
import { AnimeEntity } from '@anime/anime/entities/anime.entity';
import { DeleteResult } from 'typeorm';

export interface IAnimeRepository {
  create(createAnimeDTO: CreateAnimeDTO): Promise<AnimeEntity>;
  findByName(name: string): Promise<AnimeEntity[]>;
  findById(id: string): Promise<AnimeEntity>;
  update(anime_id: string, updatePapersDTO: CreateAnimeDTO): any;
  delete(anime_id: string): Promise<DeleteResult>;
}
