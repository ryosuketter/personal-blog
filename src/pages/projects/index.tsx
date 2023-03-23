import { FC } from 'react'

import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { client } from '@/libs/client'
import { Projects } from '@/types/projects'

import { ProjectContents } from './ProjectContents'

const Project: FC<Projects> = ({ projects }) => {
  return (
    <Container>
      <>
        <Hero title="Projects" />
        <ProjectContents projects={projects} />
      </>
    </Container>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'projects' })

  return {
    props: {
      projects: data.contents
    }
  }
}

export default Project
