import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideoRepository } from './repositories/video.repository';
import { ConverterVideoController } from './use-case/converter/converter-video.controller';
import { ConverterVideoService } from './use-case/converter/converter-video.service';
import { CreateVideoController } from './use-case/create/create-video.controller';
import { CreateVideoService } from './use-case/create/create-video.service';
import { DownloadVideoController } from './use-case/download/download-video.controller';
import { DownloadVideoService } from './use-case/download/download-video.service';
import { FindByNameVideoController } from './use-case/findByName/findbyname-video.controller';
import { FindByNameVideoService } from './use-case/findByName/findbyname-video.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [
    CreateVideoController,
    FindByNameVideoController,
    DownloadVideoController,
    ConverterVideoController,
  ],
  providers: [
    CreateVideoService,
    VideoRepository,
    FindByNameVideoService,
    DownloadVideoService,
    ConverterVideoService,
  ],
  exports: [CreateVideoService, FindByNameVideoService],
})
export class VideoModule {}
