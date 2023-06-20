import Skill from '.';
import Game from '../game';
import { ISkill } from '../interfaces';
import shieldsMap, { shieldKey } from '../shield/shields-map';
import { soundKey } from '../sounds';

export interface ShieldProps {
  shieldKey: shieldKey;
  soundKey?: soundKey;
  delay?: number;
  initialDelay?: number;
  duration?: number;
}

export default class SkillShield extends Skill {
  private __shieldKey: shieldKey;
  private __duration: number;

  constructor(
    props: ISkill,
    {
      shieldKey,
      soundKey,
      delay = 12,
      initialDelay = 0,
      duration = 2,
    }: ShieldProps,
  ) {
    super(props);
    this.__delay = delay;
    this.__timeToNextRound = initialDelay * 1000;
    this.__duration = duration;
    this.__shieldKey = shieldKey;
    this.soundKey = soundKey;
  }

  execute(game: Game) {
    game.addShieldToAgent(
      this.agent,
      new shieldsMap[this.__shieldKey]({
        agent: this.agent,
        duration: this.__duration,
      }),
    );
  }
}
