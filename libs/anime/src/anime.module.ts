import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeEntity } from './entities/anime.entity';
import { AnimeRepository } from './repositories/anime.repository';
import { CreateAnimeController } from './routes/create/anime.controller';
import { CreateAnimeService } from './routes/create/anime.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimeEntity])],
  controllers: [CreateAnimeController],
  providers: [CreateAnimeService, AnimeRepository],
  exports: [CreateAnimeService],
})
export class AnimeModule {}
