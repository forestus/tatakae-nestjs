import { DescriptionRepository } from '@description/description/repositories/description.repository';
import { DescriptionEntity } from '@description/description/entities/description.entity';
import { IDescriptionRepository } from '@description/description/repositories/interfaces/description-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByNameDescriptionService {
  constructor(
    @Inject(DescriptionRepository)
    private descriptionRepository: IDescriptionRepository,
  ) {}

  async findByName(name: string): Promise<DescriptionEntity[]> {
    return this.descriptionRepository.findByName(name);
  }
}
