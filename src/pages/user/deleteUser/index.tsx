import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { deleteUserFormValidationSchema } from '@/features/form/validationSchema'
import { useDeleteUser } from '@/features/hooks/useDeleteUser'
import { isValidPassword } from '@/lib/firebase/auth'
import { DeleteUser } from '@/types/deleteUser'

export default function DeleteAccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DeleteUser>({
    resolver: zodResolver(deleteUserFormValidationSchema)
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { deleteUser } = useDeleteUser()
  const router = useRouter()

  const onSubmit = async (data: DeleteUser) => {
    if (!window.confirm('本当にアカウントを削除しますか？この操作は取り消すことができません')) {
      return
    }

    setIsSubmitting(true)

    if (await isValidPassword(data.password)) {
      await deleteUser()
      router.push('/')
    } else {
      alert('パスワードが間違っています。')
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>deleteUser</h1>

      <p>アカウントを削除すると全ての情報が失われます。本当によろしいですか？</p>

      <div>
        <label htmlFor="password">パスワード</label>
        <input type="password" {...register('password')} id="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '削除中...' : 'アカウントを削除'}
      </button>
    </form>
  )
}
