import { useStepperForm } from '@/app/context/stepper-context';
import { BackArrow } from '@/app/icons/back-arrow';
import { NextArrow } from '@/app/icons/next-arrow';
import { SearchIcon } from '@/app/icons/search';
import clsx from 'clsx';

type Props = {
  prev: () => void,
  next: () => void,
  disableNext: any,
  disablePrev: any,
  currentStep: number,
  totalSteps: number,
  setSearching: (b: boolean) => void,
};

export const NavigationsButtons = ({
  currentStep,
  prev,
  next,
  disableNext,
  totalSteps,
  setSearching,
}: Props) => {
  const { data } = useStepperForm();
  const handleSearch = () => {
    setSearching(true);
    console.log(data);
  };
  return (
    <footer
      className={clsx(
        'flex mt-6 flex-col md:flex-row gap-6 items-center w-full',
        currentStep !== 3 ? 'justify-center' : 'justify-center pl-0 md:pl-60',
      )}
      // className="flex mt-6 debug flex-col md:flex-row gap-6 items-center justify-center w-full"
    >
      {/* Previous Button */}
      {currentStep !== 1 && (
        <button
          onClick={prev}
          className="self-center mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-48 h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md"
        >
          Anterior
          <BackArrow tClass="text-white h-4 w-4" />
        </button>
      )}

      {/* Next or Submit Button */}
      {currentStep === totalSteps ? (
        <button
          onClick={handleSearch}
          className="mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-56 h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md"
        >
          Gerar Recomendações
          <SearchIcon tClass="text-white h-4 w-4" />
        </button>
      ) : (
        <button
          disabled={disableNext}
          onClick={next}
          className={clsx(
            'mt-3 w-[100%] p-4 md:p-0 md:w-48 h-10 items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md transition ease-in-out delay-150',
            disableNext
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-[#7C73FF] hover:scale-105',
          )}
        >
          Proximo
          <NextArrow tClass="text-white h-4 w-4" />
        </button>
      )}
    </footer>
  );
};
