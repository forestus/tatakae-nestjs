import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeEntity } from './entities/anime.entity';
import { AnimeRepository } from './repositories/anime.repository';
import { CreateAnimeController } from './routes/create/create-anime.controller';
import { CreateAnimeService } from './routes/create/create-anime.service';
import { FindByNameAnimeController } from './routes/findByName/findbyname-anime.controller';
import { FindByNameAnimeService } from './routes/findByName/findbyname-anime.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimeEntity])],
  controllers: [CreateAnimeController, FindByNameAnimeController],
  providers: [CreateAnimeService, AnimeRepository, FindByNameAnimeService],
  exports: [CreateAnimeService, FindByNameAnimeService],
})
export class AnimeModule {}
