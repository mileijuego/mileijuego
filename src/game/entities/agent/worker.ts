import Agent, { IAgentChild } from '.';
import { getRandomFromArray } from '../../utils';
import Vector2D from '../../utils/vector-2d';
import WorkerGun from '../weapon/worker-gun';

export default class AgentWorker extends Agent {
  constructor(props: IAgentChild) {
    super({
      ...props,
      agent: getRandomFromArray(['worker-man', 'worker-woman']),
    });

    this.maxHp = 400;
    this.hp = 400;
    this.damage = 55;

    this.addEntity(
      new WorkerGun({
        position: new Vector2D(this.position.x + 16, this.position.y + 24),
      }),
    );
  }
}
