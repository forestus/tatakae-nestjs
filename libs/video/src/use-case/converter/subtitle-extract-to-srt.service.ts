/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import z from 'zero-fill';
const fileExists = require('file-exists').sync;
import { SubtitleParser } from 'matroska-subtitles';
// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function msToTime(s) {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return z(2, hrs) + ':' + z(2, mins) + ':' + z(2, secs) + ',' + z(3, ms);
}

/**
 * Reads mkv file and writes srt files in same location or in outputDir
 */
const mkvSubtitleExtractor = (mkvPath, outputDir) =>
  new Promise((resolve, reject) => {
    const dir = outputDir || path.dirname(mkvPath);
    const name = path.basename(mkvPath, path.extname(mkvPath));

    // create srt path from language suffix
    const srtPath = function (language) {
      const languageSuffix = language ? '.' + language : '';
      return path.join(dir, name + languageSuffix + '.srt');
    };

    const tracks = new Map();
    const subs = new SubtitleParser();

    subs.once('tracks', (tracks_) => {
      tracks_.forEach((track) => {
        // sometimes `und` (undefined) is used as the default value, instead of leaving the tag unassigned
        const language = track.language !== 'und' ? track.language : null;
        let subtitlePath = srtPath(language);

        // obtain unique filename (don't overwrite)
        for (let i = 2; fileExists(subtitlePath); i++) {
          subtitlePath = language ? srtPath(language + i) : srtPath(i);
        }

        tracks.set(track.number, {
          index: 1,
          file: fs.createWriteStream(subtitlePath),
          language,
        });
      });
    });

    subs.on('subtitle', async (sub, trackNumber) => {
      const track = tracks.get(trackNumber);
      track.file.write(`${track.index++}\r\n`);
      track.file.write(
        `${msToTime(sub.time)} --> ${msToTime(sub.time + sub.duration)}\r\n`,
      );
      track.file.write(`${sub.text}\r\n\r\n`);
      // convert to srt format
    });

    subs.on('finish', () => {
      const tracks_ = [];

      tracks.forEach(async (track, i) => {
        console.log(track.language);
        if (!track.language) {
          console.log('O Subtitulo em ingles esta sem nome: ' + track.language);
        }
        track.file.end();
        tracks_.push({
          number: i,
          path: track.file.path,
          language: track.language,
        });
      });
      resolve(tracks_);
    });

    const file = fs.createReadStream(mkvPath);
    file.on('error', (err) => reject(err));
    file.pipe(subs);
  });

export { mkvSubtitleExtractor };
