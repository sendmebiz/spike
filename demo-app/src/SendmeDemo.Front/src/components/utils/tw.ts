import { extendTailwindMerge, ClassNameValue } from 'tailwind-merge';
import { fontSize as ConfigFontSizes } from '@/../tailwind.typography';
import { colors as ConfigColors } from '@/../tailwind.colors';

export const TwConfigMerge = {
  override: {
    classGroups: {
      'font-size': Object.keys(ConfigFontSizes).map((key) => `text-${key}`),
      'text-color': Object.keys(ConfigColors).map((key) => `text-${key}`),
    },
  },
};

export const twMerge = extendTailwindMerge(TwConfigMerge);
export { twJoin } from 'tailwind-merge';

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}
