import Agent from '.';
import { charItems } from '../../char/char-items';
import {
  Character,
  calculateLevel,
  getCharArmor,
  getCharEffects,
  getCharWeapon,
} from '../../char/character';
import { DAMAGE_PER_LEVEL, GOD_MODE, HP_PER_LEVEL } from '../../constants';
import Game from '../../game';
import { skillMap } from '../../skill/skill-map';
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

    // Sets the skills.
    character.skills.forEach((cSkill) => {
      if (cSkill.points > 0) {
        const skill = new skillMap[cSkill.skillKey]({ agent: this });
        skill.setPoints(cSkill.points, game);

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
            skill.setPoints(skill.points * effect.value, game);
          });
          break;
        }
      }
    });
  }
}
