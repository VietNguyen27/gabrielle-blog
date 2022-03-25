import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCurrentUser } from '@lib/user'
import { Textarea } from '@components/Textarea'
import clsx from 'clsx'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { useRouter } from 'next/router'
import { useComments } from '@lib/comment'
import { useError, useLoading } from '@lib/store'
import { fetcher } from '@lib/fetcher'
import { getErrorFromJoiMessage } from '@utils/utils'
import { Comment } from '@components/Comment'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { CommentSkeleton } from '@components/Skeleton'
import { Avatar } from '@components/Avatar'

const CommentList = ({ postId, commentsCount }) => {
  const [focus, setFocus] = useState(false)
  const [success, setSuccess] = useState(false)
  const ref = useRef(null)
  const formRef = useRef(null)
  const contentRef = useRef(null)
  const { data: { user } = {} } = useCurrentUser()
  const { data: { comments } = {}, mutate } = useComments(postId)
  const { loading, setLoading } = useLoading()
  const { error, setError, resetError } = useError()
  const router = useRouter()

  useOnClickOutside(formRef, () => {
    setFocus(false)
    resetError()
  })

  useEffect(() => {
    if (focus && ref.current) {
      ;(ref.current as any).focus()
    }
  }, [focus])

  const onFocus = () => {
    if (!user) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    }

    setFocus(true)
  }

  const onSubmit = useCallback(async () => {
    try {
      setLoading('comment', true)

      await fetcher(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: contentRef.current || '',
        }),
      })
      mutate()
      resetError()
      setSuccess(true)
      setFocus(false)
    } catch (error: any) {
      setError(getErrorFromJoiMessage(error))
    } finally {
      setLoading('comment', false)
      setSuccess(false)
    }
  }, [])

  const nestedComments = (comments, parentId = null) => {
    return comments.reduce((acc, cur) => {
      const obj = { ...cur }

      if (parentId === cur.parentId) {
        const children = nestedComments(comments, cur._id)
        if (children.length) obj.children = children
        acc.push(obj)
      }

      return acc
    }, [])
  }

  return (
    <div className="border-t border-gray-200 px-6 py-8 sm:px-12">
      <div className="flex flex-col items-stretch">
        <h2 className="pb-4 text-2xl font-bold">
          Discussion ({commentsCount})
        </h2>
        <div ref={formRef}>
          <Form onSubmit={onSubmit}>
            <div className="flex items-start">
              {user && (
                <Avatar
                  src={user.profilePicture}
                  alt={user.username}
                  className="mr-2 w-8 flex-shrink-0"
                />
              )}
              {focus ? (
                <Textarea
                  variant="secondary"
                  className="min-h-[120px]
                flex-grow"
                  ref={ref}
                  contentRef={contentRef}
                  name="comment"
                  error={error['comment']}
                  reset={success}
                />
              ) : (
                <div
                  className="min-h-[70px] w-full cursor-text rounded-md border border-gray-200 p-3"
                  tabIndex={-1}
                  onFocus={onFocus}
                >
                  <span className="text-gray-400">Type something here</span>
                </div>
              )}
            </div>
            {focus && (
              <div
                className={clsx(
                  'flex items-center gap-2 pt-3',
                  user && 'pl-11'
                )}
              >
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
                  onClick={() => setFocus(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Form>
        </div>
        <div className="flex flex-col items-stretch pt-6">
          {comments && commentsCount
            ? nestedComments(comments, postId).map((comment) => (
                <Comment key={comment._id} {...comment} />
              ))
            : [...Array(commentsCount ? 4 : 0)].map((_, index) => (
                <CommentSkeleton key={index} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default CommentList
