import { Input } from '@components/Input'
import { TitleQuestion } from '@components/Title'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import StepWrapper from './StepWrapper'

type TStepProps = {
  step: number
  currentStep: number
  error: any
  setCurrentStep: (index: number) => void
}

const StepFour = (props: TStepProps) => {
  const { register } = useFormContext()

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
        variant="secondary"
        placeholder="Your full name"
        className="mb-3 text-xl"
        error={props.error['username']}
        {...register('username')}
      />
    </StepWrapper>
  )
}

export default StepFour
