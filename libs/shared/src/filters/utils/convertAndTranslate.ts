/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { IErrors, translate } from '../../i18n/translate';
import { translateGlobal } from '../../i18n/translate-global';

export function convertAndTranslate(errors: any, lng: string) {
  const validationErrors: Array<string | IErrors> = [];
  const messages: any = [];
  errors.map((error) => {
    if (error.constraints) {
      messages.push(
        ...translate(error, lng).map((err) => {
          return `${error.property}:${err.constraint}:${translateGlobal(
            error.property,
            lng,
            'fields',
          )} ${err.translate}`;
        }),
      );
    }
    return null;
  });
  messages.filter((el) => {
    return el != null;
  });

  errors.map((error) => {
    error.children &&
      error.children
        .map((children) => {
          if (children.children.length) {
            return children.children
              .map((child) => ({
                propety: child.property,
                constraint: translate(child, lng)
                  .map((t) => t.constraint)
                  .filter((el) => el != null),
                translate: translate(child, lng)
                  .map((t) => t.translate)
                  .filter((el) => el != null),
              }))
              .map((typeError) => {
                typeError.translate = Object.values(typeError.translate);
                return typeError;
              })
              .map(
                (err) =>
                  `${error.property}.${children.property}.${err.propety}:${
                    err.constraint
                  }:${translateGlobal(
                    err.propety,
                    lng,
                    'fields',
                  )} de ${translateGlobal(error.property, lng, 'fields')} ${
                    err.translate
                  }`,
              );
          }
          if (children.constraints) {
            return translate(children, lng).map((t) => {
              if (t.translate) {
                return `${error.property}.${children.property}:${
                  t.constraint
                }:${translateGlobal(
                  children.property,
                  lng,
                  'fields',
                )} de ${translateGlobal(error.property, lng, 'fields')} ${
                  t.translate
                }`;
              }
              return t;
            });
          }
        })
        .map((error) =>
          error.map((message) => {
            validationErrors.push(message);
            return validationErrors;
          }),
        );
    return validationErrors;
  });
  validationErrors.map((validationError) => {
    messages.push(validationError);
  });
  return messages;
}
