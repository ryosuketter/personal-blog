import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

import { auth } from '@/lib/firebase/client'
import { SignUp } from '@/types/signup'

export const useSignUp = () => {
  const signUp = ({ email, password }: SignUp) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return sendEmailVerification(userCredential.user).then(() => userCredential)
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          alert(`${error.name}: ${error.code}`)
        }
      })
  }

  return { signUp }
}
