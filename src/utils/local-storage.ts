import { Storage } from '@ionic/storage';
import { levelKey } from '../game/interfaces';
import { mergeObjects } from './utils';
import { Character } from '../game/char/character';
import { Language } from '../texts/texts';

export enum CharItemStatus {
  NO_BOUGHT = 0,
  BOUGHT = 1,
  NOT_USED = 2,
}

export interface IUserData {
  finishedLevels: levelKey[];
  survivalRecord: {
    wave: number;
    enemiesDefeated: number;
  };
  joystickScale: number;
  mutedVolume: boolean;
  mutedMusic: boolean;
  showPlayerHpBar: boolean;
  language: null | Language;
  character: Character;
}

export const getDefaultUserData = (): IUserData => ({
  finishedLevels: [],
  joystickScale: 1,
  mutedVolume: false,
  mutedMusic: false,
  showPlayerHpBar: false,
  language: null,
  survivalRecord: {
    wave: 0,
    enemiesDefeated: 0,
  },
  character: {
    exp: 0,
    coins: 0,
    skills: [
      { skillKey: 'despertar-leones', points: 0 },
      { skillKey: 'libertad-avanza', points: 0 },
      { skillKey: 'zurdos-tiemblen', points: 0 },
      { skillKey: 'milei-porquenotevas', points: 0 },
      { skillKey: 'libertarian-shield', points: 0 },
      { skillKey: 'multiple-shot', points: 0 },
      { skillKey: 'liberator-book', points: 0 },
      { skillKey: 'palaboom', points: 0 },
      { skillKey: 'buni', points: 0 },
    ],
    inventory: {
      armors: {
        suit: CharItemStatus.BOUGHT,
        'libertarian-armor': CharItemStatus.NO_BOUGHT,
        'leather-jacket': CharItemStatus.NO_BOUGHT,
        'divine-armor': CharItemStatus.NO_BOUGHT,
      },
      weapons: {
        'libertarian-staff-normal': CharItemStatus.BOUGHT,
        'libertarian-staff-gold': CharItemStatus.NO_BOUGHT,
        'libertarian-staff-fire': CharItemStatus.NO_BOUGHT,
        'libertarian-staff-ice': CharItemStatus.NO_BOUGHT,
        'divine-staff': CharItemStatus.NO_BOUGHT,
      },
    },
  },
});

const USER_DATA_KEY = 'userData';

const store = new Storage();
store.create();

async function mergeUserDataWithDefault() {
  let mergedData: IUserData = { ...getDefaultUserData() }; // Create a shallow copy of defaultUserData

  // Retrieve userData from localStorage
  const storedData = await store.get(USER_DATA_KEY);

  if (storedData) {
    try {
      const userData = JSON.parse(storedData);
      mergedData = mergeObjects(mergedData, userData) as IUserData;
    } catch (error) {
      console.error('Error parsing userData from localStorage:', error);
    }
  }

  return mergedData;
}

export async function getUserData(): Promise<IUserData> {
  return mergeUserDataWithDefault();
}

export async function setUserData(userData: IUserData) {
  return store.set(USER_DATA_KEY, JSON.stringify(userData));
}

// Function to check if a level is playable
export function isLevelPlayable(
  levels: { [levelKey: string]: any },
  level: string,
  finishedLevels: string[],
): boolean {
  const levelData = levels[level];
  const levelsKeys = Object.keys(levels).filter(
    (key) => levels[key].category === levelData.category,
  );

  const index = levelsKeys.indexOf(level);
  if (index === -1) {
    return false;
  }

  const previousLevel = getPreviousLevel(levels, level);

  if (index === 0) {
    // The first level is always playable.
    return true;
  }

  if (previousLevel && finishedLevels.includes(previousLevel)) {
    return true;
  }

  if (finishedLevels.includes(level)) {
    return true;
  }

  if (
    levelsKeys.some(
      (lvl: string, i: number) => i > index && finishedLevels.includes(lvl),
    )
  ) {
    // If it has some next level finished it will be playable.
    return true;
  }

  return false;
}

// Helper function to get the previous level
function getPreviousLevel(
  levels: { [levelKey: string]: any },
  level: string,
): string | undefined {
  const levelKeys = Object.keys(levels);
  const levelIndex = levelKeys.indexOf(level);
  if (levelIndex > 0) {
    return levelKeys[levelIndex - 1];
  }
  return undefined;
}
