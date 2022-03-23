import React, { useCallback, useRef, useState } from 'react'
import { useCurrentUser } from '@lib/user'
import { Textarea } from '@components/Textarea'
import { ImageRatio } from '@components/ImageRatio'
import clsx from 'clsx'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { useRouter } from 'next/router'
import { useComments } from '@lib/comment'
import { useError, useLoading } from '@lib/store'
import { fetcher } from '@lib/fetcher'
import { getErrorFromJoiMessage } from '@utils/utils'
import { Comment } from '@components/Comment'

const CommentList = ({ postId }) => {
  const [focus, setFocus] = useState(false)
  const [success, setSuccess] = useState(false)
  const ref = useRef(null)
  const contentRef = useRef(null)
  const { data: { user } = {} } = useCurrentUser()
  const { data: { comments } = {}, mutate } = useComments(postId)
  const { loading, setLoading } = useLoading()
  const { error, setError, resetError } = useError()
  const router = useRouter()

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

      // await fetcher(`/api/posts/${postId}/comments`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     comment: contentRef.current || '',
      //   }),
      // })
      // mutate()
      // resetError()
      setSuccess(true)
    } catch (error: any) {
      console.log(error)
      setError(getErrorFromJoiMessage(error))
    } finally {
      setLoading('comment', false)
      setSuccess(false)
    }
  }, [])

  return (
    <div className="border-t border-gray-200 px-6 py-8 sm:px-12">
      <div className="flex flex-col items-stretch">
        <h2 className="pb-4 text-2xl font-bold">Discussion (0)</h2>
        <Form onSubmit={onSubmit}>
          <div className="flex items-start gap-3">
            {user && (
              <ImageRatio
                src={user.profilePicture}
                className="w-8 flex-shrink-0 rounded-full border border-gray-200"
              />
            )}
            <Textarea
              variant="secondary"
              className={clsx(
                'flex-grow',
                focus ? 'min-h-[120px]' : 'min-h-[50px]'
              )}
              ref={ref}
              contentRef={contentRef}
              onFocus={onFocus}
              name="comment"
              error={error['comment']}
              reset={success}
            />
          </div>
          {focus && (
            <div
              className={clsx('flex items-center gap-2 pt-3', user && 'pl-11')}
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
        <div className="flex flex-col items-stretch pt-6">
          {comments
            ? comments.map((comment) => (
                <Comment key={comment._id} {...comment} />
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default CommentList
