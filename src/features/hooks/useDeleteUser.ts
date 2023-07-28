import { FirebaseError } from 'firebase/app'
import { collection, doc, runTransaction } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'

import { auth, db, storage } from '@/lib/firebase/client'

export const useDeleteUser = () => {
  const deleteUser = async () => {
    const user = auth.currentUser
    if (!user) return

    try {
      // FirestoreのuserPublicProfilesコレクションとuserPrivateProfilesコレクションからユーザーデータを削除
      await runTransaction(db, async (transaction) => {
        const publicProfileRef = doc(collection(db, 'userPublicProfiles'), user.uid)
        transaction.delete(publicProfileRef)

        const privateProfileRef = doc(collection(db, 'userPrivateProfiles'), user.uid)
        transaction.delete(privateProfileRef)
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`${error.name}: ${error.code}`)
      }
    }

    try {
      // Firebase Cloud Storageからユーザーのアイコンを削除
      const imageRef = storageRef(storage, `users/${user.uid}/icon`)
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error deleting image from Firebase Storage:', error)
    }

    try {
      // Firebase Authenticationからユーザーを削除
      await user.delete()
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`${error.name}: ${error.code}`)
      }
    }
  }

  return { deleteUser }
}
