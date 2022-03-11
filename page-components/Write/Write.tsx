import React, { useState } from 'react'
import { Container } from '@components/Layout'
import {
  Button,
  EButtonAs,
  EButtonRounded,
  EButtonVariants,
} from '@components/Button'
import { topics } from '@page-components/Auth/data'
import { Textarea } from '@components/Textarea'
import { Select } from '@components/Select'
import { Switch } from '@components/Switch'
import { Tab, Tabs } from '@components/Tabs'
import { RichEditor } from '@components/RichEditor'
import HintWrapper from './HintWrapper'

const Title = () => {
  return (
    <div className="my-4">
      <Textarea
        className="text-4xl font-bold"
        placeholder="New post title here"
      />
    </div>
  )
}

const Topic = () => {
  const [selectedOptions, setSelectedOptions] = useState([])

  return (
    <Select
      title="Top topics"
      options={topics}
      placeholder="Select one topic..."
      selectedOptions={selectedOptions}
      maxHeight={270}
      onChange={setSelectedOptions}
      multiple
    />
  )
}

const TextEditor = () => {
  return <RichEditor />
}

const writeSections = [Title, Topic, TextEditor]

const Write = () => {
  const [hint, setHint] = useState<number | null>(null)
  const [topOffset, setTopOffset] = useState<number>(0)
  const [published, setPublished] = useState<boolean>(true)

  const setHintPosition = (e, index) => {
    const elementPosition = e.target.getBoundingClientRect()

    if (index === hint) {
      setTopOffset((prevState) => prevState + 0.0001)
    } else {
      setTopOffset(elementPosition.top)
    }
  }

  return (
    <Container>
      <Tabs>
        <Tab label="Edit" className="flex items-stretch pb-8">
          <div className="hidden w-16 lg:block"></div>
          <div className="w-full lg:w-2/3">
            <div className="relative max-h-[523px] overflow-auto rounded-md border border-gray-300 px-8 py-6 shadow">
              <Button
                buttonAs={EButtonAs.LABEL}
                variant={EButtonVariants.SECONDARY}
                className="rounded-lg px-5 py-2"
              >
                Add a cover image
                <input type="file" className="hidden" />
              </Button>
              {writeSections.map((Component, index) => (
                <div
                  key={index}
                  tabIndex={-1}
                  onFocus={(e) => {
                    setHint(index)
                    setHintPosition(e, index)
                  }}
                >
                  <Component />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <Button
                variant={EButtonVariants.TERTIARY}
                className="rounded-md px-3.5 py-2"
              >
                Create
              </Button>
              <Switch
                label="Published?"
                active={published}
                toggle={() => setPublished((prevState) => !prevState)}
              />
            </div>
          </div>
          <div className="hidden w-1/3 px-4 lg:block">
            {typeof hint === 'number' && (
              <HintWrapper hint={hint} top={topOffset} />
            )}
          </div>
        </Tab>
        <Tab label="Preview">test</Tab>
      </Tabs>
    </Container>
  )
}

export default Write
