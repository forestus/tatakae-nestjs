import { OmitType, PartialType } from '@nestjs/swagger';
import { VideoEntity } from '../entities/video.entity';

export class CreateVideoDTO extends PartialType(OmitType(VideoEntity, [])) {}
