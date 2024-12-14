import { useQuery } from '@tanstack/react-query';

export const getStreamings = async (): Promise<any> => {
  const response = await fetch('/api/streaming');
  const { body } = await response.json();
  return body;
};

/* Hook Itself */
export const useStreaming = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['streaming'],
    queryFn: getStreamings,
  });

  return {
    data,
    error,
    isLoading,
  };
};
