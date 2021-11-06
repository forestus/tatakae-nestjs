import { DescriptionEntity } from '@description/description/entities/description.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationResponseError } from '@shared/shared/swagger/validation';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { GetDescriptionByNameService } from './findbyname-description.service';
class CreateParams {
  @IsString()
  name: string;
  @IsOptional()
  @IsNumberString()
  max?: number;
}
@ApiTags('Description')
@Controller()
export class GetDescriptionByNameController {
  constructor(
    private getDescriptionByNameService: GetDescriptionByNameService,
  ) {}
  @ApiOperation({ summary: 'Criação de Description' })
  @ApiResponse({
    status: 400,
    description: 'Erros de Validação',
    type: ValidationResponseError,
  })
  @Get('descriptions/search/:name/:max?')
  async create(
    @Param()
    { name, max }: CreateParams,
  ): Promise<DescriptionEntity[]> {
    return this.getDescriptionByNameService.findByName(name, max);
  }
}
