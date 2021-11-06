import { VideoRepository } from '@video/video/repositories/video.repository';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs';
import parseTorrent, { toMagnetURI } from 'parse-torrent';
import WebTorrent from 'webtorrent';
import path from 'path';
import { EventEmitter2 } from '@nestjs/event-emitter';

const client = new WebTorrent();
interface IDownloadVideo {
  anime?: string;
  torrent?: string;
}
@Injectable()
export class DownloadVideoService {
  constructor(
    @Inject(VideoRepository)
    private videoRepository: IVideoRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  create({}: IDownloadVideo): void {
    console.log('chegou aqui2');
    // /${anime}/${videoName}
    // fazer verificação se anime ja foi baixado
    // deve receber a referencia do video baixado e passar no emit para pegar no listener
    const torrentPath = path.resolve('data/torrents');
    const videoPath = path.resolve('data/videos');
    const files = fs.readdirSync(torrentPath);
    files.map((file) => {
      const torrentId = toMagnetURI(
        parseTorrent(fs.readFileSync(`${torrentPath}/${file}`)),
      );
      client.add(torrentId, (torrent) => {
        const files = torrent.files;
        files.map((file) => {
          console.log('started Download: ' + file.name);
          const source = file.createReadStream();
          const dir = `${videoPath}/${torrent.name}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          const destinationPath = `${dir}/${file.name}`;
          const destination = fs.createWriteStream(destinationPath);
          source
            .on('end', async () => {
              console.log('Donwload Finished:\t', file.name);
              this.eventEmitter.emit('video-downloaded', file); // emite o evento que irá chamar o converter
              return Promise.resolve(file);
            })
            .pipe(destination);
        });
      });
    });
    return;
  }
}
