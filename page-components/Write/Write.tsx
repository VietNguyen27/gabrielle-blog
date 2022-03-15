import React, { useEffect, useRef, useState } from 'react'
import { Container } from '@components/Layout'
import {
  Button,
  EButtonAs,
  EButtonTypes,
  EButtonVariants,
} from '@components/Button'
import { topics } from '@page-components/Auth/data'
import { Textarea } from '@components/Textarea'
import { Select } from '@components/Select'
import { Switch } from '@components/Switch'
import { Tab, Tabs } from '@components/Tabs'
import { RichEditor } from '@components/RichEditor'
import HintWrapper from './HintWrapper'
import { useForm } from 'react-hook-form'
import { Form } from '@components/Form'
import { encodeHtml, parseMarkdown } from '@utils/utils'
import DOMPurify from 'dompurify'
import Link from 'next/link'

const Title = ({ setValue }) => {
  const title = useRef<any>(null)

  useEffect(() => {
    setValue('title', title.current || '')
  }, [title.current])

  return (
    <div className="my-4">
      <Textarea
        className="text-4xl font-bold"
        placeholder="New post title here"
        contentRef={title}
      />
    </div>
  )
}

const Topic = ({ setValue }) => {
  const [topic, setTopic] = useState([])

  useEffect(() => {
    setValue('topic', topic[0] || '')
  }, [topic])

  return (
    <Select
      title="Top topics"
      options={topics}
      placeholder="Select one topic..."
      selectedOptions={topic}
      maxHeight={270}
      onChange={setTopic}
    />
  )
}

const TextEditor = ({ setValue }) => {
  const content = useRef<any>(null)

  useEffect(() => {
    setValue('content', content.current || '')
  }, [content.current])

  return <RichEditor content={content} />
}

const writeSections = [Title, Topic, TextEditor]

const Write = () => {
  const [hint, setHint] = useState<number | null>(null)
  const [topOffset, setTopOffset] = useState<number>(0)
  const [post, setPost] = useState<any>(null)
  const [published, setPublished] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const { setValue, handleSubmit } = useForm()

  useEffect(() => {
    if (saving) {
      const SAVE_TIMER = 1000
      handleSubmit(onSubmit)()

      setTimeout(() => setSaving(false), SAVE_TIMER)
    }
  }, [saving])

  const setHintPosition = (e, index) => {
    const elementPosition = e.target.getBoundingClientRect()

    if (index === hint) {
      setTopOffset((prevState) => prevState + 0.0001)
    } else {
      setTopOffset(elementPosition.top)
    }
  }

  const onSubmit = (data) => {
    const { title, topic, content: contentUnsafe } = data
    const content = encodeHtml(contentUnsafe)

    setPost({
      title,
      topic,
      content,
    })
  }

  return (
    <main>
      <Container className="flex flex-1 flex-col">
        <Tabs className="flex-1">
          <Tab label="Edit" className="flex flex-1 items-stretch pb-8">
            <div className="hidden w-16 lg:block"></div>
            <Form className="w-full lg:w-2/3" onSubmit={() => setSaving(true)}>
              <div className="relative h-[calc(100vh-235px)] overflow-auto rounded-md border border-gray-300 px-12 py-6 shadow">
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
                    <Component setValue={setValue} />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Button
                  type={saving ? EButtonTypes.BUTTON : EButtonTypes.SUBMIT}
                  variant={EButtonVariants.TERTIARY}
                  className="rounded-md px-3.5 py-2"
                  loading={saving}
                  loadingBackground="bg-tertiary-900"
                >
                  Create
                </Button>
                <Switch
                  label="Published?"
                  active={published}
                  toggle={() => setPublished((prevState) => !prevState)}
                />
              </div>
            </Form>
            <div className="hidden w-1/3 px-4 lg:block">
              {typeof hint === 'number' && (
                <HintWrapper hint={hint} top={topOffset} />
              )}
            </div>
          </Tab>
          <Tab
            label="Preview"
            className="flex flex-1 items-stretch pb-8"
            onChange={() => setSaving(true)}
          >
            <div className="hidden w-16 lg:block"></div>
            <div className="w-full lg:w-2/3">
              <div className="relative h-[calc(100vh-235px)] overflow-auto rounded-md border border-gray-300 px-12 py-6 shadow">
                {post && post.title && (
                  <h1 className="mb-2 text-5xl font-bold">{post.title}</h1>
                )}
                {post && post.topic && (
                  <div>
                    <Link href={`/topic/${post.topic.label.toLowerCase()}`}>
                      <a className="rounded-md border border-transparent px-1.5 py-1 text-gray-600 outline-none transition-colors duration-200 hover:border-gray-300 hover:bg-gray-100">
                        #{post.topic.label.toLowerCase()}
                      </a>
                    </Link>
                  </div>
                )}
                {post && post.content && (
                  <div className="mt-8 text-lg">
                    <div
                      className="markdown-container"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(parseMarkdown(post.content)),
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden w-1/3 px-4 lg:block"></div>
          </Tab>
        </Tabs>
      </Container>
    </main>
  )
}

export default Write
