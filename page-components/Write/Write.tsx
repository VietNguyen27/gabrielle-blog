import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '@components/Layout'
import { Button } from '@components/Button'
import { Switch } from '@components/Switch'
import { Tab, Tabs } from '@components/Tabs'
import HintWrapper from './HintWrapper'
import { useForm } from 'react-hook-form'
import { Form } from '@components/Form'
import { encodeHtml, getErrorFromJoiMessage, parseMarkdown } from '@utils/utils'
import DOMPurify from 'dompurify'
import Link from 'next/link'
import Title from './Title'
import Topic from './Topic'
import TextEditor from './TextEditor'
import { fetcher } from '@lib/fetcher'
import { useError, useLoading } from '@lib/store'
import { ImageRatio } from '@components/ImageRatio'
import { useCurrentUser } from '@lib/user'
import { useRouter } from 'next/router'

const writeSections = [Title, Topic, TextEditor]

const Write = () => {
  const [hint, setHint] = useState<number | null>(null)
  const [topOffset, setTopOffset] = useState<number>(0)
  const [post, setPost] = useState<any>(null)
  const [published, setPublished] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [changeTab, setChangeTab] = useState<boolean>(false)
  const coverRef = useRef(null)
  const editorRef = useRef(null)
  const [cover, setCover] = useState('')
  const { setValue, handleSubmit } = useForm()
  const { loading, setLoading } = useLoading()
  const { error, setError, resetError } = useError()
  const { data: { user } = {} } = useCurrentUser()
  const router = useRouter()

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

  const onCoverChange = useCallback(
    (e) => {
      const file = e.currentTarget.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (file: any) => {
        setCover(file.currentTarget.result)
        setValue('cover', file.currentTarget.result)
      }
      reader.readAsDataURL(file)
    },
    [cover]
  )

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
    const { title, topic, cover: rawCover, content: contentUnsafe } = data
    const AVERAGE_CPM = 1000
    const readingTime = Math.ceil(contentUnsafe.length / AVERAGE_CPM)
    const content = encodeHtml(contentUnsafe)

    setPost({
      title: title.trim(),
      topic,
      content,
    })

    try {
      setLoading('newPost', true)

      const formData = new FormData()

      formData.append('title', title.trim())
      formData.append('topic', JSON.stringify(topic))
      formData.append('content', content)
      formData.append('contentUnsafe', contentUnsafe)
      formData.append('readingTime', String(readingTime))
      formData.append('published', String(published))

      if ((coverRef.current as any).files[0]) {
        formData.append('rawCover', rawCover)
        formData.append('cover', (coverRef.current as any).files[0])
      }

      const { insertedId } = await fetcher('/api/posts', {
        method: 'POST',
        body: formData,
      })
      setPost(null)
      setCover('')
      router.push({
        pathname: `/${user.username}/post/${insertedId}`,
      })
      resetError()
    } catch (error: any) {
      setError(getErrorFromJoiMessage(error))
      if (editorRef.current) {
        ;(editorRef.current as any).scrollTop = 0
      }
    } finally {
      setLoading('newPost', false)
    }
  }, [])

  return (
    <main>
      <Container>
        <Tabs>
          <Tab label="Edit" className="flex items-stretch pb-8">
            <div className="hidden w-16 lg:block"></div>
            <Form className="w-full lg:w-2/3" onSubmit={() => setSaving(true)}>
              <div
                ref={editorRef}
                className="relative h-[calc(100vh-235px)] overflow-auto rounded-md border border-gray-300 shadow"
              >
                {!!Object.values(error).length && (
                  <div className="bg-red-100 p-4">
                    <p className="pb-3 text-lg font-bold text-red-700">
                      Whoops, something went wrong:
                    </p>
                    <ul className="markdown-ul">
                      {Object.entries(error).map((err, index) => {
                        const [_, content]: any = err
                        return <li key={index}>{content}</li>
                      })}
                    </ul>
                  </div>
                )}
                <div className="px-12 py-6">
                  <div className="flex items-center gap-4">
                    {cover && (
                      <ImageRatio
                        src={cover}
                        className="w-[250px]"
                        ratio={2.5}
                      />
                    )}
                    <Button
                      as="label"
                      variant="secondary"
                      className="rounded-lg px-5 py-2"
                    >
                      {cover ? 'Change' : 'Add a cover image'}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={coverRef}
                        onChange={onCoverChange}
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
                  type={loading['newPost'] ? 'button' : 'submit'}
                  variant="tertiary"
                  className="rounded-md px-3.5 py-2"
                  loading={loading['newPost']}
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
            className="flex items-stretch pb-8"
            onChange={() => setChangeTab(true)}
          >
            <div className="hidden w-16 lg:block"></div>
            <div className="w-full lg:w-2/3">
              <div className="relative h-[calc(100vh-235px)] overflow-auto rounded-md border border-gray-300 shadow">
                {cover && (
                  <ImageRatio
                    src={cover}
                    className="w-full"
                    alt="Post thumbnail"
                    ratio={2.5}
                  />
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
