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

export default class ChoriCircle extends Skill {
  constructor(props: ISkill) {
    super(props);
    this.__delay = 7;

    this.soundKey = 'chori-circle';
  }

  execute(game: Game) {
    rotations.forEach((rotation, i) => {
      game.addTimeout(() => {
        game.addProjectile(
          game.createProjectile(
            this.agent,
            'projectile-chori',
            rotation,
            this.agent.position.clone(),
          ),
        );
      }, i * 150);
    });
  }
}
