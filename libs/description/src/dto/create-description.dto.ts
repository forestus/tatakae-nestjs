import { OmitType, PartialType } from '@nestjs/swagger';
import { DescriptionEntity } from '../entities/description.entity';

export class CreateDescriptionDTO extends PartialType(
  OmitType(DescriptionEntity, []),
) {}
