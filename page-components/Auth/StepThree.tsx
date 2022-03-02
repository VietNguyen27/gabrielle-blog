import React, { useState } from 'react'
import StepWrapper from './StepWrapper'
import { TitleQuestion } from '@components/Title'
import { Choices } from '@components/Choices'
import { topics } from './data'

type TStepProps = {
  step: number
  currentStep: number
  setCurrentStep: (index: number) => void
}

const StepThree = (props: TStepProps) => {
  const [topicsSelected, setTopicsSelected] = useState<string[]>([])

  return (
    <StepWrapper {...props}>
      <TitleQuestion
        counter={props.step + 1}
        title={
          <>
            👀 Cool!{' '}
            <span className="font-bold">
              What's the type of blog you're looking for?
            </span>
          </>
        }
        description="Choose as many as you like."
      />
      <Choices options={topics} onChange={setTopicsSelected} multiple />
    </StepWrapper>
  )
}

export default StepThree
