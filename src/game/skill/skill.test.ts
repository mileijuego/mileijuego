import Skill from '.';
import { ALLY_TEAM } from '../constants';
import Milei from '../entities/agent/milei';
import Game from '../game';
import Vector2D from '../utils/vector-2d';

describe('Skill', () => {
  it('should only set points once.', () => {
    const agent = new Milei({ position: new Vector2D(0, 0), team: ALLY_TEAM });
    const skill = new Skill({ agent });
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

    skill.setPoints(3, game);

    expect(() => skill.setPoints(5, game)).toThrowError();
  });
});
