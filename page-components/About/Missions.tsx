import { Heading } from '@components/Heading'
import { Container } from '@components/Layout'
import { Paragraph } from '@components/Paragraph'
import Image from 'next/image'
import { missions } from './data'

const Missions = () => {
  return (
    <section>
      <Container className="py-16">
        <Heading level={2} className="mb-8 text-center text-3xl capitalize">
          Our mission
        </Heading>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 xs:grid-cols-2 md:grid-cols-3">
          {missions.map(({ title, content, icon }, index) => (
            <div className="flex flex-col" key={index}>
              <Heading level={3} className="flex items-center gap-2">
                <Image src={icon} alt={title} width={24} height={24} />
                {title}
              </Heading>
              <Paragraph>{content}</Paragraph>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Missions
