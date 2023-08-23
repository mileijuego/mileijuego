import { CharItemStatus } from '../../utils/local-storage';
import { BASE_EXP } from '../constants';
import { skillKey } from '../skill/skill-map';
import { weaponKey } from '../entities/weapon/weapon-map';
import { CharItemEffect, charItem, charItems } from './char-items';

export interface CSkill {
  skillKey: skillKey;
  points: number;
}

interface Inventory {
  armors: Record<charItem, CharItemStatus>;
  weapons: Record<charItem, CharItemStatus>;
}

export interface Character {
  exp: number;
  coins: number;
  skills: CSkill[];
  inventory: Inventory;
}

export function calculateLevel(exp: number, baseExp: number = BASE_EXP) {
  if (exp < baseExp) {
    return 1;
  }

  const level = Math.floor(Math.log2(exp / baseExp) + 1) + 1;
  return level;
}

export function calculateExp(level: number, baseExp: number = BASE_EXP) {
  if (level <= 1) {
    return 0;
  }

  const exp = baseExp * Math.pow(2, level - 2);
  return exp;
}

export function getAvailableSkillsPoints(character: Character) {
  let usedPoints = 0;
  character.skills.forEach((s) => (usedPoints += s.points));

  const level = calculateLevel(character.exp);

  return level - usedPoints;
}

export function addSkillPoint(character: Character, skillKey: string) {
  character.skills.forEach((skill, i) => {
    if (skill.skillKey === skillKey) {
      character.skills[i] = {
        ...skill,
        points: skill.points + 1,
      };
    }
  });
}

export function getCharArmor(character: Character) {
  for (const aKey in character.inventory.armors) {
    const key = aKey as keyof typeof character.inventory.armors;

    if (character.inventory.armors[key] === CharItemStatus.BOUGHT) {
      return aKey;
    }
  }

  return null;
}

export function getCharWeapon(character: Character): weaponKey | null {
  for (const wKey in character.inventory.weapons) {
    if (
      character.inventory.weapons[wKey as weaponKey] === CharItemStatus.BOUGHT
    ) {
      return wKey as weaponKey;
    }
  }

  return null;
}

export function buyItem(character: Character, charItem: charItem) {
  const charItemData = charItems[charItem];
  character.coins -= charItemData.price;

  selectItem(character, charItem);
}

export function canBuyItem(character: Character, charItem: charItem) {
  const charItemData = charItems[charItem];

  const itemCategory = character.inventory[charItemData.type];

  return (
    character.coins >= charItemData.price &&
    itemCategory[charItem] === CharItemStatus.NO_BOUGHT
  );
}

export function selectItem(character: Character, charItem: charItem) {
  const charItemData = charItems[charItem];

  const itemCategory = character.inventory[charItemData.type];

  for (let item in itemCategory) {
    if (itemCategory[item] === CharItemStatus.BOUGHT) {
      itemCategory[item] = CharItemStatus.NOT_USED;
    }
  }

  itemCategory[charItem] = CharItemStatus.BOUGHT;
}

export function getCharEffects(character: Character) {
  const effects: CharItemEffect[] = [];

  const armorKey = getCharArmor(character);

  if (armorKey) {
    const armorData = charItems[armorKey];
    effects.push(...armorData.effects);
  }

  return effects;
}

export function resetSkillPoints(character: Character) {
  character.skills.forEach((skill) => (skill.points = 0));
}
