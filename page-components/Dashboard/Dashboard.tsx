import React from 'react'
import { Container } from '@components/Layout'
import { Tab, Tabs } from '@components/Tabs'
import { Title } from '@components/Title'
import { useCurrentUser } from '@lib/user'

import Analytics from './Analytics'
import Posts from './Posts'
import Followers from './Followers'
import FollowingUsers from './FollowingUsers'

const Dashboard = () => {
  const { data: { user } = {} } = useCurrentUser()

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between pb-4">
          <Title>Dashboard</Title>
        </div>
        <div className="flex items-stretch gap-4">
          <Tabs
            className="flex-1 gap-4"
            labelClassName="min-w-[200px] lg:min-w-[240px]"
            horizontal
          >
            <Tab className="mt-8 flex-1 md:mt-0" label="Analytics">
              <Analytics />
            </Tab>
            <Tab
              className="mt-8 flex-1 md:mt-0"
              label={`Posts (${user ? user.postsCount : 0})`}
            >
              <Posts />
            </Tab>
            <Tab
              className="mt-8 flex-1 md:mt-0"
              label={`Followers (${user ? user.followersCount : 0})`}
            >
              <Followers />
            </Tab>
            <Tab
              className="mt-8 flex-1 md:mt-0"
              label={`Following users (${user ? user.followingCount : 0})`}
            >
              <FollowingUsers />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  )
}

export default Dashboard
