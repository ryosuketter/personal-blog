export type EditProfile = {
  displayName?: string
  companyName?: string
  job: string
  industry: string
  prefecture: string
  birthDate?: string
  gender: string
  profile?: string
}

export type EditProfilePublic = {
  displayName?: string
  companyName?: string
  job: string
  industry: string
  profile?: string
}

export type EditProfilePrivate = {
  gender: string
  birthDate?: string
  prefecture: string
}
