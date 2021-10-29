import { TorrentEntity } from '@torrent/torrent/entities/torrent.entity';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class ApiOkResponseTypesPartial extends PartialType(
  OmitType(TorrentEntity, []),
) {}

export class ApiOkResponseTypes extends ApiOkResponseTypesPartial {
  @ApiProperty({
    description: 'id do torrent',
    example: 'a3864e51-1343-4860-8f72-2df68bbb44be',
    uniqueItems: true,
  })
  id: string;
  @ApiProperty({ description: 'nome do torrent', example: 'naruto' })
  name: string;
  @ApiProperty({ description: 'data de criação do registro' })
  created_at: Date;

  @ApiProperty({
    description: 'data de atualização do registro',
    example: null,
  })
  updated_at: Date;
}
