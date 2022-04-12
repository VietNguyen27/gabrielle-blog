import React, { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Textarea } from '@components/Textarea'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { Comment } from '@components/Comment'
import { CommentSkeleton } from '@components/Skeleton'
import { Avatar } from '@components/Avatar'
import { LoginRequired } from '@components/LoginRequired'
import { fetcher } from '@lib/fetcher'
import { useCurrentUser } from '@lib/user'
import { useComments } from '@lib/comment'
import { useError, useLoading } from '@lib/store'
import { usePost } from '@lib/post'
import { useModal, useAuth } from '@hooks/index'
import { getErrorFromJoiMessage } from '@utils/utils'

const CommentList = ({ postId, commentsCount }) => {
  const [focus, setFocus] = useState(false)
  const [success, setSuccess] = useState(false)
  const ref = useRef(null)
  const contentRef = useRef(null)
  const { data: { user } = {} } = useCurrentUser()
  const { data: { comments } = {}, mutate } = useComments(postId)
  const { data: { post } = {}, mutate: postMutate } = usePost(postId)
  const { loading, setLoading } = useLoading()
  const { error, setError, resetError } = useError()
  const { open, toggle } = useModal()
  const isAuth = useAuth()

  useEffect(() => {
    if (focus && ref.current) {
      ;(ref.current as any).focus()
    }
  }, [focus])

  const handleComment = () => {
    if (!isAuth) {
      toggle()
      return
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
      postMutate()
      resetError()
      setSuccess(true)
      setFocus(false)
    } catch (error) {
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
    <LoginRequired open={open} toggle={toggle} path="#comments">
      <div
        className="border-t border-gray-200 px-6 py-8 sm:px-12"
        id="comments"
      >
        <div className="flex flex-col items-stretch">
          <h2 className="pb-4 text-2xl font-bold">
            Discussion ({(post && post.commentsCount) || commentsCount})
          </h2>
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
                  onClick={handleComment}
                >
                  <span className="text-gray-400">Type something here</span>
                </div>
              )}
            </div>
            {focus && (
              <div
                className={clsx(
                  'flex items-center gap-2 pt-3',
                  user && 'pl-10'
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
          <div className="flex flex-col items-stretch pt-6">
            {comments && post && post.commentsCount
              ? nestedComments(comments, postId).map((comment) => (
                  <Comment key={comment._id} {...comment} />
                ))
              : [
                  ...Array(
                    (post && post.commentsCount) || commentsCount ? 4 : 0
                  ),
                ].map((_, index) => <CommentSkeleton key={index} />)}
          </div>
        </div>
      </div>
    </LoginRequired>
  )
}

export default CommentList
