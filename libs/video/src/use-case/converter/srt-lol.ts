import fs from 'fs';
import translateBulks from '@vitalets/google-translate-api';
const CUSTOM_MESSAGE = 'Tatakae Subs';
const MAX_SEGMENT_SIZE = 50; // The max number of sentences to translate with single request
const SOURCE_LANGUAGE = 'en'; // Language to translate from
const TARGET_LANGUAGE = 'pt'; // Language to translate to

const REGEX_INDEX_LINE = /^\d+$/;
const REGEX_TIMESTAMP_LINE =
  /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/;

// Construct clients for storage and translate services

const translateSRTFiles = async (pathFile) => {
  // Construct the filename of the output file
  const translatedFilename = './teste.srt'.replace(
    `-${SOURCE_LANGUAGE}`,
    `-${TARGET_LANGUAGE}`,
  );
  let content;
  const data = fs.readFileSync(pathFile);
  //"./[Erai-raws] 100-man no Inochi no Ue ni Ore wa Tatte Iru - 11 [720p][Multiple Subtitle].txt"
  return await Promise.all([
    data,
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve('I did it');
      }, 1);
    }),
  ])
    .then(async (lol) => {
      const data = String(lol);
      if (data) {
        // We have data, let's put it in a usable structure
        content = processData(data);

        // Only perform translation requests for sentences that are not an index, nor empty, nor a timestamp
        const filtered = content.sentences.filter((element) => {
          const m = element.match(REGEX_INDEX_LINE);
          const n = element.match(REGEX_TIMESTAMP_LINE);
          return !(m || n || element === '');
        });

        console.log(`${filtered.length} lines of text need translation`);
        console.log(`Batch size: ${MAX_SEGMENT_SIZE}`);

        // Break up the translation request into multiple smaller requests
        const promises = [];
        let i = 0;
        while (i < filtered.length) {
          const from = i;
          const to = Math.min(filtered.length - 1, i + MAX_SEGMENT_SIZE - 1);
          // console.log(`${from} -> ${to}`);
          const prepare = filtered.slice(from, to + 1);
          console.log(prepare.join(' shakalakabun ').length);
          promises.push(
            translateBulks(prepare.join(' shakalakabun '), { to: 'pt' }),
          ); // +1 because slice(start, end), end is not inclusive

          i += MAX_SEGMENT_SIZE;
        }

        console.log(`Performing ${promises.length} translation requests`);
        // Wait for all to finish using Promise.all()
        return Promise.all(promises)
          .then((results) => {
            console.log('Translations done.');
            console.log(`${results.length} segments returned`);

            // Create a single array with all translations from the multiple translate requests
            let translations = [];
            results.forEach((segment) => {
              segment = segment.text.split(/S?s?h?a?kal?a?kabun/g);
              translations = translations.concat(segment);
            });
            // .replace(/\s+(?=[^{\}]*\})/g,'').trim()
            // Insert the translations at the right place in the output
            content.requestLines.forEach((position, i) => {
              if (translations[i]) {
                content.output[position] = translations[i]
                  .replace(/\s+(?=[^{\}]*\})/g, '') // remove spaces from translate inside {}
                  .replace(/\\\sn?N?/g, '\\N') // fix commands from translate
                  .trim();
              }
            });
          })
          .catch((err) => {
            console.error(`Translation failed: ${err}`);
            return Promise.reject(`One or more translations failed (${err})`);
          });
      } else {
        console.error('Could not read data');
        return Promise.reject('Could not read data');
      }
    })
    .then(() => {
      // Add custom message
      content.output = [
        '1',
        '00:00:01,000 --> 00:00:09,000',
        CUSTOM_MESSAGE,
        '',
      ].concat(content.output);

      const output = content.output.join('\n');
      const localFilename = `./tmp/${translatedFilename}`;

      //console.log(output);
      console.log(`Writing translated file locally to ${localFilename}.`);

      // Write the file.
      return new Promise<void>((resolve, reject) => {
        fs.writeFile(localFilename, output, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })
    .then(() => {
      console.log('Finished.');
    })
    .catch((err) => {
      console.error('Failed to download, translate or upload file.', err);
      return Promise.reject(err);
    });
};

/**
 * Puts the read data in a structure with info which lines require a translation request and a placeholder for output
 * @param {string} data UTF-8 string of read data from file on Google Cloud Storage
 */
export function processData(data) {
  // Convert single string to array of individual lines
  let structure;

  if (data.indexOf('\r') !== -1) {
    structure = data.split(/\r\n/);
  } else {
    structure = data.split(/\n/);
  }

  // Prepare the structure
  const resultData = {
    sentences: [], // Array with the lines original read SRT file
    requestLines: [], // Array containing indices of lines that need translation
    output: [], // Array with the lines of the translated SRT file
  };
  // Fill the data structure and detect lines that need translation
  structure.forEach((element: string, index) => {
    let matches = element.match(REGEX_INDEX_LINE);
    if (matches) {
      // Line ooks like a single number
      // resultData.sentences.push(matches[0]);
      // resultData.output.push(matches[0]);
      resultData.sentences.push(parseInt(matches[0]).toString()); // Adding +1 to allow for custom message
      resultData.output.push(parseInt(matches[0]).toString());
      return;
    }

    matches = element.match(REGEX_TIMESTAMP_LINE);
    if (matches) {
      // Line looks like 00:00:22,439 --> 00:00:24,304
      resultData.sentences.push(matches[0]);
      resultData.output.push(matches[0]);
      return;
    }

    if (element === '') {
      // Empty line
      resultData.sentences.push('');
      resultData.output.push('');
      return;
    } else {
      element = element.replace(/\\N/g, ' \\N '); // fix breacklines commands in text
      // Only other option, a line that needs to be translated
      resultData.sentences.push(element);
      resultData.output.push(element); // default the untranslated string in the output
      resultData.requestLines.push(index); // Store the index to the line to insert the translations back at the right positions
      return;
    }
  });
  //console.log(resultData.join('\n'));
  console.log(`Lines read: ${resultData.sentences.length}`);
  return resultData;
}
translateSRTFiles(
  './[Erai-raws] 100-man no Inochi no Ue ni Ore wa Tatte Iru - 11 [720p][Multiple Subtitle].srt',
);

export { translateSRTFiles };
