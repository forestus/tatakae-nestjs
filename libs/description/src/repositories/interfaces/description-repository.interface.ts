import { CreateDescriptionDTO } from '@description/description/dto/create-description.dto';
import { UpdateDescriptionDTO } from '@description/description/dto/update-description.dto';
import { DescriptionEntity } from '@description/description/entities/description.entity';
import { DeleteResult } from 'typeorm';

export interface IDescriptionRepository {
  create(description: CreateDescriptionDTO): Promise<DescriptionEntity>;
  findByName(name: string): Promise<DescriptionEntity[]>;
  findById(id: string): Promise<DescriptionEntity>;
  update(description_id: string, updatePapersDTO: UpdateDescriptionDTO): any;
  delete(description_id: string): Promise<DeleteResult>;
}
