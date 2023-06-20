import Skill from '.';
import { PLAYER_ID } from '../constants';
import { IModifier } from '../entities/targetable-entity';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class SkillTeleportToPlayer extends Skill {
  constructor(props: ISkill, soundKey: string) {
    super(props);
    this.__delay = 12;

    // Initial delay:
    this.__timeToNextRound = 4000;

    this.soundKey = soundKey;
  }

  execute(game: Game) {
    const player = game.getAgentByUuid(PLAYER_ID);

    if (!player) {
      // If there is no player, the skill will do nothing
      return;
    }

    // The agent will teleport to the right, left, up or down of the player
    const margin = 1;
    const posRand = Math.random();
    let coords;
    if (posRand < 0.25) {
      // Right
      coords = {
        x: player.width / 2 + this.agent.width / 2 + margin,
        y: 0,
      };
    } else if (posRand < 0.5) {
      // Left
      coords = {
        x: -player.width / 2 - this.agent.width / 2 - margin,
        y: 0,
      };
    } else if (posRand < 0.75) {
      // Down
      coords = {
        x: 0,
        y: player.height / 2 + this.agent.height / 2 + margin,
      };
    } else {
      // Up
      coords = {
        x: 0,
        y: -player.height / 2 - this.agent.height / 2 - margin,
      };
    }

    // Teleports to the player
    this.agent.moveTo(player.position.clone(coords.x, coords.y));

    // Also, the agent will move fast for a few seconds
    const modifier: IModifier = {
      type: 'speed',
      value: 4,
      duration: 3,
    };
    this.agent.addModifier(game, modifier);
  }
}
