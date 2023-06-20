import Agent, { IAgentChild } from '..';
import BalloonCircle from '../../../skill/balloon-circle';
import CentralBankLarrataPots from '../../../skill/central-bank-larrata-pots';
import SkillShield from '../../../skill/skill-shield';
import SkillSpawnLarrataHeads from '../../../skill/skill-spawn-larrata-heads';
import Vector2D from '../../../utils/vector-2d';
import BalloonGun from '../../weapon/balloon-gun';
import TileGun from '../../weapon/tile-gun';

export default class CentralBankLarrata extends Agent {
  constructor(props: IAgentChild) {
    super({ ...props, agent: 'central-bank-larrata' });

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

    this.spawnSoundsKey = ['dialogo-consenso'];

    this.addEntity(
      new TileGun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addEntity(
      new BalloonGun({
        position: new Vector2D(this.position.x - 32, this.position.y + 48),
      }),
    );

    this.addSkill(new BalloonCircle({ agent: this }));
    this.addSkill(new CentralBankLarrataPots({ agent: this }));
    this.addSkill(new SkillSpawnLarrataHeads({ agent: this }));
    this.addSkill(
      new SkillShield(
        { agent: this },
        { shieldKey: 'shield-projectile-blocker', delay: 10, duration: 2 },
      ),
    );
  }
}
