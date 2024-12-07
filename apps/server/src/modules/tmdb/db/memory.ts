import { Database } from './interface';

export class InMemoryDatabase implements Database {
  private dataStore = [];

  async save(data: any): Promise<void> {
    this.dataStore.push(data);
  }
  async find(query: any): Promise<any> {
    return this.dataStore.filter((item) => item === query);
  }
  async list(): Promise<any> {
    return this.dataStore;
  }
}
