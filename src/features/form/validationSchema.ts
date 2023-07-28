import { z } from 'zod'

const displayNameSchema = z
  .string()
  .nonempty({ message: 'ユーザー名は必須です' })
  .max(50, { message: 'ユーザー名は50文字以内で入力してください' })

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
  displayName: displayNameSchema,
  companyName: z.string().optional(),
  job: z.string(),
  industry: industrySchema,
  prefecture: z.string(),
  birthDate: z.string().optional(),
  gender: z.string(),
  profile: z.string().max(50, { message: '50文字以内で入力してください' }).optional()
})

export const editUserIconValidationSchema = z.object({
  icon: z.array(z.unknown()).nonempty({ message: 'File is required' })

  // フロント側でも png jpegの拡張子チェックは欲しい
  // .refine(
  //   (fileList) => {
  //     // eslint-disable-next-line no-console
  //     console.log('fileList', fileList)
  //     const dataURL = fileList[0]
  //     return dataURL.startsWith('data:image/jpeg;base64,') || dataURL.startsWith('data:image/png;base64,')
  //   },
  //   { message: 'File type must be jpeg, png' }
  // )
})

// iconフィールドが非空の配列（array().nonempty()）
// であることを確認しています。
// つまり、ユーザーはファイルをアップロードする必要があります。
// 次に.refine()メソッドを使用して
// アップロードされたファイルがFileインスタンスであり
// そのタイプが"image/jpeg", "image/png", "image/gif"の
// いずれかであることを確認しています。
// 必要に応じて、さらに.refine()を使用して追加の検証ロジックを追加できます。
// 例えば、アップロードされるファイルの最大サイズを制限することも可能です。

export const deleteUserFormValidationSchema = z.object({
  password: passwordSchema
})
