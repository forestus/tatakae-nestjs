import { Test, TestingModule } from '@nestjs/testing';
import { ConverterVideoService } from './converter-video.service';

describe('ConverterVideoService', () => {
  let service: ConverterVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterVideoService],
    }).compile();

    service = module.get<ConverterVideoService>(ConverterVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
