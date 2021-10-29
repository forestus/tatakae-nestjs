import { CreateVideoDTO } from '@video/video/dto/create-video.dto';
import { VideoEntity } from '@video/video/entities/video.entity';
import { VideoRepository } from '@video/video/repositories/video.repository';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateVideoService {
  constructor(
    @Inject(VideoRepository)
    private videoRepository: IVideoRepository,
  ) {}

  async create(video: CreateVideoDTO): Promise<VideoEntity> {
    return this.videoRepository.create(video);
  }
}
