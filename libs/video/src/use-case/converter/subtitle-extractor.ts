import fs from 'fs'
import path from 'path'
import translate from '@vitalets/google-translate-api';
const fileExists = require('file-exists').sync
import z from 'zero-fill'
import { SubtitleParser } from 'matroska-subtitles'

export interface IPrepare {
  message: string;
  matches: Array<string>
}

const logger = fs.createWriteStream("./first-translate.por.srt", {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

function filterMatches(text: string[]): string[] {
  if (text.length > 1) {
    for (let i = 0; i < text.length; i++) {
       text[i] = text[i].replace('{','').replace('\\N','# ')
    }
  } else {
    text[0] = text[0].replace('{','').replace('\\N','# ')
  }
  return text;
}

// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function msToTime (s) {
  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60
  const hrs = (s - mins) / 60

  return z(2, hrs) + ':' + z(2, mins) + ':' + z(2, secs) + ',' + z(3, ms)
}

async function translated(field: string[]): Promise<string> {
  let receiveAll = []
  field = field.map((t)=>{
    return `<div>${t}</div>`
  })
  const turnInString = String(field)
  const prepare = turnInString.match(/.{1,5000}/gm)
  console.log(turnInString.length)
  console.log(prepare.length)
  for (let i = 0; i < prepare.length; i++) {
    const [traslatedd] = await Promise.all([
      translate(prepare[i], { to: 'pt' }).catch((e)=>{
        console.log(e)
      }),
    ]);
    receiveAll.push((traslatedd as any).text)
  }
return receiveAll.join('');
}

const mkvSubtitleExtractor = (mkvPath, outputDir) => new Promise((resolve, reject) => {
  const dir = outputDir || path.dirname(mkvPath)
  const name = path.basename(mkvPath, path.extname(mkvPath))

  // create srt path from language suffix
  const srtPath = function (language) {
    const languageSuffix = language ? '.' + language : ''
    return path.join(dir, name + languageSuffix + '.srt')
  }

  const tracks = new Map()
  const subs = new SubtitleParser()

  subs.once('tracks', tracks_ => {
    tracks_.forEach(track => {
      // sometimes `und` (undefined) is used as the default value, instead of leaving the tag unassigned
      const language = track.language !== 'und' ? track.language : null
      let subtitlePath = srtPath(language)
      // obtain unique filename (don't overwrite)
      for (let i = 2; fileExists(subtitlePath); i++) {
        subtitlePath = language ? srtPath(language + i) : srtPath(i)
      }

      tracks.set(track.number, {
        index: 1,
        file: fs.createWriteStream(subtitlePath),
        language
      })
    })
  })

  let prepareArray = []
  let translateArray = []

  subs.on('subtitle', async (sub, trackNumber) => {
    const track = tracks.get(trackNumber)
    if (track.language === undefined || track.language == 'en') {
      prepareArray.push({
        id: track.index++,
        time: `${msToTime(sub.time)} --> ${msToTime(sub.time + sub.duration)}`,
        text: sub.text
      })
      track.file.write(`${track.index}\r\n`)
      track.file.write(`${msToTime(sub.time)} --> ${msToTime(sub.time + sub.duration)}\r\n`)
      track.file.write(`${sub.text}\r\n\r\n`)
    } else {
      track.file.write(`${track.index++}\r\n`)
      track.file.write(`${msToTime(sub.time)} --> ${msToTime(sub.time + sub.duration)}\r\n`)
      track.file.write(`${sub.text}\r\n\r\n`)
    }
  })
let sacolinha = []
  subs.on('finish', async () => {
    const tracks_ = []
    for (let i = 0; i < prepareArray.length; i++) {
      const text: string = prepareArray[i].text;
      const id:number = prepareArray[i].id;
      const filtered = filterMatches(text.match(/([^{\}]+)(?:$|\{)/gm))
        translateArray.push(filtered)
      }
      const translatedText: string = await translated(translateArray)
      const translatedTextArray = translatedText.replace('<div>','').split(/(<([/div>]+)>)(<([div>]+)>)/)
      console.log(translatedTextArray)
      
    
    sacolinha = prepareArray
    console.log(translatedTextArray.length)
    let count = 0;
    for (let i = 0; i < translatedTextArray.length -1; i++) {
      const eachLine: string = translatedTextArray[i+count]
      const checkTXT = eachLine.replace(/#/g,'\\N').replace(/\\\sn/gm,'\\N').trim()
      const {time,id} = prepareArray[i]
      if (checkTXT.length > 0) {
        sacolinha[i].text = checkTXT
        logger.write(`${id}\r\n`)
        logger.write(`${time}\r\n`)
        logger.write(`${checkTXT}\r\n\r\n`)
      }else {
        i = i-1
        count++
      }
    }
    // console.log(sacolinha)
    tracks.forEach(async (track, i) => {
        if (!track.language) {
            console.log("O Subtitulo em ingles esta sem nome: " + track.language)
          }
          track.file.end()
          tracks_.push({number: i, path: track.file.path, language: track.language})
        })
    resolve(tracks_)
  })

  const file = fs.createReadStream(mkvPath)
  file.on('error', err => reject(err))
  file.pipe(subs)
})

export { mkvSubtitleExtractor}