import { OmitType, PartialType } from '@nestjs/swagger';
import { AnimeEntity } from '../entities/anime.entity';

export class CreateAnimeDTO extends PartialType(OmitType(AnimeEntity, [])) {}
