import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  setDoc
} from 'firebase/firestore'
import { FC, useCallback, useEffect, useState } from 'react'

import { db } from '@/lib/firebase/client'
import { auth } from '@/lib/firebase/client'

import styles from './style.module.scss'

interface LikeButtonProps {
  postId: string
}

export const LikeButton: FC<LikeButtonProps> = ({ postId }) => {
  const userId = auth.currentUser?.uid
  const username = auth.currentUser?.displayName

  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [likeCount, setLikeCount] = useState<number>(0)

  useEffect(() => {
    if (!userId) return

    const postLikesRef = collection(db, 'postLikes') // changed to 'postLikes'
    const unsubscribeLikedUser = onSnapshot(postLikesRef, (snapshot) => {
      const likedDoc = snapshot.docs.find((doc) => doc.data().userId === userId && doc.data().postId === postId)
      setIsLiked(likedDoc ? true : false)
    })

    const postDocRef = doc(db, 'posts', postId)
    const unsubscribeLikedCount = onSnapshot(postDocRef, (snapshot) => {
      const postData = snapshot.data()
      if (postData) setLikeCount(postData.likeCount)
    })

    return () => {
      unsubscribeLikedUser()
      unsubscribeLikedCount()
    }
  }, [userId, postId])

  const handleClick = useCallback(async () => {
    if (!userId || isLiked === null) return

    const postLikesRef = collection(db, 'postLikes')
    const postDocRef = doc(db, 'posts', postId)

    const postDoc = await getDoc(postDocRef)

    if (!postDoc.exists()) await setDoc(postDocRef, { likeCount: 0 })

    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postDocRef)
      const postData = postDoc.data()
      if (!postData) throw Error('Document does not exist!')

      if (isLiked) {
        const likedDoc = (await getDocs(postLikesRef)).docs.find(
          (doc) => doc.data().userId === userId && doc.data().postId === postId
        )
        if (likedDoc) {
          await deleteDoc(likedDoc.ref)
        }
        transaction.update(postDocRef, { likeCount: postData.likeCount - 1 })
      } else {
        await addDoc(postLikesRef, { userId, postId, username })
        transaction.update(postDocRef, { likeCount: postData.likeCount + 1 })
      }
    })
  }, [userId, postId, isLiked, username])

  if (!userId) return null
  if (isLiked === null) return null

  return (
    <div className={styles.buttonWrapper}>
      <button onClick={handleClick} className={styles.likeButton}>
        <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} size="2x" />
        <p>{likeCount}</p>
      </button>
    </div>
  )
}
