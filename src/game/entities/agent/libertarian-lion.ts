import Agent, { IAgentChild } from '.';
import SkillHealing from '../../skill/skill-healing';
import Vector2D from '../../utils/vector-2d';
import SnakeGun from '../weapon/snake-gun';

export default class LibertarianLion extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'libertarian-lion',
    });

    this.maxHp = 250;
    this.hp = 250;

    this.spawnSoundsKey = ['clone'];

    this.addEntity(
      new SnakeGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(new SkillHealing({ agent: this }, { delay: 5 }));
  }
}
