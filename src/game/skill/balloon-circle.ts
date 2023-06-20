import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import { rotationToPoint } from '../utils';

const rotations = [
  rotationToPoint(0, 0, 0, 1), // Top
  rotationToPoint(1, 0, 0, 1), // Top - Right
  rotationToPoint(1, 0, 0, 0), // Right
  rotationToPoint(1, 0, 0, -1), // Bottom - Right
  rotationToPoint(0, 1, 0, 0), // Bottom
  rotationToPoint(0, 0, 1, -1), // Bottom - Left
  rotationToPoint(0, 0, 1, 0), // Left
  rotationToPoint(0, 0, 1, 1), // Top - Left
];

export default class BalloonCircle extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 8;

    this.soundKey = 'haha';
  }

  execute(game: Game) {
    rotations.forEach((rotation) => {
      game.addProjectile(
        game.createProjectile(
          this.agent,
          'projectile-balloon',
          rotation,
          this.agent.position.clone(),
        ),
      );
    });
  }
}
