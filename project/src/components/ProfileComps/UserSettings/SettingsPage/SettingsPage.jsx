import { useState } from 'react'
import './SettingsPage.css'
import ProfileSettings from '../ProfileSettings/ProfileSettings'
import SecuritySettings from '../SecuritySettings/SecuritySettings'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { useAuth} from '../../../../context/AuthContext'

const SettingsPage = () => {
  const { currentUser, logout, loading } = useAuth()
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      
      alert('Logged out successfully')
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      setIsLoggingOut(false)
      setShowConfirmLogout(false)
    }
  }

  if (loading) {
    return (
      <div className="settings-container loading">
        <div className="spinner"></div>
        <p>Loading your settings...</p>
      </div>
    )
  }

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Account Settings</h1>
      </header>

      <div className="settings-content">
        <div className="settings-main">
          {currentUser && <ProfileSettings user={currentUser} />}
          <SecuritySettings />
          <div className="logout-section">
            <button 
              className="btn-danger logout-btn"
              onClick={() => setShowConfirmLogout(true)}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {showConfirmLogout && (
        <ConfirmationModal
          title="Log out"
          message="Are you sure you want to log out of your account?"
          confirmText="Log Out"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirmLogout(false)}
          isProcessing={isLoggingOut}
          confirmType="danger"
        />
      )}
    </div>
  )
}

export default SettingsPage