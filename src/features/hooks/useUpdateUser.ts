import { FirebaseError } from 'firebase/app'
import { updateProfile } from 'firebase/auth'
import { collection, doc, runTransaction } from 'firebase/firestore'

import { auth } from '@/lib/firebase/client'
import { db } from '@/lib/firebase/client'
import { EditProfilePrivate, EditProfilePublic } from '@/types/editProfile'

export const useUpdateUser = () => {
  const updateUser = async ({
    publicData,
    privateData
  }: {
    publicData: EditProfilePublic
    privateData: EditProfilePrivate
  }) => {
    const { currentUser } = auth
    if (!currentUser) return

    const userPublicProfilesRef = collection(db, 'userPublicProfiles')
    const userPrivateProfilesRef = collection(db, 'userPrivateProfiles')
    const publicDocRef = doc(userPublicProfilesRef, currentUser.uid)
    const privateDocRef = doc(userPrivateProfilesRef, currentUser.uid)

    try {
      await runTransaction(db, async (transaction) => {
        transaction.update(publicDocRef, publicData)
        transaction.update(privateDocRef, privateData)
      })
      if (publicData.displayName) {
        // ユーザーのプロフィールを更新
        await updateProfile(currentUser, { displayName: publicData.displayName })
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`${error.name}: ${error.code}`)
      }
    }
  }

  return { updateUser }
}
