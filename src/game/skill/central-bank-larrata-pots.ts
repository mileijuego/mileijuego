import Skill from '.';
import CentralBankPot from '../entities/agent/wall/central-bank-pot';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class CentralBankLarrataPots extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 16;

    this.soundKey = 'pelado';
  }

  execute(game: Game) {
    const closestEnemy = game.getClosestEnemyOfAgent(this.agent);

    if (!closestEnemy) return;

    const offSetX = 64;
    const offSetY = 96;

    // Right
    game.addAgent(
      new CentralBankPot({
        team: this.agent.team,
        position: closestEnemy.position.clone(offSetX, 0),
      }),
    );

    // Left
    game.addAgent(
      new CentralBankPot({
        team: this.agent.team,
        position: closestEnemy.position.clone(-offSetX, 0),
      }),
    );

    // Bottom
    game.addAgent(
      new CentralBankPot({
        team: this.agent.team,
        position: closestEnemy.position.clone(0, offSetY),
      }),
    );

    // Top
    game.addAgent(
      new CentralBankPot({
        team: this.agent.team,
        position: closestEnemy.position.clone(0, -offSetY),
      }),
    );
  }
}
