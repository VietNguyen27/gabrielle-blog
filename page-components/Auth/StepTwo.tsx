import React, { useEffect, useState } from 'react'
import StepWrapper from './StepWrapper'
import { TitleQuestion } from '@components/Title'
import { Choices } from '@components/Choices'
import { positions } from './data'
import { useFormContext } from 'react-hook-form'

type TStepProps = {
  step: number
  currentStep: number
  error: any
  setCurrentStep: (index: number) => void
}

const StepTwo = (props: TStepProps) => {
  const [positionSelected, setPositionSelected] = useState<string>('')
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue('position', positionSelected)
  }, [positionSelected])

  return (
    <StepWrapper {...props}>
      <TitleQuestion
        counter={props.step + 1}
        title={
          <>
            🛠 What is your{' '}
            <span className="font-bold">current job/position?</span>
          </>
        }
        description="Choose one from the list below."
      />
      <Choices
        options={positions}
        onChange={setPositionSelected}
        error={props.error['position']}
        errorName="position"
        customizable
      />
    </StepWrapper>
  )
}

export default StepTwo
