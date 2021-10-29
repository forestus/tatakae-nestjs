import { DescriptionEntity } from '@description/description/entities/description.entity';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class ApiOkResponseTypesPartial extends PartialType(
  OmitType(DescriptionEntity, []),
) {}

export class ApiOkResponseTypes extends ApiOkResponseTypesPartial {
  @ApiProperty({
    description: 'id do description',
    example: 'a3864e51-1343-4860-8f72-2df68bbb44be',
    uniqueItems: true,
  })
  id: string;
  @ApiProperty({ description: 'nome do description', example: 'naruto' })
  name: string;
  @ApiProperty({ description: 'data de criação do registro' })
  created_at: Date;

  @ApiProperty({
    description: 'data de atualização do registro',
    example: null,
  })
  updated_at: Date;
}
