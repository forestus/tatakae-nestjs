import { Test, TestingModule } from '@nestjs/testing';
import { CreateAnimeService } from './anime.service';

describe('CreateAnimeService', () => {
  let service: CreateAnimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAnimeService],
    }).compile();

    service = module.get<CreateAnimeService>(CreateAnimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
