import { EInputVariants, Input } from '@components/Input'
import { TitleQuestion } from '@components/Title'
import React from 'react'
import StepWrapper from './StepWrapper'

type TStepProps = {
  step: number
  currentStep: number
  setCurrentStep: (index: number) => void
}

const StepFour = (props: TStepProps) => {
  return (
    <StepWrapper {...props} lastStep>
      <TitleQuestion
        counter={props.step + 1}
        title={
          <>
            🚀 Last but not least:{' '}
            <span className="font-bold">What can we call you?</span>
          </>
        }
        description="Please provide the appropriate name."
      />
      <Input
        variant={EInputVariants.SECONDARY}
        placeholder="Your full name"
        className="mb-3 text-xl"
      />
    </StepWrapper>
  )
}

export default StepFour
