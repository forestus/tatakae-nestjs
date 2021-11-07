import { VideoRepository } from '@video/video/repositories/video.repository';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { spawn } from 'handbrake-js';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { unlink } from 'fs';
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
  @OnEvent('video-downloaded')
  create({ anime, videoName, videoPath }: IEncode): void {
    let baseVideoPath;
    const output =
      videoName &&
      `./${videoName
        .replace('.mkv', '')
        .replace('[Multiple Subtitle]', '')
        .replace('[Erai-raws] ', '')}.mp4`;
    if (!videoPath) {
      baseVideoPath = path.resolve(
        __dirname + `../../../../../../../data/videos/${anime}`,
      );
    }
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
      const finalVideoPath = baseVideoPath + `/${videoName}`;
      unlink(path.resolve(finalVideoPath), (err) => {
        if (err) throw err;
        console.log(`Deleted: ${finalVideoPath}`);
      });
      // emite o evento que irá chamar o uploader
      this.eventEmitter.emit('video-converted', {
        anime,
        videoName: output,
        videoPath: finalVideoPath,
      } as IEncode);
    });
  }
}
