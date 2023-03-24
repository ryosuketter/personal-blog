import dayjs from 'dayjs'

import { Container } from '@/components/Container'
import type { Projects } from '@/types/projects'

import styles from './style.module.scss'

export default function ProjectContents({ projects }: Projects) {
  if (!projects) return null

  return (
    <Container>
      <div className={styles.wrapper}>
        {projects.map((project) => {
          return (
            <div key={project.id} className={styles.projectWrapper}>
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
      </div>
    </Container>
  )
}
