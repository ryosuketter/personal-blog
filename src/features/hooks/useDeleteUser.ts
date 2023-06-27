import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'

import { auth, db, storage } from '@/lib/firebase/client'

export const useDeleteUser = () => {
  const deleteUser = async () => {
    const user = auth.currentUser
    if (!user) return

    try {
      // Firestoreからユーザーデータを削除
      const docRef = doc(collection(db, 'users'), user.uid)
      await deleteDoc(docRef)
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
