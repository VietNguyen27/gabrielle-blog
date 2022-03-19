import React from 'react'
import { Container } from '@components/Layout'
import { Button } from '@components/Button'
import { ArrowLeftIcon } from '@heroicons/react/outline'

const Custom404 = () => {
  return (
    <main>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Container className="relative">
          <div className="absolute top-1/2 left-1/2 hidden w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 pb-[80%] xs:block sm:w-3/5 sm:pb-[60%] lg:w-1/2 lg:pb-[50%]"></div>
          <div className="absolute top-[52%] left-[48%] hidden w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 pb-[80%] xs:block sm:w-3/5 sm:pb-[60%] lg:w-1/2 lg:pb-[50%]"></div>
          <div className="mx-auto xs:w-3/5 md:w-1/2 lg:w-2/5">
            <div className="relative z-elevate flex flex-col items-center justify-center rounded-md bg-white px-8 py-8 text-center shadow-lg lg:px-16 lg:py-12 xl:py-20">
              <h1 className="text-[70px] font-bold text-slate-500 lg:text-[100px]">
                404
              </h1>
              <p className="-mt-3 mb-12 text-2xl font-bold">Page not found</p>
              <p className="mb-8">
                The link you clicked may be broken or the page may have been
                removed or not available.
              </p>
              <Button
                as="a"
                href="/"
                variant="tertiary"
                className="rounded-md px-4 py-2"
                prefix={<ArrowLeftIcon className="mr-1 h-5 w-5" />}
              >
                Go back Home
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}

export default Custom404
