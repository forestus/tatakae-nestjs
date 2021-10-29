import { ValidationError } from 'class-validator';

import { classValidationPatterns } from './class-validator-patterns';
import { translateGlobal } from './translate-global';

export interface IErrors {
  property?: string;
  constraint: string;
  translate: string;
}
/* eslint-disable no-restricted-syntax */
export function translate(error: ValidationError, lng: string): IErrors[] {
  return Object.keys(error.constraints).map((key: string): IErrors => {
    let errors: IErrors;
    let match: string[] | null;
    let constraint: string;

    for (const validationPattern of classValidationPatterns) {
      const pattern = validationPattern.replace('$', '\\$');

      constraint = error.constraints[key].replace(error.property, '$property');
      match = new RegExp(pattern, 'g').exec(constraint);
      if (match) {
        break;
      }
    }
    const i18nKey = translateGlobal(constraint, lng, 'validation');

    if (match) {
      for (let i = 0; i < match.length; i += 1) {
        errors = {
          property: error.property,
          constraint: constraint.replace('$property ', '').replace(/ /g, '_'),
          translate: i18nKey.replace('$property ', ''),
        };
      }
    }
    if (!errors) {
      return {
        constraint: constraint.replace('$property ', '').replace(/ /g, '_'),
        translate: i18nKey.replace('$property ', ''),
      };
    }

    return errors;
  });
}
