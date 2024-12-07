import { useQuery } from '@tanstack/react-query';
import { StreamingService } from '../@types';
import { GET } from '../libs/axios/handlers';

export const getStreaming = async (): Promise<StreamingService[]> => {
  const response = await GET<StreamingService[]>({
    path: 'streaming',
    authenticated: false,
  });

  const { body } = response;
  return body;
};

/* Hook Itself */
export const useStreaming = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['streaming'],
    queryFn: getStreaming,
  });

  return {
    data,
    error,
    isLoading,
  };
};
