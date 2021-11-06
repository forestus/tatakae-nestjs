import { VideoRepository } from '@video/video/repositories/video.repository';
import { VideoEntity } from '@video/video/entities/video.entity';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindByNameVideoService {
  constructor(
    @Inject(VideoRepository)
    private videoRepository: IVideoRepository,
  ) {}

  async findByName(name: string): Promise<VideoEntity[]> {
    return this.videoRepository.findByName(name);
  }
}
