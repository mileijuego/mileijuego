import Agent, { IAgentChild } from '..';
import ChoriCircle from '../../../skill/chori-circle';
import SkillTeleportToPlayer from '../../../skill/skill-teleport-to-player';
import SkillGoldenChori from '../../../skill/skill-golden-chori';
import Vector2D from '../../../utils/vector-2d';
import VGun from '../../weapon/v-gun';
import SkillClone from '../../../skill/skill-clone';
import CrisistinaDropMoney from '../../../skill/crisistina-drop-money';
import ChoriGun from '../../weapon/chori-gun';
import SpawnGoldenFatCampodists from '../../../skill/spawn-golden-fat-campodists';
import SkillShield from '../../../skill/skill-shield';

export default class CentralBankCrisistinaDevil extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'central-bank-crisistina-devil',
    });

    this.maxHp = 160000;
    this.hp = 160000;
    this.weight = 4;
    this.damage = 72;
    this.__speed = 5;
    this.__minSpeed = 0.5;

    // Size
    this.width = 96;
    this.height = 192;
    this.spriteData.width = 128;
    this.spriteData.height = 256;

    this.spawnSoundsKey = ['crisistina-devil'];

    this.addEntity(
      new VGun({
        position: new Vector2D(this.position.x + 32, this.position.y + 48),
      }),
    );

    this.addEntity(
      new ChoriGun({
        position: new Vector2D(this.position.x - 32, this.position.y + 48),
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
    this.addSkill(
      new SkillShield(
        { agent: this },
        { shieldKey: 'shield-projectile-healer', delay: 10, duration: 2 },
      ),
    );
  }
}
