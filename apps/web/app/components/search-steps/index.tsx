'use client';

import { useState } from 'react';
import { FirstStep, Mood } from './first-step';
import { SecondStep } from './gender-step';
import { ThirdsStep } from './preferences-step';
import { STEPS } from '@/app/utils/constants';
import clsx from 'clsx';
import { NavigationsButtons } from './navigations-buttons';
import { useStepperForm } from '@/app/context/stepper-context';

const TOTAL_STEPS = 3;
type Props = {};

export const SearchSteps = ({}: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data } = useStepperForm();

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
          validationEval: () => false,
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

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex items-start pt-0 pb-0 pl-12 pr-12 justify-between">
        {/* Stepper */}
        <div className="h-full pl-6 pr-6">
          <ul className="steps steps-vertical">
            {STEPS.map((step) => {
              return (
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
              );
            })}
          </ul>
        </div>

        {/* Content Area with Min Height */}
        <div className="justify-center flex-col flex-1 pl-6 pr-6 flex items-center">
          {component}
          <NavigationsButtons
            currentStep={currentStep}
            prev={handlePreviousStep}
            // Disable always eval to true if validationEval eval to false (Step do not met conditions )
            disableNext={!validationEval(data.mood)}
            disablePrev={false}
            next={handleNextStep}
            totalSteps={TOTAL_STEPS}
          />
        </div>
      </div>
    </div>
  );
};
