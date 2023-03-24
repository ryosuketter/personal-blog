import dayjs from 'dayjs'
import { FC } from 'react'

import type { Projects } from '@/types/projects'

import styles from './style.module.scss'

export const ProjectContents: FC<Projects> = ({ projects }) => {
  if (projects.length <= 0) return null

  return (
    <>
      {projects.map((project) => {
        return (
          <div key={project.id} className={styles.wrapper}>
            <h3 className={styles.header}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.companyName}
              </a>
            </h3>
            <div className={styles.tagList}>
              <p className={styles.tag}>{project.employmentType}</p>
              <p className={styles.tag}>{project.role}</p>
            </div>
            <p className={styles.body}>{project.description}</p>
            <p>
              {!project.endDate
                ? `${dayjs(project.startDate).format('YYYY-MM-DD')} - 現在`
                : `${dayjs(project.startDate).format('YYYY-MM-DD')} - ${dayjs(project.endDate).format('YYYY-MM-DD')}`}
            </p>
          </div>
        )
      })}
    </>
  )
}
