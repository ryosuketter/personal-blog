import { FC } from 'react'

import type { Projects } from '@/types/projects'

export const ProjectContents: FC<Projects> = ({ projects }) => {
  return (
    <>
      {projects.map((project) => {
        return (
          <div key={project.id}>
            <a href={project.url}>
              <h3>{project.companyName}</h3>
            </a>
            <p>{project.role}</p>
            <p>{project.description}</p>
            <p>{project.employmentType}</p>
            <p>
              {project.startDate}
              {project.endDate ? `- ${project.endDate}` : ''}
            </p>
          </div>
        )
      })}
    </>
  )
}
