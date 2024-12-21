import { Injectable } from '@nestjs/common';
import { CompletionsCategories, RecomendationCompletion } from 'src/@types';
import { OpenAIProvider } from 'src/modules/openai/openai.provider';
import { MoviePromptDTO } from './inputs';
import { pickFormatter } from './formaters';

type Input<K> = {
  content: MoviePromptDTO;
  recomendationType: K;
  limit: number;
};
@Injectable()
export class PromptProvider {
  constructor(private LLMProvider: OpenAIProvider) {}

  async respond<K extends keyof CompletionsCategories>({
    content,
    recomendationType,
    limit,
  }: Input<K>): Promise<RecomendationCompletion<K>> {
    const formatter = pickFormatter(recomendationType);

    const completion = await this.LLMProvider.complete<any>({
      content,
      formatter,
      recomendationType,
      limit,
    });

    return {
      completions: { [recomendationType]: completion },
    } as RecomendationCompletion<K>;
  }
}
