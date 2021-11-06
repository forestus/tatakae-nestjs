import { Test, TestingModule } from '@nestjs/testing';
import { DownloadTorrentService } from './download-torrent.service';

describe('DownloadTorrentService', () => {
  let service: DownloadTorrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadTorrentService],
    }).compile();

    service = module.get<DownloadTorrentService>(DownloadTorrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
