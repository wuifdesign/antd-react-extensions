import { ReplaceValue } from './color-palette-node';
declare const colorPalette: (color: string, index: number) => string;
declare const getFullColorPalette: (color: string, getValue: (index: number) => string, selector?: RegExp) => Record<string, ReplaceValue>;
declare const getFullColorPaletteForVariable: (color: string, variableName: string, selector?: RegExp) => Record<string, ReplaceValue>;
declare const getCssVariablesFromColor: (color: string, variableName: string) => Record<string, string>;
export { colorPalette, getCssVariablesFromColor, getFullColorPalette, getFullColorPaletteForVariable };
