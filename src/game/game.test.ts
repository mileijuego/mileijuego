import { MockStorage } from '@src/utils/storage.mock'

jest.mock('@ionic/storage', () => ({
  Storage: MockStorage,
}));

import Milei from './entities/agent/milei';
import Pibi from './entities/agent/pibi';
import { ItemMoney } from './entities/item/items';
import Game from './game';
import { levels } from './levels';
import Vector2D from './utils/vector-2d';

describe('Game suite', () => {
  describe('hurtAgent && healAgent', () => {
    it('Case 1', () => {
      const game = new Game({
        width: 800,
        height: 600,
        levelData: levels['alberso'],
      });

      const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });

      game.addAgent(agent);
      game.hurtAgent(agent, 50); // Necessary

      const currentAgentHp = agent.hp;
      game.healAgent(agent, 10);

      expect(agent.hp).toBe(currentAgentHp + 10);
    });

    it('Agents cannot get less than 0 hp', () => {
      const game = new Game({
        width: 800,
        height: 600,
        levelData: levels['alberso'],
      });

      const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });
      agent.hp = 50;

      game.addAgent(agent);
      game.hurtAgent(agent, 100);

      expect(agent.hp).toBe(0);
    });

    it('Agents cannot get more hp than his max hp', () => {
      const game = new Game({
        width: 800,
        height: 600,
        levelData: levels['alberso'],
      });

      const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });
      agent.hp = 50;
      agent.maxHp = 75;

      game.addAgent(agent);
      game.healAgent(agent, 100);

      expect(agent.hp).toBe(75);
    });

    it('Enemy will earn the correclty damage done', () => {
      const game = new Game({
        width: 800,
        height: 600,
        levelData: levels['alberso'],
      });

      const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });
      agent.hp = 50;

      const enemy = new Pibi({ team: 2, position: new Vector2D(0, 0) });

      game.addAgent(agent);
      game.hurtAgent(agent, 100, enemy);

      // His damage done property must be 50, not 100 like his damage because his target had only 50 hp
      expect(enemy.damageDone).toBe(50);
    });

    describe('Burning', () => {
      it('should receive a burning damage in a game tick', () => {
        const game = new Game({
          width: 800,
          height: 600,
          levelData: levels['alberso'],
        });

        const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });
        agent.hp = 100;

        game.addAgent(agent);

        agent.addModifier(game, {
          type: 'burning',
          value: 50, // 50 damage per second.
          duration: 3,
        });

        game.tick(500);
        expect(agent.hp).toBe(75); // After a half second the agent should have 75hp.

        game.tick(1000);
        expect(agent.hp).toBe(25); // Then after a second the agent should have 25hp.
      });

      it('burning can be stacked.', () => {
        const game = new Game({
          width: 800,
          height: 600,
          levelData: levels['alberso'],
        });

        const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });
        agent.hp = 100;

        game.addAgent(agent);

        agent.addModifier(game, {
          type: 'burning',
          value: 50, // 50 damage per second.
          duration: 3,
        });
        agent.addModifier(game, {
          type: 'burning',
          value: 100, // 100 damage per second.
          duration: 3,
        });

        game.tick(500);
        // After a half second the agent should have 25hp (25 + 50 damage).
        expect(agent.hp).toBe(25);
      });
    });
  });

  describe('Items', () => {
    describe('addItem && removeItem', () => {
      test('Case 1', () => {
        const game = new Game({
          width: 800,
          height: 600,
          levelData: levels['alberso'],
        });

        expect(game.items.length).toBe(0);

        const item = new ItemMoney({
          team: 1,
          position: new Vector2D(200, 200),
        });

        game.addItem(item);

        expect(game.items.length).toBe(1);

        game.removeItem(item);

        expect(game.items.length).toBe(0);
      });
    });

    describe('ItemMoney', () => {
      test('ItemMoney should not heal more than agent max hp', () => {
        const game = new Game({
          width: 800,
          height: 600,
          levelData: levels['alberso'],
        });

        const agent = new Milei({ team: 1, position: new Vector2D(0, 0) });

        game.addAgent(agent);
        game.hurtAgent(agent, 55);

        expect(agent.hp).toBe(agent.maxHp - 55);

        const item = new ItemMoney({
          team: 1,
          position: new Vector2D(200, 200),
        });

        game.addItem(item);
        game.collectItem(agent, item);

        expect(agent.hp).toBe(agent.maxHp);
      });
    });
  });
});
