import {
  COIN_TEXT,
  MAX_INFLATION,
  STOIC_EXP_PERCENTAGE,
} from '../game/constants';
import esJson from './es.json';
import ptJson from './pt.json';
import enJson from './en.json';
import {
  SKILL_LION_BASE_DMG,
  SKILL_LION_BASE_HP,
} from '../game/skill/despertar-leones';
import { SKILL_BOOK_BASE_DMG } from '../game/skill/skill-liberator-book';

export type Language = 'es' | 'pt' | 'en';

const texts: { [key: string]: any } = {
  es: esJson,
  pt: ptJson,
  en: enJson,
};

export const getTxt = (language: Language, key: string) => {
  return texts[language][key]
    .replace(/{COIN_TEXT}/g, COIN_TEXT)
    .replace(/{MAX_INFLATION}/g, MAX_INFLATION)
    .replace(/{STOIC_EXP_PERCENTAGE}/g, STOIC_EXP_PERCENTAGE)
    .replace(/{SKILL_LION_BASE_HP}/g, SKILL_LION_BASE_HP)
    .replace(/{SKILL_LION_BASE_DMG}/g, SKILL_LION_BASE_DMG)
    .replace(/{SKILL_BOOK_BASE_DMG}/g, SKILL_BOOK_BASE_DMG);
};

export { texts };
