import { Injectable } from '@nestjs/common';
import { CompletionsCategories, RecomendationCompletion } from 'src/@types';
import { OpenAIProvider } from 'src/modules/openai/openai.provider';
import { MoviePromptDTO } from './inputs';
import { pickFormatter } from './formaters';

type Input<K> = {
  content: MoviePromptDTO;
  recomendationType: K;
};
@Injectable()
export class PromptProvider {
  constructor(private LLMProvider: OpenAIProvider) {}

  async respond<K extends keyof CompletionsCategories>({
    content,
    recomendationType,
  }: Input<K>): Promise<RecomendationCompletion<K>> {
    const formatter = pickFormatter(recomendationType);

    const completion = await this.LLMProvider.complete<any>({
      content,
      formatter,
      recomendationType,
    });

    return {
      completions: { [recomendationType]: completion },
    } as RecomendationCompletion<K>;
  }
}
