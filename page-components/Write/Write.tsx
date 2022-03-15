import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import {
  encodeHtml,
  getErrorFromJoiMessage,
  parseMarkdown,
  resizeImage,
} from '@utils/utils'
import DOMPurify from 'dompurify'
import Link from 'next/link'
import { fetcher } from '@lib/fetcher'
import { useError, useLoading } from '@lib/store'
import { slugPostTitle } from '@lib/post'

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
    setValue('topic', topic || '')
  }, [topic])

  return (
    <Select
      title="Top topics"
      options={topics}
      placeholder="Select topics..."
      selectedOptions={topic}
      maxHeight={270}
      onChange={setTopic}
      maxOptions={4}
      multiple
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
  const [changeTab, setChangeTab] = useState<boolean>(false)
  const coverRef = useRef(null)
  const [cover, setCover] = useState('')
  const { setValue, handleSubmit } = useForm()
  const { toggleLoading } = useLoading()
  const { error, setError, resetError } = useError()

  useEffect(() => {
    if (changeTab) {
      handleSubmit(onChangeTab)()
    }

    if (saving) {
      const SAVE_TIMER = 1000
      handleSubmit(onSubmit)()

      setTimeout(() => setSaving(false), SAVE_TIMER)
    }
  }, [saving, changeTab])

  const setHintPosition = (e, index) => {
    const elementPosition = e.target.getBoundingClientRect()

    if (index === hint) {
      setTopOffset((prevState) => prevState + 0.0001)
    } else {
      setTopOffset(elementPosition.top)
    }
  }

  const onAvatarChange = useCallback((e) => {
    const file = e.currentTarget.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (file: any) => {
      const imageResize = await resizeImage(
        file.currentTarget.result,
        1000,
        400
      )
      setCover(imageResize)
    }
    reader.readAsDataURL(file)
  }, [])

  const onChangeTab = (data) => {
    const { title, topic, content: contentUnsafe } = data
    const content = encodeHtml(contentUnsafe)

    setPost({
      title,
      topic,
      content,
    })
    setChangeTab((prevState) => !prevState)
  }

  const onSubmit = useCallback(async (data) => {
    const { title, topic, content: contentUnsafe } = data
    const AVERAGE_WPM = 250
    const readingTime = Math.ceil(contentUnsafe.length / AVERAGE_WPM)
    const slug = slugPostTitle(title)
    const content = encodeHtml(contentUnsafe)

    setPost({
      title,
      topic,
      content,
    })

    try {
      toggleLoading(true)
      await fetcher('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          topic,
          slug,
          cover,
          content,
          readingTime,
          published,
        }),
      })
      resetError()
    } catch (error: any) {
      setError(getErrorFromJoiMessage(error))
    } finally {
      toggleLoading(false)
    }
  }, [])

  return (
    <main>
      <Container className="flex flex-1 flex-col">
        <Tabs className="flex-1">
          <Tab label="Edit" className="flex flex-1 items-stretch pb-8">
            <div className="hidden w-16 lg:block"></div>
            <Form className="w-full lg:w-2/3" onSubmit={() => setSaving(true)}>
              <div className="relative h-[calc(100vh-235px)] overflow-auto rounded-md border border-gray-300 shadow">
                {!!Object.values(error).length && (
                  <div className="bg-red-100 p-4">
                    <p className="pb-3 text-lg font-bold text-red-700">
                      Whoops, something went wrong:
                    </p>
                    <ul className="markdown-ul">
                      {Object.entries(error).map((err, index) => {
                        const [label, content] = err
                        return (
                          <li key={index}>
                            {label}: {content}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                <div className="px-12 py-6">
                  <div className="flex items-center gap-4">
                    {cover && (
                      <div className="relative h-[100px] w-[250px]">
                        <img
                          src={cover}
                          className="absolute top-0 left-0 h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <Button
                      buttonAs={EButtonAs.LABEL}
                      variant={EButtonVariants.SECONDARY}
                      className="rounded-lg px-5 py-2"
                    >
                      {cover ? 'Change' : 'Add a cover image'}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={coverRef}
                        onChange={onAvatarChange}
                      />
                    </Button>
                  </div>
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
            onChange={() => setChangeTab(true)}
          >
            <div className="hidden w-16 lg:block"></div>
            <div className="w-full lg:w-2/3">
              <div className="relative h-[calc(100vh-235px)] overflow-auto rounded-md border border-gray-300 shadow">
                {cover && (
                  <div className="relative h-0 w-full pb-[40%]">
                    <img
                      src={cover}
                      alt="Post thumbnail"
                      className="cover absolute top-0 left-0 h-full w-full"
                    />
                  </div>
                )}
                <div className="px-12 py-6">
                  {post && post.title && (
                    <h1 className="mb-2 text-5xl font-bold">{post.title}</h1>
                  )}
                  {post && post.topic && (
                    <div>
                      {post.topic.map((topic, index) => (
                        <Link
                          key={index}
                          href={`/topic/${topic.label.toLowerCase()}`}
                        >
                          <a className="rounded-md border border-transparent px-1.5 py-1 text-gray-600 outline-none transition-colors duration-200 hover:border-gray-300 hover:bg-gray-100">
                            #{topic.label.toLowerCase()}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                  {post && post.content && (
                    <div className="mt-8 text-lg">
                      <div
                        className="markdown-container"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            parseMarkdown(post.content)
                          ),
                        }}
                      ></div>
                    </div>
                  )}
                </div>
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
