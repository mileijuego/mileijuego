import Skill from '.';
import { ProjectileGoldenChori } from '../entities/projectile/projectiles';
import Game from '../game';
import { ISkill } from '../interfaces';

export default class SkillGoldenChori extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 12;

    // Initial delay:
    this.__timeToNextRound = 12000;

    this.soundKey = 'crisistina-golden-chori';
  }

  execute(game: Game) {
    game.addTimeout(() => {
      const closestEnemy = game.getClosestEnemyOfAgent(this.agent);

      if (!closestEnemy) {
        return;
      }

      const rotation = this.agent.getRotationTo(
        closestEnemy.position.x,
        closestEnemy.position.y,
      );

      game.addProjectile(
        new ProjectileGoldenChori({
          rotation,
          by: this.agent,
          damage: this.agent.damage,
          position: this.agent.position.clone(),
        }),
      );
    }, 1500);
  }
}
