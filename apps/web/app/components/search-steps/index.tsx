'use client';

import { useState } from 'react';
import { FirstStep, Mood } from './first-step';
import { SecondStep } from './gender-step';
import { ThirdsStep } from './streaming-step';
import { STEPS, TOTAL_STEPS } from '@/app/utils/constants';
import clsx from 'clsx';
import { NavigationsButtons } from './navigations-buttons';
import { useStepperForm } from '@/app/context/stepper-context';
import { Genre } from '@/app/@types';
import { usePrompt } from '@/app/api/prompt/query';

type Props = {
  search: () => void,
};

export const SearchSteps = ({ search }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const { data } = useStepperForm();
  const prompAction = usePrompt({ ...data, type: 'movies' });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getStep = (
    step: number,
  ): { component: React.ReactNode, validationEval: any } => {
    switch (step) {
      case 1:
        return {
          component: <FirstStep />,
          // Eval to false if the constraint do not met
          validationEval: (moods: Mood[]) => moods.length !== 0,
        };

      case 2:
        return {
          component: <SecondStep />,
          validationEval: (genres: Genre[]) => genres.length !== 0,
        };

      case 3:
        return {
          component: <ThirdsStep />,
          validationEval: () => false,
        };

      default:
        return {
          component: <FirstStep />,
          validationEval: () => false,
        };
    }
  };

  const { component, validationEval } = getStep(currentStep);

  const genericValidator = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return validationEval(data.mood);
      case 2:
        return validationEval(data.genres);
      case 3:
        return true;
    }
  };

  return (
    <>
      {/* Searching Overlay */}
      {prompAction.isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col gap-4 lg:pl-24 lg:pr-14">
        {/* Stepper Section */}
        <div className="flex flex-col md:flex-row gap-6 pt-6 md:pt-0 pb-0 justify-between">
          <div className="h-full w-full pl-6 pr-6 self-center">
            <ul className="steps w-full steps-horizontal p-3 pt-4 pb-4">
              {STEPS.map((step) => (
                <li
                  key={step.label}
                  data-content={step.icon}
                  className={clsx(
                    'step',
                    {
                      'step-primary':
                        step.id < currentStep || step.id === currentStep,
                    },
                    { 'step-done': step.id < currentStep },
                  )}
                >
                  <p>{step.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center">
          {component}
          <NavigationsButtons
            currentStep={currentStep}
            prev={handlePreviousStep}
            disableNext={!genericValidator(currentStep)}
            disablePrev={false}
            next={handleNextStep}
            totalSteps={TOTAL_STEPS}
            search={search}
          />
        </div>
      </div>
    </>
  );
};
