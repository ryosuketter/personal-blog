import { z } from 'zod'

const nameSchema = z.string().optional()

const nameKanaSchema = z
  .string()
  .regex(/^[\u30A0-\u30FF]+$/, { message: 'カタカナで入力してください' })
  .optional()

const emailSchema = z
  .string()
  .nonempty({ message: 'メールアドレスは必須です' })
  .email({ message: 'メールアドレスの形式が正しくありません' })

const passwordSchema = z
  .string()
  .nonempty({ message: 'パスワードは必須です' })
  .min(8, { message: 'パスワードは8文字以上で入力してください' })

const industrySchema = z.string().nonempty({ message: '必須です' })

export const signupFormValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const loginFormValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const editFormValidationSchema = z.object({
  lastName: nameSchema,
  lastNameKana: nameKanaSchema,
  firstName: nameSchema,
  firstNameKana: nameKanaSchema,
  companyName: z.string().optional(),
  job: z.string(),
  industry: industrySchema,
  prefecture: z.string(),
  birthDate: z.string().optional(),
  gender: z.string(),
  profile: z.string().max(50, { message: '50文字以内で入力してください' }).optional()
})
