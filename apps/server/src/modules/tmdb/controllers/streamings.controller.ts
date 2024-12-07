import { Body, Controller, Get, Post } from '@nestjs/common';
import { created, ok } from 'src/shared/http/common-responses';
import { PostStreamingDTO } from '../inputs';
import { StreamingProvider } from '../providers/streamings.provider';

@Controller('/streaming')
export class StreamingsController {
  constructor(private provider: StreamingProvider) {}
  @Post()
  async post(@Body() data: PostStreamingDTO) {
    await this.provider.create(data);
    return created(data);
  }

  @Get()
  async get() {
    const data = await this.provider.list();
    return ok(data);
  }
}
