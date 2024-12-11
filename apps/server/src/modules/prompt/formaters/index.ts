import { format } from './message-movie';

export const pickFormatter = (
  recomendationType: string,
): ((content: any) => string) => {
  switch (recomendationType) {
    case 'movies':
      return format;

    default:
      throw new Error('Formatter not found');
  }
};
