import { onAuthStateChanged } from 'firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { auth } from '@/lib/firebase/client'

type ContextType = {
  isLoggedIn: boolean
  isLoading: boolean
  userName: string
}

const AuthContext = createContext<ContextType>({
  isLoggedIn: false,
  isLoading: false,
  userName: ''
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
      setIsLoading(false)
      setUserName(user?.displayName || '')
    })
    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, isLoading, userName }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
