import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, runTransaction } from 'firebase/firestore'
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
        const userPublicRef = collection(db, 'userPublicProfiles')
        const userPrivateRef = collection(db, 'userPrivateProfiles')
        const docPublicRef = doc(userPublicRef, user.uid)
        const docPrivateRef = doc(userPrivateRef, user.uid)

        await runTransaction(db, async (transaction) => {
          const snapPublic = await transaction.get(docPublicRef)
          const snapPrivate = await transaction.get(docPrivateRef)

          if (snapPublic.exists() && snapPrivate.exists()) {
            const userData = {
              ...snapPublic.data(),
              ...snapPrivate.data()
            } as User
            setUser(userData)
          } else {
            const userData: User = {
              uid: user.uid,
              createdAt: new Date()
            }
            transaction.set(docPublicRef, userData)
            transaction.set(docPrivateRef, userData)
            setUser(userData)
          }
        })
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
