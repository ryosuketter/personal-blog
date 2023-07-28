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
import { EditProfile as EditProfileForm, EditProfilePrivate, EditProfilePublic } from '@/types/editProfile'

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

      const publicUserRef = collection(db, 'userPublicProfiles')
      const privateUserRef = collection(db, 'userPrivateProfiles')

      const publicDocRef = doc(publicUserRef, userId)
      const privateDocRef = doc(privateUserRef, userId)

      try {
        const publicDocSnap = await getDoc(publicDocRef)
        const privateDocSnap = await getDoc(privateDocRef)

        if (publicDocSnap.exists() && privateDocSnap.exists()) {
          const publicUserData = publicDocSnap.data() as EditProfilePublic
          const privateUserData = privateDocSnap.data() as EditProfilePrivate
          const userData: EditProfileForm = { ...publicUserData, ...privateUserData }

          setDefaultValues(userData) // Reactのstateで、初期値を設定するための関数
          reset(userData) // フォームの入力値をリセットするための関数
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
    // EditProfileForm型のデータをPublicとPrivateの2つに分ける
    const publicData: EditProfilePublic = {
      displayName: data.displayName,
      companyName: data.companyName,
      job: data.job,
      industry: data.industry,
      profile: data.profile
    }

    const privateData: EditProfilePrivate = {
      gender: data.gender,
      birthDate: data.birthDate,
      prefecture: data.prefecture
    }

    // 分割したデータを更新関数に送信
    updateUser({ publicData, privateData })
  }

  if (!defaultValues) {
    return null
  }

  return (
    <>
      <h1>editProfile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="displayName">displayName</label>
          <input autoComplete="off" {...register('displayName')} id="displayName" type="text" placeholder="佐藤 太郎" />
          {errors.displayName && <p>{errors.displayName.message}</p>}
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
