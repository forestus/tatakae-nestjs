/* eslint-disable @typescript-eslint/no-unused-vars */
import translate from '@vitalets/google-translate-api';
// a cada 3 linhas traduzir a mesma no arquivo .srt
async function translated(field) {
  return (await translate(field, { to: 'en' })).text.replace('.', ''); // é necessário informar para qual idioma voce quer alterar no campo "to: 'en'"
}
