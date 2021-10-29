import { CreateVideoDTO } from '@video/video/dto/create-video.dto';
import { BodyRequest } from '@video/video/swagger/request/body-request';
import { ApiOkResponseTypes } from '@video/video/swagger/responses/api-ok-response.swagger';
import { VideoEntity } from '@video/video/entities/video.entity';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponseError } from '@shared/shared/swagger/not-found';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { CreateVideoService } from './create-video.service';

@ApiTags('Video')
@Controller()
export class CreateVideoController {
  constructor(private createVideoService: CreateVideoService) {}
  @ApiOperation({ summary: 'Criação de Video' })
  @ApiCreatedResponse({
    description: 'Criação de Regras de Submissão',
    type: ApiOkResponseTypes,
  })
  @ApiNotFoundResponse({
    description: 'Erros de não encontrado',
    type: NotFoundResponseError,
  })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @ApiBody({
    type: BodyRequest,
  })
  @Post('video')
  create(@Body() video: CreateVideoDTO): Promise<VideoEntity> {
    return this.createVideoService.create(video);
  }
}
