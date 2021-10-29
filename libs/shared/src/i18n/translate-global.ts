import i18next from 'i18next';

export function translateGlobal(
  t: string,
  language: string,
  type: string,
): string {
  return i18next.t(t, {
    ns: type,
    lng: language,
  });
}
