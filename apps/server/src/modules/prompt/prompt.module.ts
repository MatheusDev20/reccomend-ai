import { Module } from '@nestjs/common';
import { OpenAIModule } from '../openai/openai.module';
import { PromptProvider } from './prompt.provider';
import { PromptController } from './prompt.controller';
import { TMDBModule } from '../tmdb/tmdb.module';

@Module({
  imports: [OpenAIModule, TMDBModule],
  providers: [PromptProvider],
  controllers: [PromptController],
  exports: [PromptProvider],
})
export class PromptModule {}
