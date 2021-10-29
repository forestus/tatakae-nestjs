import { CreateVideoDTO } from '@video/video/dto/create-video.dto';
import { UpdateVideoDTO } from '@video/video/dto/update-video.dto';
import { VideoEntity } from '@video/video/entities/video.entity';
import { DeleteResult } from 'typeorm';

export interface IVideoRepository {
  create(video: CreateVideoDTO): Promise<VideoEntity>;
  findByName(name: string): Promise<VideoEntity[]>;
  findById(id: string): Promise<VideoEntity>;
  update(video_id: string, updatePapersDTO: UpdateVideoDTO): any;
  delete(video_id: string): Promise<DeleteResult>;
}
