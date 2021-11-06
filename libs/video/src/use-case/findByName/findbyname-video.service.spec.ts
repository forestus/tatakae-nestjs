import { Test, TestingModule } from '@nestjs/testing';
import { FindByNameVideoService } from './findbyname-video.service';

describe('FindByNameVideoService', () => {
  let service: FindByNameVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByNameVideoService],
    }).compile();

    service = module.get<FindByNameVideoService>(FindByNameVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
