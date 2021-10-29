import { OmitType, PartialType } from '@nestjs/swagger';
import { ApiOkResponseTypes } from '../responses/api-ok-response.swagger';

export class BodyRequest extends PartialType(
  OmitType(ApiOkResponseTypes, ['created_at', 'updated_at', 'id']),
) {}
