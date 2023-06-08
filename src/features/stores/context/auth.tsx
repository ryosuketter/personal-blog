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
        const userRef = collection(db, 'users')
        const docRef = doc(userRef, user.uid)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          const userData = snap.data() as User
          setUser(userData)
        } else {
          const userData: User = {
            uid: user.uid,
            createdAt: new Date()
          }
          await setDoc(docRef, userData)
          setUser(userData)
        }
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
