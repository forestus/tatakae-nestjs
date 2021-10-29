import { Test, TestingModule } from '@nestjs/testing';
import { CreateDescriptionService } from './create-description.service';

describe('CreateDescriptionService', () => {
  let service: CreateDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDescriptionService],
    }).compile();

    service = module.get<CreateDescriptionService>(CreateDescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
