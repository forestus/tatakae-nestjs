import { DescriptionEntity } from '@description/description/entities/description.entity';
import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { FindByNameDescriptionService } from './findbyname-description.service';

@ApiTags('Description')
@Controller()
export class FindByNameDescriptionController {
  constructor(
    private findByNameDescriptionService: FindByNameDescriptionService,
  ) {}
  @ApiOperation({ summary: 'Criação de Description' })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @Post('description/:name')
  create(
    @Param('name')
    name: string,
  ): Promise<DescriptionEntity[]> {
    return this.findByNameDescriptionService.findByName(name);
  }
}
