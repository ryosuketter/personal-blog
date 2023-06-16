export interface ResizeCanvasImageParams {
  image: HTMLCanvasElement
  width: number
  height: number
}

export const resizeCanvasImage = ({ image, width, height }: ResizeCanvasImageParams) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(image, 0, 0, width, height)
  return canvas.toDataURL('image/png')
}
