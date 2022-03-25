import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Dropdown, Menu, MenuItem } from '@components/Dropdown'
import { Form } from '@components/Form'
import { Textarea } from '@components/Textarea'
import {
  ChatAlt2Icon,
  DotsHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { useComments } from '@lib/comment'
import { fetcher } from '@lib/fetcher'
import { useError, useLoading } from '@lib/store'
import { useCurrentUser } from '@lib/user'
import {
  encodeHtml,
  getErrorFromJoiMessage,
  getFormattedDate,
} from '@utils/utils'
import clsx from 'clsx'
import DOMPurify from 'dompurify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type TCreator = {
  username: string
  profilePicture: string
}

type TCommentProps = {
  _id: string
  postId: string
  content: string
  depth: number
  creator: TCreator
  likesCount: number
  createdAt: Date
  children: TCommentProps[]
}

const Comment = ({
  _id,
  postId,
  content,
  depth,
  creator,
  likesCount,
  createdAt,
  children,
}: TCommentProps) => {
  const [reply, setReply] = useState(false)
  const [success, setSuccess] = useState(false)
  const [collapse, setCollapse] = useState(false)
  const currentDepth = useRef(0)
  const parentId = useRef(postId)
  const ref = useRef(null)
  const formRef = useRef(null)
  const contentRef = useRef(null)
  const { data: { user } = {} } = useCurrentUser()
  const { mutate } = useComments(postId)
  const { loading, setLoading } = useLoading()
  const { error, setError, resetError } = useError()
  const router = useRouter()

  useOnClickOutside(formRef, () => {
    if (reply) {
      setReply(false)
    }
    resetError()
  })

  useEffect(() => {
    if (reply && ref.current) {
      ;(ref.current as any).focus()
    }
  }, [reply])

  const onClick = () => {
    if (!user) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    }
    currentDepth.current = depth + 1
    parentId.current = _id
    setReply(true)
  }

  const onSubmit = useCallback(async () => {
    try {
      setLoading('comment', true)

      await fetcher(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: contentRef.current || '',
          depth: currentDepth.current,
          parentId: parentId.current,
        }),
      })
      mutate()
      resetError()
      setSuccess(true)
      setReply(false)
    } catch (error: any) {
      setError(getErrorFromJoiMessage(error))
    } finally {
      setLoading('comment', false)
      setSuccess(false)
    }
  }, [])

  return (
    <details
      className="relative"
      style={{
        ['--depth-padding' as any]: '1.5rem',
        ...(depth && {
          marginLeft: 'calc(var(--depth-padding) / var(--ratio))',
        }),
      }}
      open
    >
      <summary
        className={clsx(
          'flex cursor-pointer items-center',
          depth > 0 ? 'top-12 left-1.5' : 'top-14 left-2.5',
          !collapse ? 'absolute' : 'mb-4 rounded-md bg-gray-300/30 py-1.5 px-3'
        )}
        onClick={() => setCollapse((prevState) => !prevState)}
      >
        <span className="text-gray-500 hover:text-gray-900">
          <ChevronDownIcon className="-mb-0.5 h-2.5 w-2.5" />
          <ChevronUpIcon className="h-2.5 w-2.5" />
        </span>
        {collapse && <span className="ml-2">{creator.username}</span>}
      </summary>
      <div className="mb-4 flex items-start">
        <Avatar
          src={creator.profilePicture}
          alt={creator.username}
          className={clsx('mt-3 mr-2 flex-shrink-0', depth ? 'w-6' : ' w-8')}
        />
        <div className="flex flex-1 flex-col items-stretch">
          <div className="mb-3 rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="flex flex-col xs:flex-row xs:items-center">
                <Link href={`/${creator.username}`}>
                  <a className="font-bold">{creator.username}</a>
                </Link>
                <span className="mx-2 hidden h-1 w-1 rounded-full bg-gray-700 xs:inline-block"></span>
                <span className="text-sm text-gray-700">
                  {getFormattedDate(createdAt)}
                </span>
              </div>
              <Dropdown
                className="inline-flex"
                overlay={
                  <Menu className="w-[250px]" position="-right-2 top-full">
                    <MenuItem>Report Abuse</MenuItem>
                  </Menu>
                }
              >
                <button className="absolute bottom-full -right-2 h-5 w-5">
                  <DotsHorizontalIcon className="h-5 w-5" />
                </button>
              </Dropdown>
            </div>
            <div
              className="whitespace-pre-line text-lg"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(encodeHtml(content)),
              }}
            ></div>
          </div>
          {reply ? (
            <div ref={formRef}>
              <Form onSubmit={onSubmit}>
                <div className="flex items-start">
                  <Textarea
                    variant="secondary"
                    className="min-h-[120px]"
                    ref={ref}
                    contentRef={contentRef}
                    name="comment"
                    error={error['comment']}
                    reset={success}
                  />
                </div>
                <div className="flex items-center gap-2 pt-3">
                  <Button
                    type={loading['comment'] ? 'button' : 'submit'}
                    variant="tertiary"
                    className="rounded-md px-4 py-2"
                    loading={loading['comment']}
                    loadingBackground="bg-tertiary-900"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-md px-4 py-2"
                    onClick={() => setReply(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <div className="flex items-center">
              <Button variant="quinary" className="mr-2 rounded-md px-2 py-1.5">
                <HeartIcon className="mr-1 h-5 w-5" />
                {likesCount} likes
              </Button>
              <Button
                variant="quinary"
                className="rounded-md px-2 py-1.5"
                onClick={onClick}
              >
                <ChatAlt2Icon className="mr-1 h-5 w-5" />
                Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {children &&
        children.map((comment) => <Comment key={comment._id} {...comment} />)}
    </details>
  )
}

export default Comment
