import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoEntity } from '../entities/video.entity';
import { UpdateVideoDTO } from '../dto/update-video.dto';
import { CreateVideoDTO } from '../dto/create-video.dto';
import { IVideoRepository } from './interfaces/video-repository.interface';
@Injectable()
export class VideoRepository implements IVideoRepository {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async create(video: CreateVideoDTO): Promise<VideoEntity> {
    return this.videoRepository.save(this.videoRepository.create(video));
  }

  async findByName(name: string): Promise<VideoEntity[]> {
    return this.videoRepository.find({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<VideoEntity> {
    return this.videoRepository.findOne(id);
  }

  async update(video_id: string, video: UpdateVideoDTO): Promise<UpdateResult> {
    return this.videoRepository.update(
      video_id,
      this.videoRepository.create(video),
    );
  }

  async delete(video_id: string): Promise<DeleteResult> {
    return this.videoRepository.delete(video_id);
  }
}
