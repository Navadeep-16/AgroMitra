import { en } from './en';
import { te } from './te';

export type TranslationKey = keyof typeof en;
export type SupportedLanguage = 'en' | 'te';

export const translations: Record<SupportedLanguage, typeof en> = {
  en,
  te: te as typeof en,
};

export const translate = (key: TranslationKey, lang: SupportedLanguage = 'en'): string => {
  return translations[lang]?.[key] || translations['en'][key] || key;
};

