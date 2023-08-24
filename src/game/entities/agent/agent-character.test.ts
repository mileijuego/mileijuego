import { Character } from '../../char/character';
import { ALLY_TEAM } from '../../constants';
import Game from '../../game';
import { skillKey } from '../../skill/skill-map';
import Vector2D from '../../utils/vector-2d';
import Milei from './milei';

describe('AgentCharacter', () => {
  describe('setCharacter', () => {
    it('should set the correct skill points.', () => {
      const game = new Game({
        width: 500,
        height: 500,
        levelData: {
          category: 'ar',
          playerAgent: 'milei',
          finalBoss: null,
          music: 'music-dark',
          scripts: ['december-is-far-away'],
          mapWidth: 2000,
          mapHeight: 1200,
          startX: 100,
          startY: 600,
          mapColor: '#B37A7A',
          enemyWaves: [],
        },
      });
      const agent = new Milei({
        position: new Vector2D(0, 0),
        team: ALLY_TEAM,
      });
      const character: Character = {
        exp: 1009385,
        coins: 879385,
        skills: [
          { skillKey: 'despertar-leones', points: 1 },
          { skillKey: 'libertad-avanza', points: 2 },
          { skillKey: 'zurdos-tiemblen', points: 1 },
          { skillKey: 'milei-porquenotevas', points: 1 },
          { skillKey: 'libertarian-shield', points: 1 },
          { skillKey: 'multiple-shot', points: 4 },
          { skillKey: 'liberator-book', points: 1 },
          { skillKey: 'palaboom', points: 1 },
          { skillKey: 'buni', points: 1 },
        ],
        inventory: {
          armors: {
            suit: 2,
            'libertarian-armor': 1,
            'leather-jacket': 0,
            'divine-armor': 0,
          },
          weapons: {
            'libertarian-staff-normal': 2,
            'libertarian-staff-gold': 1,
            'libertarian-staff-fire': 0,
            'libertarian-staff-ice': 0,
            'divine-staff': 0,
          },
        },
      };

      agent.setCharacter(character, game);

      // Since the player has the libertarian-armor then it will double the skill points.
      const expectedSkillPoints = {
        'despertar-leones': 2,
        'libertad-avanza': 4,
        'zurdos-tiemblen': 2,
        'milei-porquenotevas': 2,
        'libertarian-shield': 2,
        'multiple-shot': 8,
        'liberator-book': 2,
        palaboom: 2,
        buni: 2,
      };

      const skillPoints: Partial<Record<skillKey, number>> = {};

      agent.skills.forEach(
        (skill) => (skillPoints[skill.skillKey as skillKey] = skill.points),
      );

      expect(skillPoints).toEqual(expectedSkillPoints);
    });
  });
});
