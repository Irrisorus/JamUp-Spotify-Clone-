import { createContext, useState, useEffect, useContext } from 'react'


const mockUser = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'Password123'
}

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    setTimeout(() => {
      setCurrentUser(mockUser)
      setLoading(false)
    }, 500)
  }, [])

  const updateProfile = (updates) => {
    return new Promise((resolve) => {
     
      setTimeout(() => {
        setCurrentUser({ ...currentUser, ...updates })
        resolve({ success: true })
      }, 800)
    })
  }

  const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
     
      setTimeout(() => {
        if (currentPassword === currentUser.password) {
          setCurrentUser({ ...currentUser, password: newPassword })
          resolve({ success: true })
        } else {
          reject('Current password is incorrect')
        }
      }, 800)
    })
  }

  const logout = () => {
    return new Promise((resolve) => {
      
      setTimeout(() => {
        setCurrentUser(null)
        resolve({ success: true })
      }, 800)
    })
  }

  const value = {
    currentUser,
    loading,
    updateProfile,
    changePassword,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}