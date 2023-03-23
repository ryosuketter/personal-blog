export type Projects = {
  projects: Array<Project>
}

type Project = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  companyName: string
  url?: string
  role: string
  description?: string
  employmentType?: Array<string>
  startDate: string
  endDate?: string
}
