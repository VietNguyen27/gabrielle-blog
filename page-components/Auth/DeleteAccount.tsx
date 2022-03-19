import React from 'react'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { List, ListItem } from '@components/List'
import { ALink } from '@components/ALink'

const DeleteAccount = () => {
  return (
    <div className="rounded-md border border-gray-300 bg-white px-6 py-4 shadow">
      <Heading level={2} className="text-lg text-red-600">
        Danger zone
      </Heading>
      <p className="pb-2 font-bold">Delete account</p>
      <p className="pb-2">Deleting your account will:</p>
      <List type="ol">
        <ListItem>
          Delete your profile, along with your authentication associations. This
          does not include applications permissions.
        </ListItem>
        <ListItem>
          Delete any and all content you have, such as articles, comments, or
          your reading list.
        </ListItem>
        <ListItem>Allow your username to become available to anyone.</ListItem>
      </List>
      <Button variant="alert" className="rounded-md px-4 py-2">
        Delete account
      </Button>
      <p className="pt-6">
        <ALink href="/contact">Contact us</ALink> if you have any questions.
      </p>
    </div>
  )
}

export default DeleteAccount
