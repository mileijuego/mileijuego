import Skill from '.';
import Agent from '../entities/agent';
import WallAlien from '../entities/agent/wall/wall-alien';
import WallAlien2 from '../entities/agent/wall/wall-alien2';
import WallAlien3 from '../entities/agent/wall/wall-alien3';
import WallAlien4 from '../entities/agent/wall/wall-alien4';
import Game from '../game';
import { ISkill } from '../interfaces';
export default class SkillAlienWalls extends Skill {
  private __walls: Agent[] = [];

  constructor(props: ISkill) {
    super(props);
    this.__delay = 24;
    this.__timeToNextRound = 3000;

    this.soundKey = 'pelado';
  }

  execute(game: Game) {
    // Removes the old walls
    this.__walls.forEach((w) => (w.hp = 0));

    const offSetX = 512;
    const offSetY = 512;

    this.__walls = [
      new WallAlien({
        team: this.agent.team,
        position: this.agent.position.clone(0, -offSetY),
      }),
      new WallAlien2({
        team: this.agent.team,
        position: this.agent.position.clone(-offSetX, 0),
      }),
      new WallAlien3({
        team: this.agent.team,
        position: this.agent.position.clone(0, offSetY),
      }),
      new WallAlien4({
        team: this.agent.team,
        position: this.agent.position.clone(offSetX, 0),
      }),
    ];

    this.__walls.forEach((w) => game.addAgent(w));
  }
}
