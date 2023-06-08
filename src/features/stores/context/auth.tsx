import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { auth, db } from '@/lib/firebase/client'
import { User } from '@/types/user'

type UserContextType = User | null | undefined

const AuthContext = createContext<UserContextType>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const userRef = collection(db, 'users')
        const docRef = doc(userRef, user.uid)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          // ユーザーデータを取得して格納
          const userData = snap.data() as User
          setUser(userData)
        } else {
          // ユーザーが未作成の場合、新規作成して格納
          const userData: User = {
            uid: user.uid,
            createdAt: new Date()
          }
          // Firestoreにユーザーデータを保存
          await setDoc(docRef, userData)
          setUser(userData)
        }
      } else {
        // ログインしていない場合、ユーザー情報を空にする
        setUser(null)
      }
    })

    // このコンポーネントが不要になったら監視を終了する
    return unsubscribe
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
