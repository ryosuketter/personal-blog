import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/lib/firebase/client'

export const useLogin = () => {
  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(`${userCredential.user.displayName}としてログイン`)
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          alert(`${error.name}: ${error.code}`)
        }
      })
  }

  return { login }
}
