import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth'

const auth = getAuth()

export const isValidPassword = async (password: string): Promise<boolean> => {
  const user = auth.currentUser

  if (!user || !user.email) return false

  try {
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
