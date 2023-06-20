import Agent, { IAgentChild } from '..';
import SkillTeleportToPlayer from '../../../skill/skill-teleport-to-player';
import Vector2D from '../../../utils/vector-2d';
import GnocchiGun from '../../weapon/gnocchi-gun';

export default class Expert extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'expert',
    });

    this.maxHp = 10000;
    this.hp = 10000;
    this.weight = 2;
    this.damage = 32;
    this.__speed = 2;

    this.spawnSoundsKey = ['expert-genero'];

    this.addEntity(
      new GnocchiGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addSkill(
      new SkillTeleportToPlayer({ agent: this }, 'expert-yatelodije'),
    );
  }
}
