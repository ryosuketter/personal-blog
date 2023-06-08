import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

import { auth } from '@/lib/firebase/client'
import { SignUp } from '@/types/signup'

export const useSignUp = () => {
  const signUp = async ({ email, password }: SignUp) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      return userCredential
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`${error.name}: ${error.code}`)
      }
    }
  }

  return { signUp }
}
