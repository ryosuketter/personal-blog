import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { signupFormValidationSchema } from '@/features/form/validationSchema'
import { useSignUp } from '@/features/hooks/useSignup'
import { useAuth } from '@/features/stores/context/auth'
import { SignUp as SignUpForm } from '@/types/signup'

export default function Signup() {
  const user = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user, router])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    resolver: zodResolver(signupFormValidationSchema)
  })

  const { signUp } = useSignUp()

  const onSubmit = (data: SignUpForm) => {
    const { email, password } = data
    signUp({ email, password })
  }

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">email</label>
          <input autoComplete="off" {...register('email')} id="email" type="email" placeholder="axis@mail.com" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input autoComplete="off" {...register('password')} id="password" type="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">登録</button>
      </form>
      <Link href="/login">すでにアカウントをお持ちの方はこちら</Link>
    </>
  )
}
