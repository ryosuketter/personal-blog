import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Meta } from '@/components/Meta'
import { client } from '@/libs/client'
import { Projects } from '@/types/projects'

import { ProjectContents } from './ProjectContents'

export default function Project({ projects }: Projects) {
  return (
    <Container>
      <>
        <Meta pageTitle="Projects" pageDesc="これまでに参加したプロジェクトの一覧です" />
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
