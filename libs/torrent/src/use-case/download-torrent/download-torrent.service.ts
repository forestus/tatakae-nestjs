import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import fs from 'fs';
import https from 'https';
import path from 'path';

@Injectable()
export class DownloadTorrentService {
  constructor(private eventEmitter: EventEmitter2) {}
  async downloadTorrent(
    anime: string,
    torrentName: string,
    link: string,
  ): Promise<any> {
    link = 'testeName';
    console.log(
      path.join(__dirname + '../../../data/torrents/torrent.torrent'),
    );
    console.log(path.resolve('data/torrents/torrent.torrent'));

    let dest = __dirname + `/data/Torrents/${anime}/${torrentName}`;
    let dir = __dirname + `/data/Torrents/${anime}/`;
    dest = path.resolve('data/torrents/torrent.torrent');
    dir = path.resolve('data/torrents');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const torrentExists = fs.existsSync(dest);
    if (!torrentExists) {
      const file = fs.createWriteStream(dest, { flags: 'wx' });
      const request = https.get(link, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file, { end: true });
        } else {
          file.close();
          fs.unlink(dest, (err) => {
            err && console.error('1#' + err.message);
          });
          console.error(
            `Server responded with ${response.statusCode}: ${response.statusMessage}`,
          );
        }
      });

      request.on('error', (err) => {
        file.close();
        fs.unlink(dest, (err) => {
          err && console.error('2#' + err.message);
        });
        console.error('3#' + err.message);
      });

      file.on('error', (err) => {
        file.close();
        fs.unlink(dest, (err) => {
          err && console.error('4#' + err.message);
        });
        console.error('5#' + err.message);
      });

      file.on('finish', async () => {
        console.log(`Torrent ${torrentName} Download Torrent Finished!`);
        this.eventEmitter.emit('torrent-completed', { anime, torrentName }); // chamar o listener passando
      });
      file.on('end', () => {
        console.log('completed');
      });
    } else {
      console.log('File already exists');
    }
  }
}
