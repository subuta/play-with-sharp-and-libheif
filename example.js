import 'loud-rejection/register'

import fs from 'fs'
import path from 'path'

import sharp from 'sharp'

import {
  convertBuffer
} from './src/heif'

const ROOT_DIR = path.resolve(__dirname, './')
const EXAMPLES_DIR = path.resolve(ROOT_DIR, './examples')

const process = (buffer, destFilePath) => {
  return sharp(buffer)
    .rotate()
    .resize(200, 200)
    .toFile(destFilePath)
}

const example = async () => {
  console.log('Resize image started.')

  // Should convert heif to jpeg and resize it.
  const heifFile = fs.readFileSync(path.resolve(EXAMPLES_DIR, './example.heic'))

  const jpegBuffer = await convertBuffer(heifFile, { quality: 0.95 })
  await process(jpegBuffer, path.resolve(EXAMPLES_DIR, './example-resized.jpg'))

  // Should resize rotated jpeg with correct orientation.
  const landscapeJpegBuffer = fs.readFileSync(path.resolve(EXAMPLES_DIR, './Landscape_2.jpg'))
  await process(landscapeJpegBuffer, path.resolve(EXAMPLES_DIR, './Landscape_2-resized.jpg'))

  // Should resize rotated jpeg with correct orientation.
  const portraitJpegBuffer = fs.readFileSync(path.resolve(EXAMPLES_DIR, './Portrait_2.jpg'))
  await process(portraitJpegBuffer, path.resolve(EXAMPLES_DIR, './Portrait_2-resized.jpg'))

  console.log('Resize image ended.')
}

example()
