import { CreateDescriptionDTO } from '@description/description/dto/create-description.dto';
import { BodyRequest } from '@description/description/swagger/request/body-request';
import { ApiOkResponseTypes } from '@description/description/swagger/responses/api-ok-response.swagger';
import { DescriptionEntity } from '@description/description/entities/description.entity';
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
import { CreateDescriptionService } from './create-description.service';

@ApiTags('Description')
@Controller()
export class CreateDescriptionController {
  constructor(private createDescriptionService: CreateDescriptionService) {}
  @ApiOperation({ summary: 'Criação de Description' })
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
  @Post('description')
  create(
    @Body() description: CreateDescriptionDTO,
  ): Promise<DescriptionEntity> {
    return this.createDescriptionService.create(description);
  }
}
