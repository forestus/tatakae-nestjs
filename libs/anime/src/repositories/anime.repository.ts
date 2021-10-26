import { DeleteResult, Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAnimeDTO } from '../dto/create-anime.dto';
import { AnimeEntity } from '../entities/anime.entity';
import { IAnimeRepository } from './interfaces/anime-repository.interface';
@Injectable()
export class AnimeRepository implements IAnimeRepository {
  constructor(
    @InjectRepository(AnimeEntity)
    private animeRepository: Repository<AnimeEntity>,
  ) {}

  async create(createAnimeDTO: CreateAnimeDTO): Promise<AnimeEntity> {
    try {
      const anime = this.animeRepository.create(createAnimeDTO);
      return this.animeRepository.save(anime);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findByName(name: string): Promise<AnimeEntity[]> {
    return this.animeRepository.find({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<AnimeEntity> {
    return this.animeRepository.findOne(id);
  }

  async update(
    anime_id: string,
    updatePapersDTO: CreateAnimeDTO,
  ): Promise<void> {
    const anime = this.animeRepository.create(updatePapersDTO);

    try {
      await this.animeRepository.update(anime_id, anime);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async delete(anime_id: string): Promise<DeleteResult> {
    return this.animeRepository.delete(anime_id);
  }
}
