import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ModelBehaviour } from './assistants/provider';
import { zodResponseFormat } from 'openai/helpers/zod';

import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources';
import { StructuredData } from './schemas';
import { CustomLogger } from '../logger/logger.provider';
import { assistantResponsibleFor } from './assistants/models';
export type CompleteInput = {
  content: any;
  formatter: (content: any) => string;
  recomendationType: string;
};

@Injectable()
class OpenAIProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(
    private assistant: ModelBehaviour,
    private logger: CustomLogger,
  ) {
    this.client = new OpenAI();
    this.model = process.env.MODEL;
  }

  async complete<T>(data: CompleteInput): Promise<T> {
    const messages = await this.formatMessages(data);

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages,
      response_format: zodResponseFormat(
        StructuredData,
        data.recomendationType,
      ),
    });

    const [response] = completion.choices;
    const parsed = JSON.parse(response.message.content);
    this.logger.generatedCompletion(parsed);

    return parsed;
  }

  private formatMessages = async (
    data: CompleteInput,
  ): Promise<ChatCompletionMessageParam[]> => {
    const behaviour = await this.assistant.selectAssistant(
      assistantResponsibleFor[data.recomendationType],
      data.recomendationType,
    );

    // if (!content.includes(recomendationType)) {
    //   throw new BadRequestException(
    //     'Prompt Content must contain the word of the recomendation type',
    //   );
    // }

    const actSystem = {
      role: 'system',
      content: [
        {
          type: 'text',
          text: behaviour.instructions,
        },
      ],
    } as ChatCompletionSystemMessageParam;
    const { content, formatter } = data;

    return [
      actSystem,
      {
        role: 'user',
        content: [{ type: 'text', text: formatter(content) }],
      },
    ];
  };
}

export { OpenAIProvider };
