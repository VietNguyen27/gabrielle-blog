import { useState } from 'react'
import { Heading } from '@components/Heading'
import { Container } from '@components/Layout'
import { Paragraph } from '@components/Paragraph'
import DashedLine from '@public/static/images/dashed-line.svg'
import { contributors } from './data'
import { ArrowSmDownIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import clsx from 'clsx'

const Contributors = () => {
  const [contributorsExpanded, setContributorsExpanded] =
    useState<boolean>(false)

  return (
    <section>
      <Container className="pb-32">
        <div className="flex flex-col items-center pb-8 text-center">
          <div className="pb-4">
            <DashedLine />
          </div>
          <Heading level={2} className="text-3xl capitalize">
            Gabrielle's contributors
          </Heading>
          <Paragraph className="text-xl">
            A growing and talented team, fueled by a quality driven culture.
          </Paragraph>
        </div>
        <div className="relative mx-auto w-full lg:w-3/4">
          <div
            className={clsx(
              'grid grid-cols-2 gap-x-4 gap-y-10 overflow-hidden transition-all duration-300 sm:grid-cols-3',
              contributorsExpanded ? 'max-h-[2500px]' : 'max-h-[250px]'
            )}
          >
            {contributors.map(({ name, position, image }, index) => (
              <div
                className="flex flex-col items-center gap-2 text-center xs:flex-row xs:text-left"
                key={index}
              >
                <Image
                  src={image}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">{name}</h3>
                  <p className="text-gray-700">{position}</p>
                </div>
              </div>
            ))}
          </div>
          {!contributorsExpanded && (
            <div className="absolute top-full left-0 z-10 mt-4 flex w-full justify-center py-2 after:absolute after:left-0 after:bottom-full after:h-40 after:w-full after:bg-gradient-to-t after:from-white after:to-white/50">
              <button
                className="flex w-full items-center justify-center gap-1 font-bold transition-transform duration-300 hover:scale-105"
                type="button"
                onClick={() => setContributorsExpanded(true)}
              >
                Get to know all of us <ArrowSmDownIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default Contributors
