export interface HSL {
  h: number
  s: string
  l: string
}

export const BLACK_COLOR: HSL = {
  h: 0,
  l: "0%",
  s: "0%",
}

export const hexToHSL = (hex: string): HSL | undefined => {
  if (hex == null) {
    return undefined
  }

  let hexColor = removeHash(hex.trim())

  if (hexColor.length === 3) {
    hexColor = expand(hexColor)
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
  if (result == null) return undefined
  let r = Number.parseInt(result[1], 16)
  let g = Number.parseInt(result[2], 16)
  let b = Number.parseInt(result[3], 16)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number
  let s: number
  const l = (max + min) / 2
  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        h = 0
        break
    }

    h /= 6
    h *= 360
  }
  const HSL: HSL = {
    h,
    s: `${(s * 100).toFixed(2)}%`,
    l: `${(l * 100).toFixed(2)}%`,
  }

  return HSL
}

const removeHash = (hex: string): string => hex.replace(/#/g, "")

const expand = (hex: string): string =>
  hex
    .split("")
    .reduce((acc: string[], value) => acc.concat([value, value]), [])
    .join("")
