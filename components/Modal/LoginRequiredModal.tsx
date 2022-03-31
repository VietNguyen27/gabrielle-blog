import { Button } from '@components/Button'
import { Logo } from '@components/Logo'
import { useRouter } from 'next/router'
import React from 'react'
import Modal from './Modal'

const LoginRequiredModal = ({ open, toggle }) => {
  const router = useRouter()

  return (
    <Modal title="Log in to continue" open={open} toggle={toggle}>
      <Logo width={180} height={30} />
      <p className="pt-6 pb-4">
        We&apos;re a place where coders share, stay up-to-date and grow their
        careers.
      </p>
      <div className="mx-auto flex w-3/5 flex-col gap-3 pb-6">
        <Button
          as="a"
          href={{
            pathname: '/login',
            query: { returnUrl: router.asPath },
          }}
          className="rounded-md px-2 py-2 xs:px-4"
          fluid
        >
          Sign in
        </Button>
        <Button
          as="a"
          href="/register"
          target="_blank"
          variant="secondary"
          className="rounded-md px-2 py-2 xs:px-4"
          fluid
        >
          Create account
        </Button>
      </div>
    </Modal>
  )
}

export default LoginRequiredModal
