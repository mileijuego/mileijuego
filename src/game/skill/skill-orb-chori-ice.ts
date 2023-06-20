import Skill from '.';
import { ProjectileOrbChoriIce } from '../entities/projectile/projectiles';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class SkillOrbChoriIce extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 10;
    this.__timeToNextRound = 2000;

    this.soundKey = 'derecha-maldita';
  }

  execute(game: Game) {
    const closestEnemy = game.getClosestEnemyOfAgent(this.agent);

    if (!closestEnemy) {
      return;
    }

    const rotation = this.agent.getRotationTo(
      closestEnemy.position.x,
      closestEnemy.position.y,
    );

    game.addProjectile(
      new ProjectileOrbChoriIce({
        rotation,
        by: this.agent,
        damage: this.agent.damage,
        position: this.agent.position.clone(),
      }),
    );
  }
}
