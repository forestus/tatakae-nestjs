import { VideoRepository } from '@video/video/repositories/video.repository';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { spawn } from 'handbrake-js';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { rename } from 'fs';
export interface IEncode {
  videoPath?: string;
  anime?: string;
  videoName?: string;
}
@Injectable()
export class ConverterVideoService {
  constructor(
    @Inject(VideoRepository)
    private videoRepository: IVideoRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  create({ anime, videoName, videoPath }: IEncode): void {
    // converter para ./ e depois mover para path final no /anime
    anime =
      '[Erai-raws] 100-man no Inochi no Ue ni Ore wa Tatte Iru - 11 [720p][Multiple Subtitle].mkv';
    videoName =
      '[Erai-raws] 100-man no Inochi no Ue ni Ore wa Tatte Iru - 11 [720p][Multiple Subtitle].mkv';
    let baseVideoPath;
    const output =
      videoName &&
      `./${videoName
        .replace('.mkv', '')
        .replace('[Multiple Subtitle]', '')
        .replace('[Erai-raws] ', '')}.mp4`;
    if (!videoPath) {
      baseVideoPath = path.resolve(
        __dirname + `../../../../../../../data/videos/${anime}/${videoName}`,
      );
    }
    console.log(videoName);
    console.log(output);
    const encode = spawn({
      input: videoPath || baseVideoPath,
      output: `./data/videos/${anime}/${output}`,
      encoder: 'x264',
      width: 1280,
      height: 720,
      'pixel-aspect': '1:1',
      'subtitle-lang-list': 'por',
      'first-subtitle': true,
      'subtitle-burned': 1,
    });
    encode.on('error', (err) => {
      console.log('Invalid Video Input/No Video Founded', err);
    });
    encode.on('start', () => {
      console.log('Started Encoding Subtitle!');
    });
    encode.on('progress', (progress) => {
      console.log(
        'Percent complete: %s, ETA: %s',
        progress.percentComplete,
        progress.eta,
      );
    });
    encode.on('end', async () => {
      console.log('Encoding Completed!');
      // rename(
      //   output,
      //   path.join(__dirname + `../../../data/videos/${anime}/${output}`),
      //   (err) => {
      //     if (err) throw err;
      //     console.log('Rename complete!');
      //   },
      // );
      this.eventEmitter.emit('video-converted', {
        anime,
        videoName,
        videoPath,
      }); // emite o evento que irá chamar o uploader
    });
  }
}
