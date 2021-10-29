import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DescriptionEntity } from '../entities/description.entity';
import { UpdateDescriptionDTO } from '../dto/update-description.dto';
import { CreateDescriptionDTO } from '../dto/create-description.dto';
import { IDescriptionRepository } from './interfaces/description-repository.interface';
@Injectable()
export class DescriptionRepository implements IDescriptionRepository {
  constructor(
    @InjectRepository(DescriptionEntity)
    private descriptionRepository: Repository<DescriptionEntity>,
  ) {}

  async create(description: CreateDescriptionDTO): Promise<DescriptionEntity> {
    return this.descriptionRepository.save(
      this.descriptionRepository.create(description),
    );
  }

  async findByName(name: string): Promise<DescriptionEntity[]> {
    return this.descriptionRepository.find({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<DescriptionEntity> {
    return this.descriptionRepository.findOne(id);
  }

  async update(
    description_id: string,
    description: UpdateDescriptionDTO,
  ): Promise<UpdateResult> {
    return this.descriptionRepository.update(
      description_id,
      this.descriptionRepository.create(description),
    );
  }

  async delete(description_id: string): Promise<DeleteResult> {
    return this.descriptionRepository.delete(description_id);
  }
}
