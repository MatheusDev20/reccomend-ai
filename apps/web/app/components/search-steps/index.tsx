'use client';

import { BackArrow } from '@/app/icons/back-arrow';
import { NextArrow } from '@/app/icons/next-arrow';
import { useState } from 'react';
import { FirstStep } from './first-step';
import { SecondStep } from './gender-step';
import { ThirdsStep } from './preferences-step';
import { SearchIcon } from '@/app/icons/search';
import { Button } from '@repo/ui/button';

const TOTAL_STEPS = 3;
type Props = {};

export const SearchSteps = ({}: Props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getStep = (step: number) => {
    switch (step) {
      case 1:
        return <FirstStep />;

      case 2:
        return <SecondStep />;

      case 3:
        return <ThirdsStep />;

      default:
        return <FirstStep />;
    }
  };

  return (
    <div className="debug flex flex-col p-3 gap-4 max-w-full">
      <Button />
      {getStep(currentStep)}
      <footer className="flex debug flex-col md:flex-row gap-6 items-center justify-center w-full">
        {currentStep !== 1 && (
          <button
            onClick={handlePreviousStep}
            className="mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-48 h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md"
          >
            Anterior
            <BackArrow tClass="text-white h-4 w-4" />
          </button>
        )}

        {currentStep !== TOTAL_STEPS ? (
          <button
            onClick={handleNextStep}
            className="mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-56 h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md"
          >
            Gerar Recomendações
            <SearchIcon tClass="text-white h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="mt-3 w-[100%] p-4 hover:bg-[#7C73FF] hover:scale-105 delay-150 ease-in-out transition md:p-0 md:w-48 h-10 bg-primary text-white items-center flex justify-center gap-3 rounded-md font-semibold text-sm md:text-md"
          >
            Proximo
            <NextArrow tClass="text-white h-4 w-4" />
          </button>
        )}
      </footer>
    </div>
  );
};
