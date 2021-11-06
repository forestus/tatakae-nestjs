import { Test, TestingModule } from '@nestjs/testing';
import { CreateTorrentService } from './create-torrent.service';

describe('CreateTorrentService', () => {
  let service: CreateTorrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTorrentService],
    }).compile();

    service = module.get<CreateTorrentService>(CreateTorrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
