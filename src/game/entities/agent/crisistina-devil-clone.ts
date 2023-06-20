import Agent, { IAgentChild } from '.';
import ChoriCircle from '../../skill/chori-circle';
import SkillTeleportToPlayer from '../../skill/skill-teleport-to-player';
import SkillGoldenChori from '../../skill/skill-golden-chori';
import Vector2D from '../../utils/vector-2d';
import VGun from '../weapon/v-gun';
import ChoriGun from '../weapon/chori-gun';

export default class CrisistinaDevilClone extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'crisistina-devil',
    });

    this.maxHp = 1;
    this.hp = 1;
    this.damage = 48;
    this.__minSpeed = 0.5;
    this.givesExp = 1;

    this.spawnSoundsKey = ['clone'];

    this.addEntity(
      new VGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );

    this.addEntity(
      new ChoriGun({
        position: new Vector2D(this.position.x - 16, this.position.y + 24),
      }),
    );

    this.addSkill(
      new SkillTeleportToPlayer({ agent: this }, 'crisistina-yo-pelotudo'),
    );
    this.addSkill(new ChoriCircle({ agent: this }));
    this.addSkill(new SkillGoldenChori({ agent: this }));
  }
}
