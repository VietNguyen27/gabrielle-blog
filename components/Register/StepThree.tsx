import React, { useState } from 'react'
import StepWrapper from './StepWrapper'
import TitleQuestion from '@components/TitleQuestion'
import Choices from '@components/Choices'
import { blogTypes } from '@data/register'

type TStepProps = {
  step: number
  currentStep: number
  setCurrentStep: (index: number) => void
}

const StepThree = (props: TStepProps) => {
  const [blogTypesSelected, setBlogTypesSelected] = useState<string[]>([])

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
      <Choices options={blogTypes} onChange={setBlogTypesSelected} multiple />
    </StepWrapper>
  )
}

export default StepThree
