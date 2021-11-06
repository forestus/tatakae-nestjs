import { CreateVideoDTO } from '@video/video/dto/create-video.dto';
import { VideoEntity } from '@video/video/entities/video.entity';
import { VideoRepository } from '@video/video/repositories/video.repository';
import { IVideoRepository } from '@video/video/repositories/interfaces/video-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateVideoService {
  constructor(
    @Inject(VideoRepository)
    private videoRepository: IVideoRepository,
  ) {}

  async create(video: CreateVideoDTO): Promise<VideoEntity> {
    //     const request = require('request');
    // let upload = await Video.Uploads.create({
    //   new_asset_settings: { playback_policy: 'public' },
    // });

    // // The URL you get back from the upload API is resumable, and the file can be uploaded using a `PUT` request (or a series of them).
    // await fs.createReadStream('/path/to/your/file').pipe(request.put(upload.url));

    // // The upload may not be updated immediately, but shortly after the upload is finished you'll get a `video.asset.created` event and the upload will now have a status of `asset_created` and a new `asset_id` key.
    // let updatedUpload = await Video.Uploads.get(upload.id);

    // // Or you could decide to go get additional information about that new asset you created.
    // let asset = await Video.Assets.get(updatedUpload['asset_id']);
    return this.videoRepository.create(video);
  }
}
