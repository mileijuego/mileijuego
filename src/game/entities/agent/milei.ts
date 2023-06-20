import { IAgentChild } from '.';
import { BASE_HP } from '../../constants';
import AgentCharacter from './agent-character';

export default class Milei extends AgentCharacter {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'milei',
    });

    this.maxHp = BASE_HP;
    this.hp = BASE_HP;
    this.__speed = 5;
    this.__minSpeed = 1;

    this.spawnSoundsKey = [
      'milei-viva-la-libertad',
      'milei-zurdos-dem',
      'milei-super-libertarian',
    ];
  }
}
