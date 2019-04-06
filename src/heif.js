import fs from 'fs'
import path from 'path'
import * as nc from 'canvas'

import { HeifDecoder } from '../vendor/libheif'

const decoder = new HeifDecoder()

// Convert HeifImage to Canvas instance.
// SEE: https://github.com/strukturag/libheif/blob/master/post.js
const toCanvas = (heifImage) => new Promise((resolve) => {
  const width = heifImage.get_width()
  const height = heifImage.get_height()

  const canvas = nc.createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const imageData = ctx.createImageData(width, height)

  heifImage.display(imageData, (displayImageData) => {
    ctx.putImageData(displayImageData, 0, 0)
    resolve(canvas)
  })
})

// Convert HeifImage to image(JPEG or PNG).
const convertFile = (src, filePath, config = {}) => new Promise(async (resolve) => {
  const buffer = fs.readFileSync(src)
  const heifImage = decoder.decode(buffer)[0]

  // Convert heifImage to Canvas instance.
  const canvas = await toCanvas(heifImage)

  // Free loaded data.
  heifImage.free()

  // Toggle output based on extension.
  const out = fs.createWriteStream(filePath)
  const ext = path.extname(filePath)
  const stream = ext === '.png' ? canvas.createPNGStream(config) : canvas.createJPEGStream(config)

  stream.pipe(out)

  out.on('finish', () => resolve())
})

const convertBuffer = async (heifBuffer, config = {}) => {
  const heifImage = decoder.decode(heifBuffer)[0]

  // Convert heifImage to Canvas instance.
  const canvas = await toCanvas(heifImage)

  // Free loaded data.
  heifImage.free()

  return canvas.toBuffer('image/jpeg', config)
}

export {
  convertFile,
  convertBuffer
}

export default {
  convertFile,
  convertBuffer
}
