import React from 'react'
import { Container } from '@components/Layout'
import { Tab, Tabs } from '@components/Tabs'
import { Title } from '@components/Title'
import Analytics from './Analytics'
import Posts from './Posts'
import Followers from './Followers'
import FollowingTags from './FollowingTags'
import FollowingUsers from './FollowingUsers'

const Dashboard = () => {
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null

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
            <Tab className="flex-1" label="Analytics">
              <Analytics />
            </Tab>
            <Tab className="flex-1" label={`Posts (${localUser.postsCount})`}>
              <Posts />
            </Tab>
            <Tab
              className="flex-1"
              label={`Followers (${localUser.followersCount})`}
            >
              <Followers />
            </Tab>
            <Tab
              className="flex-1"
              label={`Following tags (${localUser.interests.length})`}
            >
              <FollowingTags />
            </Tab>
            <Tab
              className="flex-1"
              label={`Following users (${localUser.followingCount})`}
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
