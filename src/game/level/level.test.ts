import { MockStorage } from '@src/utils/storage.mock'

jest.mock('@ionic/storage', () => ({
  Storage: MockStorage,
}));

import Game from '../game';
import { ENEMY_TEAM } from '../constants';
import scripts from './scripts';
import { levels } from '../levels';
import { getDefaultUserData } from '../../utils/local-storage';

describe('Level', () => {
  test.skip('Survival test', () => {
    const game = new Game({
      width: 800,
      height: 600,
      levelData: levels['survival'],
    });

    scripts.survival(game, getDefaultUserData().character);

    game.start();
    const player = game.getPlayer();

    // It's the wave 0.
    expect(game.waveNumber).toBe(0);

    // There is no enemies yet.
    game.tick(1000);
    let enemies = game.getAgentsOfTeam(ENEMY_TEAM);
    expect(enemies.length).toBe(0);

    const enemiesNumber = 8;
    for (let i = 0; i < enemiesNumber; i++) {
      game.tick(5000);
    }

    // All the enemies have spawned.
    enemies = game.getAgentsOfTeam(ENEMY_TEAM);
    expect(enemies.length).toBe(8);

    // Kills all the agents.
    enemies.forEach((e) => game.hurtAgent(e, Number.MAX_SAFE_INTEGER, player));

    // The enemies should be defeated and the wave now should be 1.
    game.tick(1000);
    enemies = game.getAgentsOfTeam(ENEMY_TEAM);
    expect(enemies.length).toBe(0);
    expect(game.waveNumber).toBe(1);
  });
});
