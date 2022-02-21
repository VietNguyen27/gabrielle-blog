import React, { ReactElement, useState } from 'react'
import Head from 'next/head'
import Container from '@components/Container'
import Layout from '@components/Layout'
import Title from '@components/Title'
import Paragraph from '@components/Paragraph'
import Image from 'next/image'
import Heading from '@components/Heading'
import AboutImg from '../public/static/images/about.jpg'
import DashedLine from '../public/static/images/dashed-line.svg'
import { missions, contributors } from '@data/about'
import { ArrowSmDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

const About = () => {
  const [contributorsExpanded, setContributorsExpanded] =
    useState<boolean>(false)

  return (
    <>
      <Head>
        <title>About Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  Consectetur adipisicing elit. Unde odio cum voluptates,
                  commodi sed fugiat repellendus recusandae cupiditate excepturi
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
      <section>
        <Container className="pb-32">
          <div className="flex flex-col items-center pb-8 text-center">
            <div className="pb-4">
              <Image src={DashedLine} alt="dashed line" />
            </div>
            <Heading level={2} className="text-3xl capitalize">
              Gabrielle's contributors
            </Heading>
            <Paragraph className="text-xl">
              A growing and talented team, fueled by a quality driven culture.
            </Paragraph>
          </div>
          <div className="relative mx-auto w-full lg:w-3/4">
            <div
              className={clsx(
                'grid grid-cols-2 gap-x-4 gap-y-10 overflow-hidden transition-all duration-300 sm:grid-cols-3',
                contributorsExpanded ? 'max-h-[2500px]' : 'max-h-[250px]'
              )}
            >
              {contributors.map(({ name, position, image }, index) => (
                <div
                  className="flex flex-col items-center gap-2 text-center xs:flex-row xs:text-left"
                  key={index}
                >
                  <Image
                    src={image}
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-gray-700">{position}</p>
                  </div>
                </div>
              ))}
            </div>
            {!contributorsExpanded && (
              <div className="absolute top-full left-0 z-10 mt-4 flex w-full justify-center py-2 after:absolute after:left-0 after:bottom-full after:h-40 after:w-full after:bg-gradient-to-t after:from-white after:to-white/50">
                <button
                  className="flex w-full items-center justify-center gap-1 font-bold transition-transform duration-300 hover:scale-105"
                  type="button"
                  onClick={() => setContributorsExpanded(true)}
                >
                  Get to know all of us <ArrowSmDownIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default About
