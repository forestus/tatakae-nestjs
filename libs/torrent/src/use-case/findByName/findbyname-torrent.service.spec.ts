import { Test, TestingModule } from '@nestjs/testing';
import { FindByNameTorrentService } from './findbyname-torrent.service';

describe('FindByNameTorrentService', () => {
  let service: FindByNameTorrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByNameTorrentService],
    }).compile();

    service = module.get<FindByNameTorrentService>(FindByNameTorrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
