import Layout from '@components/Layout'
import React, { ReactElement } from 'react'

const About = () => {
  return <div>about</div>
}

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default About
