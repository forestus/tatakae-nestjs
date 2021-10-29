import { Test, TestingModule } from '@nestjs/testing';
import { CreateVideoService } from './create-video.service';

describe('CreateVideoService', () => {
  let service: CreateVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateVideoService],
    }).compile();

    service = module.get<CreateVideoService>(CreateVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
