import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../db/interface';
import { PostStreamingDTO } from '../inputs';

@Injectable()
export class StreamingProvider {
  constructor(@Inject('Database') private database: Database) {}

  async create(data: PostStreamingDTO) {
    await this.database.save(data);
  }

  async list() {
    return this.database.list();
  }
}
