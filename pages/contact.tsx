import React, { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '@components/Layout'
import Container from '@components/Container'
import Title from '@components/Title'
import Paragraph from '@components/Paragraph'

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="section">
        <Container>
          <div className="px-8 py-10">
            <Title>Contacts</Title>
            <div className="mt-6 text-lg">
              <Paragraph>
                Gabrielle Community would love to hear from you!
              </Paragraph>
              <Paragraph>
                Email:{' '}
                <a href="#" className="text-tertiary-500 underline">
                  lorem.ipsum@dolor.com
                </a>
              </Paragraph>
              <Paragraph>
                Twitter:{' '}
                <a href="#" className="text-tertiary-500 underline">
                  @wearegabrielle
                </a>
              </Paragraph>
              <Paragraph>
                Report a vulnerability:{' '}
                <a href="#" className="text-tertiary-500 underline">
                  gabrielle.com/security
                </a>
              </Paragraph>
              <Paragraph>
                To report a bug, please create a bug report right{' '}
                <a href="#" className="text-tertiary-500 underline">
                  here
                </a>
              </Paragraph>
              <Paragraph>
                To request a feature, please submit your idea in the{' '}
                <a href="#" className="text-tertiary-500 underline">
                  discussion forum
                </a>
              </Paragraph>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Contact
