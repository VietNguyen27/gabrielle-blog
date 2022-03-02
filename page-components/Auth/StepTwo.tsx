import React, { useState } from 'react'
import StepWrapper from './StepWrapper'
import { TitleQuestion } from '@components/Title'
import { Choices } from '@components/Choices'
import { positions } from './data'

type TStepProps = {
  step: number
  currentStep: number
  setCurrentStep: (index: number) => void
}

const StepTwo = (props: TStepProps) => {
  const [positionSelected, setPositionSelected] = useState<string>('')

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
        customizable
      />
    </StepWrapper>
  )
}

export default StepTwo
