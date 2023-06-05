import { Auth } from '@/components/Auth'
import { Background } from '@/components/Background'
import { Hero } from '@/components/Hero'
import { Meta } from '@/components/Meta'
import { client } from '@/lib/client'
import { Projects } from '@/types/projects'

import ProjectContents from './ProjectContents'

export default function Project({ projects }: Projects) {
  return (
    <>
      <Meta pageTitle="Projects" pageDesc="これまでに参加したプロジェクトの一覧です" />
      <Hero title="Projects" />
      <Auth />
      <Background>
        <ProjectContents projects={projects} />
      </Background>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'projects' })

  return {
    props: {
      projects: data.contents
    },
    revalidate: 120
  }
}
