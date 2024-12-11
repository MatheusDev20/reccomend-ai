import { MoviePromptDTO } from '../inputs';

export const format = (content: MoviePromptDTO): string => {
  const base =
    'I need recommendations for movies. I will input for you at most 3 genres, 3 moods, and some streaming services that I have access to, and you will return a message with the recommendations.\n';

  const { genre, mood } = content;
  const genres = genre.map((g) => g.name).join(', ');
  const moods = mood.map((m) => m.name).join(', ');

  const formattedMessage = base + `Genres: ${genres}\n` + `Moods: ${moods}\n`;

  return formattedMessage;
};
