import { Test, TestingModule } from '@nestjs/testing';
import { FindByNameDescriptionService } from '../findByName/findbyname-description.service';

describe('FindByNameDescriptionService', () => {
  let service: FindByNameDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByNameDescriptionService],
    }).compile();

    service = module.get<FindByNameDescriptionService>(
      FindByNameDescriptionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
