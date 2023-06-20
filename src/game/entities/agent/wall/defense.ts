import Wall from '.';
import { IAgentChild } from '..';

export default class WallDefense extends Wall {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: 'wall-pot',
    });

    this.maxHp = 5000;
    this.hp = 5000;
    this.width = 56;
    this.height = 56;

    this.spriteData.width = 64;
    this.spriteData.height = 64;
  }
}
