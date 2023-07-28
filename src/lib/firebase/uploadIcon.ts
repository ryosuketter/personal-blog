import { collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage'

import { storage } from '@/lib/firebase/client'
import { auth, db } from '@/lib/firebase/client'

const uploadIconToStorage = async (iconData: string) => {
  try {
    const imageRef = storageRef(storage, `users/${auth.currentUser?.uid}/icon`)

    // https://youtu.be/UWt68ScIZKA?t=30556
    // https://firebase.google.com/docs/storage/web/upload-files?hl=ja
    await uploadString(imageRef, iconData, 'data_url')
    const iconURL = await getDownloadURL(imageRef)
    return iconURL
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error)
    throw error
  }
}

const updateIconInFirestore = async (iconURL: string) => {
  try {
    const documentRef = doc(collection(db, 'userPublicProfiles'), auth.currentUser?.uid)
    await setDoc(documentRef, { iconURL }, { merge: true })
  } catch (error) {
    console.error("Error updating user's icon in Firestore:", error)
    throw error
  }
}

export const uploadAndUpdateIcon = async (iconData: string) => {
  try {
    const iconURL = await uploadIconToStorage(iconData)
    await updateIconInFirestore(iconURL)
  } catch (error) {
    console.error('Error during icon upload and update:', error)
  }
}
