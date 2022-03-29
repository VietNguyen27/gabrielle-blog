import React from 'react'
import { Input } from '@components/Input'
import { TitleQuestion } from '@components/Title'
import { useFormContext } from 'react-hook-form'
import StepWrapper, { TStepProps } from './StepWrapper'

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
