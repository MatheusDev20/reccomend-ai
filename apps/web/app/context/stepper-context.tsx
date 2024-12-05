import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Mood } from '../components/search-steps/first-step';
import { Genre } from '../@types';

type StepperAggregated = {
  mood: Mood[],
  genres: Genre[],
};

type ContextProps = {
  data: StepperAggregated,
  setData: Dispatch<SetStateAction<StepperAggregated>>,
};

const StepperContext = createContext<ContextProps | null>(null);

const { Provider } = StepperContext;

const StepperDataProvider = ({ children }: any) => {
  const [data, setData] = useState<StepperAggregated>({
    mood: [],
    genres: [],
  });

  const contextValue = useMemo(
    () => ({
      data,
      setData,
    }),
    [data, setData],
  );

  return (
    <Provider
      value={{ data: contextValue.data, setData: contextValue.setData }}
    >
      {children}
    </Provider>
  );
};

const useStepperForm = (): ContextProps => {
  const context = useContext(StepperContext);
  if (context == null) {
    throw new Error('useStepperForm must be used within a provider');
  }
  return context;
};

export { StepperDataProvider, useStepperForm };
