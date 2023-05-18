import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import router from 'next/router'
import { useForm } from 'react-hook-form'

import { User } from '@/types/user'

export default function SignUp() {
  const isValid = async (data: User) => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      updateProfile(userCredential.user, { displayName: data.name })
      await sendEmailVerification(userCredential.user)
      router.push('/')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e.code)
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>()

  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={handleSubmit(isValid)}>
        <div>
          <label>ユーザー名</label>
          <input
            {...register('name', { required: 'ユーザー名を入力してください' })}
            placeholder="User Name"
            type="text"
          />
          <div>{errors.name?.message}</div>
        </div>
        <div>
          <label>メールアドレス</label>
          <input
            {...register('email', { required: 'メールアドレスを入力してください' })}
            placeholder="your@email.com"
            type={'email'}
          />
          <div>{errors.email?.message}</div>
        </div>
        <div>
          <label>パスワード</label>
          <input
            {...register('password', {
              required: 'パスワードを入力してください',
              minLength: { value: 6, message: '6文字以上入力してください' }
            })}
            placeholder="Password"
            type={'password'}
          />
          <div>{errors.password?.message}</div>
        </div>
        <div>
          <button type="submit">サインアップする</button>
        </div>
      </form>
      <button onClick={() => router.push('/signin')}>LogIn</button>
    </div>
  )
}
