import Skill from '.';
import Projectile from '../entities/projectile';
import Game from '../game';
import { ISkill } from '../interfaces';

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

export default class SkillPesos extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 15;

    this.__timeToNextRound = 3000;

    this.soundKey = 'masgloton-espectaculares';
  }

  execute(game: Game) {
    rotations.forEach((rotation) => {
      const projectile = new Projectile({
        by: this.agent,
        damage: this.agent.damage,
        rotation,
        position: this.agent.position.clone(),
      });

      projectile.width = 32;
      projectile.height = 32;
      projectile.spriteData.projectileKey = 'projectile-1000p';
      projectile.spriteData.width = 48;
      projectile.spriteData.height = 32;

      projectile.speed = 4;

      game.addProjectile(projectile);

      game.addToTickerList(() => {
        projectile.rotate(0.01);
        return !game.hasProjectile(projectile);
      });
    });
  }
}
