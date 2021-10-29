/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from 'class-validator';
import { Request } from 'express';

import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { IGlobalResponse } from './global-response.interface';
import { checkLNG } from './utils/checkHeaderLanguage';
import { convertAndTranslate } from './utils/convertAndTranslate';

export class ValidationException extends BadRequestException {
  constructor(public errorsList?: ValidationError[]) {
    super();
  }
}
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse();

    return response.status(HttpStatus.BAD_REQUEST).json({
      message: convertAndTranslate(exception.errorsList, checkLNG(request)),
    } as IGlobalResponse);
  }
}
