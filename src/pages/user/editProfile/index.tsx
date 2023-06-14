import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { collection, doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { genders, jobs, prefectures } from '@/const/index'
import { editFormValidationSchema } from '@/features/form/validationSchema'
import { useUpdateUser } from '@/features/hooks/useUpdateUser'
import { auth } from '@/lib/firebase/client'
import { db } from '@/lib/firebase/client'
import { EditProfile as EditProfileForm } from '@/types/editProfile'

export default function EditProfile() {
  const [defaultValues, setDefaultValues] = useState<EditProfileForm | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EditProfileForm>({
    defaultValues: defaultValues || undefined,
    mode: 'onBlur',
    resolver: zodResolver(editFormValidationSchema)
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid
      if (!userId) return
      const userRef = collection(db, 'users')
      const docRef = doc(userRef, userId)
      try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const userData = docSnap.data() as EditProfileForm
          setDefaultValues(userData)
          reset(userData)
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          alert(`${error.name}: ${error.code}`)
        }
      }
    }
    fetchUserData()
  }, [reset])

  const { updateUser } = useUpdateUser()

  const onSubmit = (data: EditProfileForm) => {
    updateUser(data)
  }

  if (!defaultValues) {
    return null
  }

  return (
    <>
      <h1>editProfile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="lastName">lastName</label>
          <input autoComplete="off" {...register('lastName')} id="lastName" type="lastName" placeholder="佐藤" />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastNameKana">lastNameKana</label>
          <input
            autoComplete="off"
            {...register('lastNameKana')}
            id="lastNameKana"
            type="lastNameKana"
            placeholder="サトウ"
          />
          {errors.lastNameKana && <p>{errors.lastNameKana.message}</p>}
        </div>
        <div>
          <label htmlFor="firstName">firstName</label>
          <input autoComplete="off" {...register('firstName')} id="firstName" type="firstName" placeholder="太郎" />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="firstNameKana">firstNameKana</label>
          <input
            autoComplete="off"
            {...register('firstNameKana')}
            id="firstNameKana"
            type="firstNameKana"
            placeholder="タロウ"
          />
          {errors.firstNameKana && <p>{errors.firstNameKana.message}</p>}
        </div>
        <div>
          <label htmlFor="companyName">companyName</label>
          <input
            autoComplete="off"
            {...register('companyName')}
            id="companyName"
            type="companyName"
            placeholder="AXIS Inc."
          />
          {errors.companyName && <p>{errors.companyName.message}</p>}
        </div>
        <div>
          <label>職業</label>
          <select {...register('job')}>
            {jobs.map((job) => {
              return (
                <option key={job.jobCode} value={job.jobCode}>
                  {job.jobName}
                </option>
              )
            })}
          </select>
          {errors.job && <p>{errors.job.message}</p>}
        </div>
        <div>
          <label htmlFor="industry">industry</label>
          <input autoComplete="off" {...register('industry')} id="industry" type="industry" placeholder="IT" />
          {errors.industry && <p>{errors.industry.message}</p>}
        </div>
        <div>
          <label>所在地</label>
          <select {...register('prefecture')}>
            {prefectures.map((pref) => {
              return (
                <option key={pref.prefCode} value={pref.prefCode}>
                  {pref.prefName}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label>誕生日</label>
          <input autoComplete="off" {...register('birthDate')} id="birthDate" type="date" />
          {errors.birthDate && <p>{errors.birthDate.message}</p>}
        </div>
        <div>
          <label>性別</label>
          <select {...register('gender')}>
            {genders.map((gender) => {
              return (
                <option key={gender.code} value={gender.code}>
                  {gender.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label>プロフィール</label>
          <textarea autoComplete="off" {...register('profile')} id="profile" placeholder="AXIS Inc.で働いています。" />
        </div>
        <button type="submit">登録</button>
      </form>
      <div>
        <Link href="/user">user</Link>
      </div>
    </>
  )
}
