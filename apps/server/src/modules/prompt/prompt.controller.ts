import { Body, Controller, Post } from '@nestjs/common';
import { PromptInputDTO } from './inputs';
import { PromptProvider } from './prompt.provider';
import { ok } from 'src/shared/http/common-responses';
import { CompletionsCategories } from 'src/@types';
import { TMDBProvider } from '../tmdb/providers/tmdb.provider';
import { Throttle } from '@nestjs/throttler';

@Controller('prompt')
export class PromptController {
  constructor(
    private completetionProvider: PromptProvider,
    private TMDBProvider: TMDBProvider,
  ) {}

  @Throttle({ default: { limit: 10, ttl: 86_400_000 } })
  @Post()
  async handleCompletion(@Body() data: PromptInputDTO) {
    const { content, type } = data;

    const completionType = type as keyof CompletionsCategories;

    const generatedData = await this.completetionProvider.respond<
      keyof CompletionsCategories
    >({
      content,
      recomendationType: completionType,
    });

    const { completions } = generatedData;

    // TODO: See
    const promises = completions[type]['recomendations'].map((recomendation) =>
      this.TMDBProvider.getMovieDetails({
        movieName: recomendation.movieName,
      }),
    );

    const response = await Promise.all(promises);
    return ok(response);
  }
}
