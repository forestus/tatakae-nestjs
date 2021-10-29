import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseError {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'mensagem',
    example:
      'Erro nos dados. Por favor, confira as informações e tente novamente',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
  })
  error: string;
}
