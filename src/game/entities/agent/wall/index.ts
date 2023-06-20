import Agent, { IAgent } from '..';
import { agentData, agentDataKey } from '../agent-data';

export default class Wall extends Agent {
  constructor(props: IAgent) {
    super(props);
    this.hp = 1;
    this.weight = 3;
    this.givesExp = agentData[this.agent as agentDataKey]?.givesExp || 1;
    this.width = 64;
    this.height = 64;
    this.__speed = 0;

    // NPCs won't aim to walls.
    this.ignoredByNpcs = true;
  }
}
