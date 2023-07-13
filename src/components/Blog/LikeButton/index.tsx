import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { FC, useCallback, useEffect, useState } from 'react'

import { db } from '@/lib/firebase/client'
import { auth } from '@/lib/firebase/client'

import styles from './style.module.scss'

interface LikeButtonProps {
  postId: string
}

export const LikeButton: FC<LikeButtonProps> = ({ postId }) => {
  const userId = auth.currentUser?.uid

  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [likeCount, setLikeCount] = useState<number>(0)

  useEffect(() => {
    if (!userId) return

    const postRef = doc(db, 'posts', postId)
    const likedUserRef = doc(postRef, 'LikedUsers', userId)

    const unsubscribeLikedUser = onSnapshot(likedUserRef, (doc) => {
      setIsLiked(doc.exists())
    })

    const likedUsersRef = collection(db, `posts/${postId}/LikedUsers`)
    const unsubscribeLikedCount = onSnapshot(likedUsersRef, (snapshot) => {
      setLikeCount(snapshot.size)
    })

    return () => {
      unsubscribeLikedUser()
      unsubscribeLikedCount()
    }
  }, [userId, postId])

  const handleClick = useCallback(async () => {
    if (!userId || isLiked === null) return

    const postRef = doc(db, 'posts', postId)
    const likedUserRef = doc(postRef, 'LikedUsers', userId)

    const userDoc = doc(db, 'users', userId)
    const userSnapshot = await getDoc(userDoc)
    const userData = userSnapshot.data()
    const lastName = userData?.lastName

    const userLikePostRef = doc(userDoc, 'likePosts', postId)

    if (isLiked) {
      await deleteDoc(likedUserRef)
      await deleteDoc(userLikePostRef)
    } else {
      await setDoc(likedUserRef, { userId, lastName })
      await setDoc(userLikePostRef, { slug: postId })
    }
  }, [userId, postId, isLiked])

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
