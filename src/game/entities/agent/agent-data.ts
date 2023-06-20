import agentDataJson from './agent-data.json';

const agentData = agentDataJson;

export type agentDataKey = keyof typeof agentData;

export { agentData };
