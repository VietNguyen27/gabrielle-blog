import React, { useEffect, useState } from 'react'
import StepWrapper, { TStepProps } from './StepWrapper'
import { TitleQuestion } from '@components/Title'
import { Choices } from '@components/Choices'
import { topics } from './data'
import { useFormContext } from 'react-hook-form'

const StepThree = (props: TStepProps) => {
  const [topicsSelected, setTopicsSelected] = useState<string[]>([])
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue('interests', topicsSelected)
  }, [topicsSelected])

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
        description="There is no topic suitable for you? Don't worry, we still have a lot of things for you to explore."
      />
      <Choices
        options={topics}
        onChange={setTopicsSelected as any}
        error={props.error['interests']}
        errorName="interests"
        multiple
      />
    </StepWrapper>
  )
}

export default StepThree
