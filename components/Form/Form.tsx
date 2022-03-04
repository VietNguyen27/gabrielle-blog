import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const Form = ({ onSubmit, ...rest }) => {
  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest} />
    </FormProvider>
  )
}

export default Form
