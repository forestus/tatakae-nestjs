import i18next from 'i18next';

import { UnprocessableEntityException, ValidationError } from '@nestjs/common';
import responses from '@shared/shared/i18n/locates/en/server-response.json';
import responsesPT from '@shared/shared/i18n/locates/pt/server-response.json';

import { ValidationException } from '../filters/validation-exception.filter';
import fieldsDtoPT from '../i18n/locates/pt/fields-validation.json';
import classValidatorPT from '../i18n/locates/pt/validation.json';

i18next.init({
  lng: 'pt',
  fallbackLng: 'en',
  nsSeparator: false,
  resources: {
    pt: {
      server: responsesPT,
      validation: classValidatorPT,
      fields: fieldsDtoPT,
    },
    en: {
      server: responses,
    },
  },
  interpolation: { prefix: '$', suffix: '' },
});

export function translateErrors(
  validationErrors: ValidationError[],
): UnprocessableEntityException {
  return new ValidationException(validationErrors);
}
