import React, { useState } from 'react'
import { Container } from '@components/Layout'
import {
  Button,
  EButtonAs,
  EButtonRounded,
  EButtonVariants,
} from '@components/Button'
import { Textarea } from '@components/Textarea'
import { Select } from '@components/Select'
import { topics } from '@page-components/Auth/data'
import { Switch } from '@components/Switch'
import HintWrapper from './HintWrapper'
import { Tab, Tabs } from '@components/Tabs'

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
      onChange={setSelectedOptions}
      multiple
    />
  )
}

const RichEditor = () => {
  return (
    <div className="mb-4" style={{ minHeight: '280px' }}>
      Rich editor
    </div>
  )
}

const writeSections = [Title, Topic, RichEditor]

const Write = () => {
  const [hint, setHint] = useState<number | null>(null)
  const [topOffset, setTopOffset] = useState<number>(0)
  const [published, setPublished] = useState<boolean>(true)

  const setHintPosition = (e) => {
    const elementPosition = e.target.getBoundingClientRect()
    setTopOffset(elementPosition.top)
  }

  return (
    <Container>
      <Tabs>
        <Tab label="Edit">
          <div className="flex items-stretch">
            <div className="w-16"></div>
            <div className="w-2/3">
              <div className="relative rounded-md border border-gray-300 px-8 py-6 shadow">
                <Button
                  buttonAs={EButtonAs.LABEL}
                  variant={EButtonVariants.SECONDARY}
                  rounded={EButtonRounded.SMALL}
                >
                  Add a cover image
                  <input type="file" className="hidden" />
                </Button>
                {writeSections.map((Component, index) => (
                  <div
                    key={index}
                    tabIndex={0}
                    onFocus={(e) => {
                      setHint(index)
                      setHintPosition(e)
                    }}
                  >
                    <Component />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Button
                  variant={EButtonVariants.TERTIARY}
                  rounded={EButtonRounded.SMALL}
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
            <div className="w-1/3 px-4">
              {typeof hint === 'number' && (
                <HintWrapper hint={hint} top={topOffset} />
              )}
            </div>
          </div>
        </Tab>
        <Tab label="Preview">test</Tab>
      </Tabs>
    </Container>
  )
}

export default Write
