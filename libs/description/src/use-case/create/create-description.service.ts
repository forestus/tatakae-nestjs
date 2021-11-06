import { CreateDescriptionDTO } from '@description/description/dto/create-description.dto';
import { DescriptionEntity } from '@description/description/entities/description.entity';
import { DescriptionRepository } from '@description/description/repositories/description.repository';
import { IDescriptionRepository } from '@description/description/repositories/interfaces/description-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateDescriptionService {
  constructor(
    @Inject(DescriptionRepository)
    private descriptionRepository: IDescriptionRepository,
  ) {}

  async create(description: CreateDescriptionDTO): Promise<DescriptionEntity> {
    return this.descriptionRepository.create(description);
  }
}
