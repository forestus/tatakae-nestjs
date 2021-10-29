/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { translateGlobal } from '../i18n/translate-global';
import { IGlobalResponse } from './global-response.interface';
import { checkLNG } from './utils/checkHeaderLanguage';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const translated = translateGlobal(
      exception.message,
      checkLNG(request),
      'server',
    );
    if (translated) {
      if (translated !== exception.message) {
        response.status(HttpStatus.NOT_FOUND).json({
          details: [],
          message: `${exception.message}:${translated}`,
        } as IGlobalResponse);
      } else {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: exception.message } as IGlobalResponse);
      }
    }
  }
}
