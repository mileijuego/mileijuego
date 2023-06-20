import Skill from '.';
import projectilesMap, {
  projectileKey,
} from '../entities/projectile/projectiles-map';
import Game from '../game';
import { ISkill } from '../interfaces';
import { soundKey } from '../sounds';

const rotations = [
  0, // 0 degrees
  Math.PI / 8, // 22.5 degrees
  Math.PI / 4, // 45 degrees
  (Math.PI / 8) * 3, // 67.5 degrees
  Math.PI / 2, // 90 degrees
  (Math.PI / 8) * 5, // 112.5 degrees
  (Math.PI / 4) * 3, // 135 degrees
  (Math.PI / 8) * 7, // 157.5 degrees
  Math.PI, // 180 degrees
  (Math.PI / 8) * 9, // 202.5 degrees
  (Math.PI / 4) * 5, // 225 degrees
  (Math.PI / 8) * 11, // 247.5 degrees
  (Math.PI / 2) * 3, // 270 degrees
  (Math.PI / 8) * 13, // 292.5 degrees
  (Math.PI / 4) * 7, // 315 degrees
  (Math.PI / 8) * 15, // 337.5 degrees
];

export default class SkillMagicCircleProjectiles2 extends Skill {
  private __projectileKey: projectileKey;

  constructor(
    props: ISkill,
    _: any,
    soundKey: soundKey,
    projectileKey: projectileKey,
  ) {
    super(props);
    this.__delay = 15;

    this.__timeToNextRound = 3000;

    this.__projectileKey = projectileKey;
    this.soundKey = soundKey;
  }

  execute(game: Game) {
    rotations.forEach((rotation) => {
      const projectile = new projectilesMap[this.__projectileKey]({
        by: this.agent,
        damage: this.agent.damage,
        rotation,
        position: this.agent.position.clone(),
      });

      game.addProjectile(projectile);

      game.addToTickerList(() => {
        projectile.rotate(0.01);
        return !game.hasProjectile(projectile);
      });
    });
  }
}
