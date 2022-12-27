import fs from 'fs/promises'
import { createWriteStream } from 'fs'
import { FILES_FOLDER_PATH } from './constants'
import type { Readable } from 'stream'

export async function checkOrCreateFilesFolder() {
  try {
    await fs.opendir(FILES_FOLDER_PATH)
    return true
  } catch(e) {
    if (e.code === 'ENOENT') {
      await fs.mkdir(FILES_FOLDER_PATH)
      return true
    }
    console.error(e)
    return false
  }
}

export function writeToFile(filePath: string, readableStream: Readable) {
  return new Promise((res, rej) => {
    const resultStream = readableStream.pipe(createWriteStream(filePath))
    resultStream.on('finish', () => {
      res(true)
    })
    resultStream.on('error', () => {
      rej(false)
    })
  })
}

let fileNumber = 1

export function generateUniqueFileName(prefix: string) {
  return `${prefix} ${fileNumber++}`
}

