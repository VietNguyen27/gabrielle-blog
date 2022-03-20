import React from 'react'
import { Container } from '@components/Layout'
import { Title } from '@components/Title'
import { Tab, Tabs } from '@components/Tabs'

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
            <Tab className="flex-1" label="All">
              <div className="flex min-h-[40vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
                <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
                  <p className="pb-2 text-lg font-bold">
                    Your notifications is empty
                  </p>
                  <p>
                    Interact with everyone like posting something, commenting,
                    etc. to receive some notifications
                  </p>
                </div>
              </div>
            </Tab>
            <Tab className="flex-1" label="Comments">
              <div className="flex min-h-[40vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
                <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
                  <p className="pb-2 text-lg font-bold">
                    Your notifications is empty
                  </p>
                  <p>
                    Interact with everyone like posting something, commenting,
                    etc. to receive some notifications
                  </p>
                </div>
              </div>
            </Tab>
            <Tab className="flex-1" label="Posts">
              <div className="flex min-h-[40vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
                <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
                  <p className="pb-2 text-lg font-bold">
                    Your notifications is empty
                  </p>
                  <p>
                    Interact with everyone like posting something, commenting,
                    etc. to receive some notifications
                  </p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  )
}

export default Notifications
