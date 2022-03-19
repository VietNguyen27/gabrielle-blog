import React from 'react'
import { Container } from '@components/Layout'
import { Title } from '@components/Title'
import { Paragraph } from '@components/Paragraph'

const Contact = () => {
  return (
    <Container>
      <div className="mx-auto py-8 xl:w-4/5">
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
  )
}

export default Contact
