import React, { ReactNode } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import { Button } from '@components/Button'
import { useLoading } from '@lib/store'

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
  const { loading } = useLoading()

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-start justify-center md:w-2/3 xl:w-1/2">
      <div className="w-full pb-4">{children}</div>
      {lastStep ? (
        <Button
          type={loading['register'] ? 'button' : 'submit'}
          loading={loading['register']}
          className="rounded-md px-4 py-2"
        >
          Submit
        </Button>
      ) : (
        <Button
          onClick={() => setCurrentStep(step + 1)}
          onPressEnter={() => setCurrentStep(step + 1)}
          className="rounded-md px-4 py-2"
        >
          Next
          <CheckIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

export default StepWrapper
