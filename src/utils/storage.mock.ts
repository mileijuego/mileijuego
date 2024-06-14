export class MockStorage {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  async create() {
    return this;
  }

  async get(key: string) {
    return this.store[key] || null;
  }

  async set(key: string, value: string) {
    this.store[key] = value;
  }

  async remove(key: string) {
    delete this.store[key];
  }
}
