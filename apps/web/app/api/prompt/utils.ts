import { StepperAggregated } from '../../context/stepper-context';

export const preparePromptData = (data: StepperAggregated) => {
  const { mood, genres, streamings } = data;
  const vGenres = genres.map((g) => ({ id: Number(g.id), name: g.label }));
  const vMood = mood.map((m) => ({ id: Number(m.moodId), name: m.label }));
  const vStreamings = streamings.map((s) => s.name);

  return {
    mood: vMood,
    genre: vGenres,
    streaming: vStreamings,
  };
};
