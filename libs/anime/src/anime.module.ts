import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';

@Module({
  providers: [AnimeService],
  exports: [AnimeService],
  controllers: [AnimeController],
})
export class AnimeModule {}
