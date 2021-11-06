import { CreateVideoDTO } from '@video/video/dto/create-video.dto';
import { BodyRequest } from '@video/video/swagger/request/body-request';
import { ApiOkResponseTypes } from '@video/video/swagger/responses/api-ok-response.swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
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
import { DownloadVideoService } from './download-video.service';

@ApiTags('Video')
@Controller()
export class DownloadVideoController {
  constructor(private createVideoService: DownloadVideoService) {}
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
  @Post('video/downloader')
  create(): // @Body() video: CreateVideoDTO
  void {
    console.log('chegou aqui1');
    return this.createVideoService.create({});
  }
}
