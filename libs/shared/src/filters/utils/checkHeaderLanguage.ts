/* eslint-disable prefer-destructuring */
import { Request } from 'express';

export function checkLNG(request: Request): string {
  let lng;
  const reqLanguage = request.acceptsLanguages();
  if (reqLanguage.length) {
    lng = request.acceptsLanguages()[0];
    if (request.acceptsLanguages()[0] === '*') {
      lng = 'pt';
    }
  } else {
    lng = 'pt';
  }
  return lng;
}
