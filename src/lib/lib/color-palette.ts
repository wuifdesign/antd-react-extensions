import { ReplaceValue } from './color-palette-node'

const colorPalette = require('./color-palette-node').colorPalette as (color: string, index: number) => string
const getFullColorPalette = require('./color-palette-node').getFullColorPalette as (
  color: string,
  getValue: (index: number) => string,
  selector?: RegExp
) => Record<string, ReplaceValue>
const getFullColorPaletteForVariable = require('./color-palette-node').getFullColorPaletteForVariable as (
  color: string,
  variableName: string,
  selector?: RegExp
) => Record<string, ReplaceValue>
const getCssVariablesFromColor = require('./color-palette-node').getCssVariablesFromColor as (
  color: string,
  variableName: string
) => Record<string, string>

export { colorPalette, getCssVariablesFromColor, getFullColorPalette, getFullColorPaletteForVariable }
