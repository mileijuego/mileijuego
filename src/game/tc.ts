import { agentKey } from './entities/agent/agents-map';

export type DataEnemyTC = {
  item: agentKey | DataEnemyTC;
  chance: number;
}[];

export const getItemFromTC = (tc: DataEnemyTC): agentKey | null => {
  const nonZeroItems: { item: agentKey | DataEnemyTC; chance: number }[] = [];
  let totalChances = 0;

  for (const { item, chance } of tc) {
    if (chance > 0) {
      nonZeroItems.push({ item, chance });
      totalChances += chance;
    }
  }

  if (totalChances === 0) {
    return null; // Return null when all chances are zero or the list is empty
  }

  const randomNumber = Math.random() * totalChances;
  let cumulativeProbability = 0;

  for (const { item, chance } of nonZeroItems) {
    cumulativeProbability += chance;
    if (randomNumber < cumulativeProbability) {
      if (typeof item === 'string') {
        return item;
      } else {
        return getItemFromTC(item);
      }
    }
  }

  const picked = nonZeroItems[nonZeroItems.length - 1].item;
  if (typeof picked === 'string') {
    return picked;
  } else {
    return getItemFromTC(picked);
  }
};

const tc1: DataEnemyTC = [
  {
    item: [
      {
        item: 'hater',
        chance: 3,
      },
      {
        item: 'pibi',
        chance: 5,
      },
      {
        item: 'ofe',
        chance: 5,
      },
      {
        item: 'lali',
        chance: 1,
      },
    ],
    chance: 50,
  },
  {
    item: 'alberso', // Boss
    chance: 1,
  },
];

const tc2: DataEnemyTC = [
  {
    item: [
      {
        item: tc1,
        chance: 5,
      },
      {
        item: 'old-lady',
        chance: 5,
      },
      {
        item: 'gorilla',
        chance: 5,
      },
    ],
    chance: 100,
  },
  {
    item: 'larrata', // Boss
    chance: 1,
  },
];

const tc3: DataEnemyTC = [
  {
    item: [
      {
        item: tc2,
        chance: 20,
      },
      {
        item: 'fat-campodist',
        chance: 20,
      },
      {
        item: 'golden-fat-campodist',
        chance: 5,
      },
      {
        item: 'gordo-mortero',
        chance: 1,
      },
    ],
    chance: 300,
  },
  {
    item: 'crisistina', // Boss
    chance: 1,
  },
];

const tc4: DataEnemyTC = [
  {
    item: tc3,
    chance: 1600,
  },
  {
    item: 'kicilove',
    chance: 5,
  },
  {
    item: 'expert',
    chance: 5,
  },
  {
    item: 'gabois',
    chance: 5,
  },
  {
    item: 'masgloton', // Boss
    chance: 1,
  },
  {
    item: 'central-bank-alberso', // Boss
    chance: 1,
  },
  {
    item: 'central-bank-larrata', // Boss
    chance: 1,
  },
  {
    item: 'central-bank-crisistina', // Boss
    chance: 1,
  },
];

const tc5: DataEnemyTC = [
  {
    item: [
      {
        item: tc4,
        chance: 1,
      },
      {
        item: 'br-ofe',
        chance: 1,
      },
      {
        item: 'br-pibi',
        chance: 1,
      },
    ],
    chance: 1600,
  },
  {
    item: 'luladrao', // Boss
    chance: 1,
  },
];

const tc6: DataEnemyTC = [
  {
    item: [
      {
        item: tc5,
        chance: 3,
      },
      {
        item: 'npc',
        chance: 3,
      },
      {
        item: 'gleta',
        chance: 2,
      },
      {
        item: 'mini-alien',
        chance: 1,
      },
    ],
    chance: 3200,
  },
  {
    item: 'alien', // Boss
    chance: 1,
  },
];

export function getTcByWave(wave: number) {
  if (wave > 14) {
    return tc6;
  }

  if (wave > 11) {
    return tc5;
  }

  if (wave > 8) {
    return tc4;
  }

  if (wave > 5) {
    return tc3;
  }

  if (wave > 2) {
    return tc2;
  }

  return tc1;
}
