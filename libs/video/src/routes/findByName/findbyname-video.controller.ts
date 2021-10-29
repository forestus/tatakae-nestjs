import { VideoEntity } from '@video/video/entities/video.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { FindByNameVideoService } from './findbyname-video.service';

@ApiTags('Video')
@Controller()
export class FindByNameVideoController {
  constructor(private findByNameVideoService: FindByNameVideoService) {}
  @ApiOperation({ summary: 'Criação de Video' })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @Get('video/:name')
  create(
    @Param('name')
    name: string,
  ): Promise<VideoEntity[]> {
    return this.findByNameVideoService.findByName(name);
  }
}
