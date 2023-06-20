import Agent, { IAgentChild } from '.';
import SkillSpawnAgents from '../../skill/skill-spawn-agents';
import Vector2D from '../../utils/vector-2d';
import GnocchiGun from '../weapon/gnocchi-gun';
import GreenHeartGun from '../weapon/green-heart-gun';

export default class Alberso extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'alberso',
    });

    this.maxHp = 5000;
    this.hp = 5000;
    this.weight = 2;
    this.damage = 16;
    this.__minSpeed = 0.5;

    this.spawnSoundsKey = ['derecha-maldita'];

    this.addEntity(
      new GnocchiGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addEntity(
      new GreenHeartGun({
        position: new Vector2D(this.position.x - 16, this.position.y + 24),
      }),
    );

    this.addSkill(
      new SkillSpawnAgents(
        { agent: this },
        { delay: 18, soundKey: 'fin-al-patriarcado', agentKey: 'ofe' },
      ),
    );
  }
}
