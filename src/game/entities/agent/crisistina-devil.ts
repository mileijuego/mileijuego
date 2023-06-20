import Agent, { IAgentChild } from '.';
import ChoriCircle from '../../skill/chori-circle';
import SkillTeleportToPlayer from '../../skill/skill-teleport-to-player';
import SkillGoldenChori from '../../skill/skill-golden-chori';
import Vector2D from '../../utils/vector-2d';
import VGun from '../weapon/v-gun';
import SkillClone from '../../skill/skill-clone';
import CrisistinaDropMoney from '../../skill/crisistina-drop-money';
import ChoriGun from '../weapon/chori-gun';
import SpawnGoldenFatCampodists from '../../skill/spawn-golden-fat-campodists';

export default class CrisistinaDevil extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'crisistina-devil',
    });

    this.maxHp = 80000;
    this.hp = 80000;
    this.weight = 2;
    this.damage = 48;
    this.__speed = 5;
    this.__minSpeed = 0.5;

    this.spawnSoundsKey = ['crisistina-devil'];

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

    this.addSkill(new SpawnGoldenFatCampodists({ agent: this }));
    this.addSkill(
      new SkillTeleportToPlayer({ agent: this }, 'crisistina-yo-pelotudo'),
    );
    this.addSkill(new ChoriCircle({ agent: this }));
    this.addSkill(new SkillGoldenChori({ agent: this }));
    this.addSkill(new SkillClone({ agent: this }, 'crisistina-devil-clone'));
    this.addSkill(new CrisistinaDropMoney({ agent: this }));
  }
}
