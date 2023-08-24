import Agent from '.';
import { charItems } from '../../char/char-items';
import { charSkills } from '../../char/char-skills';
import {
  Character,
  calculateLevel,
  getCharArmor,
  getCharEffects,
  getCharWeapon,
} from '../../char/character';
import { DAMAGE_PER_LEVEL, GOD_MODE, HP_PER_LEVEL } from '../../constants';
import Game from '../../game';
import { skillKey, skillMap } from '../../skill/skill-map';
import Vector2D from '../../utils/vector-2d';
import { weaponMap } from '../weapon/weapon-map';

export default class AgentCharacter extends Agent {
  public setCharacter(character: Character, game: Game) {
    const level = calculateLevel(character.exp);

    // Sets the hp by agent level.
    this.maxHp += (level - 1) * HP_PER_LEVEL;
    this.hp = this.maxHp;

    // Sets the damage by agent level.
    this.damage += (level - 1) * DAMAGE_PER_LEVEL;

    if (GOD_MODE) {
      this.maxHp += 999999;
      this.hp += 999999;
      this.damage += 9999;
    }

    const skillPoints: Partial<Record<skillKey, number>> = {};

    // Sets the skills.
    character.skills
      // Removes the skills that are not in the char skills json
      .filter((skill) => charSkills[skill.skillKey as keyof typeof charSkills])
      .forEach((cSkill) => {
        if (cSkill.points > 0) {
          const skill = new skillMap[cSkill.skillKey]({ agent: this });

          skillPoints[cSkill.skillKey] = cSkill.points;

          this.addSkill(skill);
        }
      });

    // Sets the weapon.
    const weaponKey = getCharWeapon(character);
    if (weaponKey) {
      this.addEntity(
        new weaponMap[weaponKey]({
          position: new Vector2D(this.position.x + 16, this.position.y + 24),
        }),
      );
    }

    // Sets the armor.
    const armorKey = getCharArmor(character);
    if (armorKey !== null) {
      const armorData = charItems[armorKey];
      this.spriteData.agent = armorData.spriteKey;
    }

    // Sets the char effects
    const charEffects = getCharEffects(character);
    charEffects.forEach((effect) => {
      switch (effect.effect) {
        case 'hpMultiplier': {
          this.hp *= effect.value;
          this.maxHp *= effect.value;
          break;
        }

        case 'sumSpeed': {
          this.__speed += effect.value;
          break;
        }

        case 'skillPointsMultiplier': {
          this.skills.forEach((skill) => {
            if (skill.skillKey) {
              (skillPoints[skill.skillKey] as number) *= effect.value;
            }
          });
          break;
        }
      }
    });

    this.skills.forEach((skill) => {
      if (!skill.skillKey) {
        return;
      }

      const points = skillPoints[skill.skillKey];

      if (points === undefined) {
        return;
      }

      skill.setPoints(points, game);
    });
  }
}
