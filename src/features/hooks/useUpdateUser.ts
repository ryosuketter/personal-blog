import { FirebaseError } from 'firebase/app'
import { collection, doc, updateDoc } from 'firebase/firestore'

import { auth } from '@/lib/firebase/client'
import { db } from '@/lib/firebase/client'
import { EditProfile } from '@/types/editProfile'

export const useUpdateUser = () => {
  const updateUser = async (data: EditProfile) => {
    const userId = auth.currentUser?.uid
    if (!userId) return
    const userRef = collection(db, 'users')
    const docRef = doc(userRef, userId)

    try {
      await updateDoc(docRef, data)
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`${error.name}: ${error.code}`)
      }
    }
  }

  return { updateUser }
}
