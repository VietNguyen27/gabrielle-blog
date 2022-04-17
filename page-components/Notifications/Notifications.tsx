import React from 'react'
import { Container } from '@components/Layout'
import { Title } from '@components/Title'
import { Tab, Tabs } from '@components/Tabs'
import All from './All'
import Comments from './Comments'
import Posts from './Posts'
import Followers from './Followers'

const tabs = [
  {
    label: 'All',
    component: All,
  },
  {
    label: 'Comments',
    component: Comments,
  },
  {
    label: 'Posts',
    component: Posts,
  },
  {
    label: 'Followers',
    component: Followers,
  },
]

const Notifications = () => {
  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between pb-4">
          <Title>Notifications</Title>
        </div>
        <div className="flex items-stretch gap-4">
          <Tabs
            className="flex-1 gap-4"
            labelClassName="min-w-[200px] lg:min-w-[240px]"
            horizontal
          >
            {tabs.map(({ label, component: Component }) => (
              <Tab key={label} className="flex-1" label={label}>
                <div className="flex min-h-[50vh] flex-1 flex-col items-stretch rounded-md border border-gray-200 p-4 shadow">
                  <Component />
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </Container>
  )
}

export default Notifications
