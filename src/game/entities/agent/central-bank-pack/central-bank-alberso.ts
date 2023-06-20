import Agent, { IAgentChild } from '..';
import SkillOrbChoriIce from '../../../skill/skill-orb-chori-ice';
import SkillShield from '../../../skill/skill-shield';
import SkillSpawnAgents from '../../../skill/skill-spawn-agents';
import Vector2D from '../../../utils/vector-2d';
import GnocchiGun from '../../weapon/gnocchi-gun';
import GreenHeartGun from '../../weapon/green-heart-gun';

export default class CentralBankAlberso extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'central-bank-alberso',
    });

    this.maxHp = 100000;
    this.hp = 100000;
    this.weight = 4;
    this.damage = 48;
    this.__speed = 3;
    this.__minSpeed = 0.5;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = ['derecha-maldita'];

    this.addEntity(
      new GnocchiGun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addEntity(
      new GreenHeartGun({
        position: new Vector2D(this.position.x - 32, this.position.y + 48),
      }),
    );

    this.addSkill(
      new SkillSpawnAgents(
        { agent: this },
        { delay: 18, soundKey: 'fin-al-patriarcado', agentKey: 'ofe' },
      ),
    );

    this.addSkill(new SkillOrbChoriIce({ agent: this }));
    this.addSkill(
      new SkillShield(
        { agent: this },
        { shieldKey: 'shield-projectile-reflector', delay: 10, duration: 2 },
      ),
    );
  }
}
