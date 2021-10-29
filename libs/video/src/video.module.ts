import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideoRepository } from './repositories/video.repository';
import { CreateVideoController } from './routes/create/create-video.controller';
import { CreateVideoService } from './routes/create/create-video.service';
import { FindByNameVideoController } from './routes/findByName/findbyname-video.controller';
import { FindByNameVideoService } from './routes/findByName/findbyname-video.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [CreateVideoController, FindByNameVideoController],
  providers: [CreateVideoService, VideoRepository, FindByNameVideoService],
  exports: [CreateVideoService, FindByNameVideoService],
})
export class VideoModule {}
