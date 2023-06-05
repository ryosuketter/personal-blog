import { z } from 'zod'

const emailSchema = z
  .string()
  .nonempty({ message: 'メールアドレスは必須です' })
  .email({ message: 'メールアドレスの形式が正しくありません' })

const passwordSchema = z
  .string()
  .nonempty({ message: 'パスワードは必須です' })
  .min(8, { message: 'パスワードは8文字以上で入力してください' })

export const signupFormValidationSchema = z.object({
  displayName: z.string().nonempty({ message: '名前は必須です' }),
  email: emailSchema,
  password: passwordSchema
})

export const loginFormValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})
