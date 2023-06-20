import charSkillsJson from './char-skills.json';

interface CharSkill {
  keyCode?: number;
  minLevel?: number;
  maxPoints?: number;
}

const charSkills = charSkillsJson as { [key: string]: CharSkill };

export { charSkills };
