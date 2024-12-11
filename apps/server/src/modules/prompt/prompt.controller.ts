import { Body, Controller, Post } from '@nestjs/common';
import { PromptInputDTO } from './inputs';
import { PromptProvider } from './prompt.provider';
import { ok } from 'src/shared/http/common-responses';
import { CompletionsCategories, RecomendationCompletion } from 'src/@types';
import { TMDBProvider } from '../tmdb/providers/tmdb.provider';

@Controller('prompt')
export class PromptController {
  constructor(
    private completetionProvider: PromptProvider,
    private TMDBProvider: TMDBProvider,
  ) {}

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
