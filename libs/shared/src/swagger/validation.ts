import { ApiProperty } from '@nestjs/swagger';

export class ValidationResponseError {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'mensagem',
    example:
      'Erro nos dados. Por favor, confira as informações e tente novamente',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;
}
