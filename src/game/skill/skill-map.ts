import DespertarLeones from './despertar-leones';
import LibertadAvanza from './libertad-avanza';
import SkillLiberatorBook from './skill-liberator-book';
import SkillLibertarianShield from './skill-libertarian-shield';
import SkillMileiPorquenotevas from './skill-milei-porquenotevas';
import SkillMultipleShot from './skill-multiple-shot';
import SkillPalaboom from './skill-palaboom';
import ZurdosTiemblen from './zurdos-tiemblen';

const skillMap = {
  'despertar-leones': DespertarLeones,
  'libertad-avanza': LibertadAvanza,
  'zurdos-tiemblen': ZurdosTiemblen,
  'libertarian-shield': SkillLibertarianShield,
  'milei-porquenotevas': SkillMileiPorquenotevas,
  'multiple-shot': SkillMultipleShot,
  'liberator-book': SkillLiberatorBook,
  "palaboom": SkillPalaboom
};

export type skillKey = keyof typeof skillMap;

export { skillMap };
