import Skill from '.';
import { Projectile1000p } from '../entities/projectile/projectiles';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class SkillPrintNotes extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 0.33;
  }

  execute(game: Game) {
    const ally = game.getMostWoundedAlly(this.agent);

    if (!ally) {
      return;
    }

    const rotation = this.agent.getRotationTo(
      ally.position.x,
      ally.position.y
    );

    game.addProjectile(
      new Projectile1000p({
        rotation,
        by: this.agent,
        damage: 0,
        position: this.agent.position.clone(),
      })
    );

    game.addInflation(0.5);
  }
}
