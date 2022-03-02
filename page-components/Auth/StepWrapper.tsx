import React, { ReactNode } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import {
  Button,
  EButtonRounded,
  EButtonSizes,
  EButtonTypes,
} from '@components/Button'

type TStepWrapperProps = {
  step: number
  lastStep?: boolean
  children: ReactNode
  currentStep: number
  setCurrentStep: (index: number) => void
}

const StepWrapper = ({
  step,
  lastStep,
  children,
  setCurrentStep,
}: TStepWrapperProps) => {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-start justify-center md:w-2/3 xl:w-1/2">
      <div className="w-full pb-4">{children}</div>
      {lastStep ? (
        <Button
          type={EButtonTypes.SUBMIT}
          size={EButtonSizes.MEDIUM}
          rounded={EButtonRounded.EXTRA_SMALL}
        >
          Submit
        </Button>
      ) : (
        <Button
          size={EButtonSizes.MEDIUM}
          rounded={EButtonRounded.EXTRA_SMALL}
          onClick={() => setCurrentStep(step + 1)}
          onPressEnter={() => setCurrentStep(step + 1)}
        >
          Next
          <CheckIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

export default StepWrapper
