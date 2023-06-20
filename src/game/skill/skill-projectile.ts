import Skill from '.';
import { projectileKey } from '../entities/projectile/projectiles-map';
import Game from '../game';
import { ISkill } from '../interfaces';
import { soundKey } from '../sounds';

interface ISkillProjectile {
  delay: number;
  initialDelay?: number;
  projectileKey: projectileKey;
  soundKey?: soundKey;
}

export default class SkillProjectile extends Skill {
  private __projectileKey: projectileKey;

  constructor(
    props: ISkill,
    { delay, initialDelay = 0, projectileKey, soundKey }: ISkillProjectile,
  ) {
    super(props);
    this.__delay = delay;
    this.__timeToNextRound = initialDelay * 1000;
    this.__projectileKey = projectileKey;

    if (soundKey) {
      this.soundKey = soundKey;
    }
  }

  execute(game: Game) {
    const enemy = game.getClosestEnemyOfAgent(this.agent);

    if (!enemy) {
      return;
    }

    const rotation = this.agent.getRotationTo(
      enemy.position.x,
      enemy.position.y,
    );

    game.addProjectile(
      game.createProjectile(
        this.agent,
        this.__projectileKey,
        rotation,
        this.agent.position.clone(),
      ),
    );
  }
}
