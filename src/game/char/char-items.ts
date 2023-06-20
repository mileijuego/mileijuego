import charItemsJson from './char-items.json';

type charItemType = 'armors' | 'weapons';

export interface CharItemEffect {
  effect: 'hpMultiplier' | 'sumSpeed' | "skillPointsMultiplier";
  value: number;
}

interface CharItem {
  img: string;
  price: number;
  type: charItemType;
  spriteKey?: string;
  effects: CharItemEffect[];
}

const charItems = charItemsJson as { [key: string]: CharItem };

export type charItem = keyof typeof charItems;

export { charItems };
