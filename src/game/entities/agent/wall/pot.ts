import Wall from '.';
import { IAgentChild } from '..';

export default class WallPot extends Wall {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'wall-pot',
    });

    this.maxHp = 200;
    this.hp = 200;
    this.width = 56;
    this.height = 56;

    this.spriteData.width = 64;
    this.spriteData.height = 64;
  }
}
