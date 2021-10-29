import { Test, TestingModule } from '@nestjs/testing';
import { FindByNameAnimeService } from './findbyname-anime.service';

describe('FindByNameAnimeService', () => {
  let service: FindByNameAnimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByNameAnimeService],
    }).compile();

    service = module.get<FindByNameAnimeService>(FindByNameAnimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
