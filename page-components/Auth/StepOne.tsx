import { EInputTypes, EInputVariants, Input } from '@components/Input'
import { TitleQuestion } from '@components/Title'
import React from 'react'
import StepWrapper from './StepWrapper'

type TStepProps = {
  step: number
  currentStep: number
  setCurrentStep: (index: number) => void
}

const StepOne = (props: TStepProps) => {
  return (
    <StepWrapper {...props}>
      <TitleQuestion
        counter={props.step + 1}
        title={
          <>
            👋 Hi! Please fill in{' '}
            <span className="font-bold">your login information.</span>
          </>
        }
      />
      <Input
        variant={EInputVariants.SECONDARY}
        label="Email:"
        placeholder="name@example.com"
        className="mb-3 text-xl"
      />
      <Input
        variant={EInputVariants.SECONDARY}
        type={EInputTypes.PASSWORD}
        label="Password:"
        placeholder="Must be between 8-24 characters"
        className="mb-3 text-xl"
      />
      <Input
        variant={EInputVariants.SECONDARY}
        type={EInputTypes.PASSWORD}
        label="Password confirmation:"
        placeholder="Numbers are also allowed"
        className="mb-3 text-xl"
      />
    </StepWrapper>
  )
}

export default StepOne
