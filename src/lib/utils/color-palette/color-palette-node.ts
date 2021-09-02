// @ts-ignore
const tinycolor = require('tinycolor2')

type HSVType = {
  h: number
  s: number
  v: number
}

export type ReplaceValue = string | { value: string; selector: RegExp }

const hueStep = 2
const saturationStep = 0.16
const saturationStep2 = 0.05
const brightnessStep1 = 0.05
const brightnessStep2 = 0.15
const lightColorCount = 5
const darkColorCount = 4

const getHue = function (hsv: HSVType, i: number, isLight: boolean) {
  let hue
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i
  } else {
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i
  }
  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }
  return Math.round(hue)
}
const getSaturation = function (hsv: HSVType, i: number, isLight: boolean) {
  let saturation
  if (isLight) {
    saturation = hsv.s - saturationStep * i
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep
  } else {
    saturation = hsv.s + saturationStep2 * i
  }
  if (saturation > 1) {
    saturation = 1
  }
  if (isLight && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1
  }
  if (saturation < 0.06) {
    saturation = 0.06
  }
  return Number(saturation.toFixed(2))
}
const getValue = function (hsv: HSVType, i: number, isLight: boolean) {
  let value
  if (isLight) {
    value = hsv.v + brightnessStep1 * i
  } else {
    value = hsv.v - brightnessStep2 * i
  }
  if (value > 1) {
    value = 1
  }
  return Number(value.toFixed(2))
}

const colorPalette = (color: string, index: number) => {
  const isLight = index <= 6
  const hsv = tinycolor(color).toHsv()
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1
  return tinycolor({
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  }).toHexString()
}

const getFullColorPalette = (color: string, getValue: (index: number) => string, selector?: RegExp) => {
  const values: Record<string, ReplaceValue> = {}
  for (let i = 1; i <= 10; i++) {
    const key = i === 6 ? color : colorPalette(color, i)
    const value = getValue(i)
    values[key] = selector ? { value, selector } : value
  }
  return values
}

const getFullColorPaletteForVariable = (color: string, variableName: string, selector?: RegExp) => {
  return getFullColorPalette(
    color,
    (i) => {
      return i === 6 ? `var(--${variableName})` : `var(--${variableName}-${i})`
    },
    selector
  )
}

const getCssVariablesFromColor = (color: string, variableName: string) => {
  const values = getFullColorPalette(color, (i) => {
    if (i === 6) {
      return `--${variableName}`
    }
    return `--${variableName}-${i}`
  })
  const map: Record<string, string> = {}
  for (const [key, value] of Object.entries(values)) {
    map[value as string] = key
  }
  return map
}

exports.colorPalette = colorPalette
exports.getFullColorPalette = getFullColorPalette
exports.getFullColorPaletteForVariable = getFullColorPaletteForVariable
exports.getCssVariablesFromColor = getCssVariablesFromColor