import { Injectable } from '@nestjs/common';
import { Database } from './interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Streaming } from '../entities/streaming.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresImplementation implements Database {
  constructor(
    @InjectRepository(Streaming) private repository: Repository<Streaming>,
  ) {}
  async save(data: any): Promise<any> {
    const newStreaming = {
      ...data,
      active: true,
    };
    await this.repository.save(newStreaming);
  }

  async list(): Promise<any> {
    return this.repository.find({ where: { active: true } });
  }
}
