import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

import { auth, db } from '@/lib/firebase/client'
import { SignUp } from '@/types/signup'

export const useSignUp = () => {
  const signUp = ({ email, password, displayName }: SignUp) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: displayName || 'no name',
          photoURL: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
        }).then(() => userCredential)
      })
      .then((userCredential) => {
        return sendEmailVerification(userCredential.user).then(() => userCredential)
      })
      .then((userCredential) => {
        const { user } = userCredential
        const { displayName, photoURL, email, uid } = user
        const data = { displayName, photoURL, email, uid }
        return addDoc(collection(db, 'users'), data)
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          alert(`${error.name}: ${error.code}`)
        }
      })
  }

  return { signUp }
}
