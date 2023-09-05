import Agent, { IAgentChild } from '..';
import Vector2D from '../../../utils/vector-2d';
import LibertarianStaffNormal from '../../weapon/libertarian-staff-normal';

export default class Villarruel extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: "villarruel",
    });

    this.maxHp = 5000;
    this.hp = 5000;
    this.damage = 55;
    this.__speed = 7;
    this.__minSpeed = 1;

    this.setMultipleShot(2);

    this.addEntity(
      new LibertarianStaffNormal({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
