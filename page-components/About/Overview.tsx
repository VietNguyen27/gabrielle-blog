import { Container } from '@components/Layout'
import { Paragraph } from '@components/Paragraph'
import { Title } from '@components/Title'
import Image from 'next/image'
import AboutImg from '@public/static/images/about.jpg'

const Overview = () => {
  return (
    <section className="overflow-x-hidden">
      <Container className="px-8 pt-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="flex-1">
            <Title>About Gabrielle</Title>
            <div className="mt-6 text-lg">
              <Paragraph>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum quas quia maiores, numquam exercitationem magnam alias
                ducimus.
              </Paragraph>
              <Paragraph>
                Consectetur adipisicing elit. Unde odio cum voluptates, commodi
                sed fugiat repellendus recusandae cupiditate excepturi
                dignissimos. Libero placeat possimus earum perspiciatis iusto,
                temporibus quidem deleniti tenetur. Et, quas?
              </Paragraph>
              <Paragraph>
                Sit amet consectetur adipisicing elit. Unde explicabo incidunt
                voluptate consectetur commodi eos aperiam, perspiciatis odio
                ratione inventore harum eveniet quas cupiditate minus.
              </Paragraph>
            </div>
          </div>
          <div className="relative right-0 flex-1 lg:-right-[15%]">
            <Image src={AboutImg} alt="about gabrielle team" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Overview
