import { VideoRepository } from '@video/video/repositories/video.repository';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs';
import parseTorrent, { toMagnetURI } from 'parse-torrent';
import WebTorrent from 'webtorrent';
import path from 'path';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEncode } from '../converter/converter-video.service';

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

  create({ anime, torrent }: IDownloadVideo): void {
    // fazer verificação se anime ja foi baixado
    const torrentPath = path.resolve(`data/torrents/${anime}/${torrent}`);
    const videoPath = path.resolve('data/videos');
    // const singleTorrent = fs.readdirSync(torrentPath);
    const torrentId = toMagnetURI(parseTorrent(fs.readFileSync(torrentPath)));
    const torrentCliente = client.add(torrentId, (torrent) => {
      const files = torrent.files;
      files.map((file) => {
        const name = file.name
          .replace('[Erai-raws] ', '')
          .replace('[Multiple Subtitle]', '')
          .trim();
        // const tName = torrent.name
        //   .replace('[Erai-raws] ', '')
        //   .replace(/(-[^-]+)-?$/, '')
        //   .trim();
        const destinationPath = path
          .resolve(
            __dirname + `../../../../../../../data/videos/${anime}/${name}`,
          )
          .trim();
        console.log('started Download: ' + name);
        const source = file.createReadStream();
        const dir = `${videoPath}/${anime}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        const destination = fs.createWriteStream(destinationPath);
        source
          .on('end', async () => {
            client.remove(torrentCliente);
            console.log('Donwload Finished:\t', name);
            this.eventEmitter.emit('video-downloaded', {
              anime: anime,
              videoName: name,
            } as IEncode); // emite o evento que irá chamar o converter
            return Promise.resolve(file);
          })
          .pipe(destination);
      });
    });
    return;
  }
}
