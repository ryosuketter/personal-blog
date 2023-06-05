import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { loginFormValidationSchema } from '@/features/form/validationSchema'
import { useLogin } from '@/features/hooks/useLogin'
import { useAuth } from '@/features/stores/context/auth'
import { Login as LoginForm } from '@/types/login'

export default function Signup() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) router.push('/')
  }, [isLoggedIn, router])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    mode: 'onBlur',
    resolver: zodResolver(loginFormValidationSchema)
  })

  const { login } = useLogin()

  const onSubmit = (data: LoginForm) => {
    const { email, password } = data
    login(email, password)
  }

  return (
    <>
      <h1>Login</h1>
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
        <button type="submit">ログイン</button>
      </form>
      <Link href="/signup">アカウントをお持ちでない方はこちら</Link>
    </>
  )
}
