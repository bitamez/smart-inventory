import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { supabase } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    const { data } = await authService.getCurrentUser()
    if (data) {
      setUser(data)
      await loadUserProfile(data.id)
    }
    setLoading(false)
  }

  const loadUserProfile = async (userId) => {
    const { data } = await authService.getUserProfile(userId)
    if (data) {
      setProfile(data)
    }
  }

  const signIn = async (email, password) => {
    const { data, error } = await authService.signIn(email, password)
    if (data?.user) {
      setUser(data.user)
      await loadUserProfile(data.user.id)
    }
    return { data, error }
  }

  const signUp = async (email, password, userData) => {
    return await authService.signUp(email, password, userData)
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
