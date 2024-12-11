import { useQuery } from '@tanstack/react-query';
import { POST } from '../libs/axios/handlers';
import { StepperAggregated } from '../context/stepper-context';
import { preparePromptData } from './utils';

export const sendPrompt = async (data: any) => {
  const { type, ...rest } = data;
  const formattedData = preparePromptData(rest);
  const body = {
    content: formattedData,
    type,
  };
  const res = await POST<any>({
    authenticated: false,
    path: 'prompt',
    body,
  });

  return res;
};

/* Hook Itself */
export const usePrompt = (
  formData: StepperAggregated & { type: 'movies' | 'songs' },
) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['prompt_result'],
    queryFn: async () => await sendPrompt(formData),
    enabled: false,
  });

  return {
    refetch,
    data,
    error,
    isLoading,
  };
};
