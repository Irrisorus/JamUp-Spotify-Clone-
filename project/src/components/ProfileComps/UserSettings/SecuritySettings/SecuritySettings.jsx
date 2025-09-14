import { useState } from 'react'
import './SecuritySettings.css'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { useAuth} from '../../../../context/AuthContext'

const SecuritySettings = () => {
  const { changePassword } = useAuth()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
    
    
    if (apiError) setApiError(null)
    if (successMessage) setSuccessMessage(null)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter'
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setShowConfirmation(true)
  }

  const handleConfirmUpdate = async () => {
    setIsProcessing(true)
    try {
      await changePassword(formData.currentPassword, formData.newPassword)
      
   
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      setSuccessMessage('Password updated successfully')
      setIsChangingPassword(false)
    } catch (error) {
      console.error('Failed to change password', error)
      setApiError(error.message || 'Failed to update password. Please try again.')
    } finally {
      setIsProcessing(false)
      setShowConfirmation(false)
    }
  }

  return (
    <div className="security-settings">
      <h2>Account Security</h2>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      {apiError && (
        <div className="api-error">
          {apiError}
        </div>
      )}
      
      <div className="password-section">
        <div className="section-header">
          <h3>Password</h3>
          {!isChangingPassword && (
            <button 
              type="button" 
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </button>
          )}
        </div>
        
        {isChangingPassword ? (
          <form onSubmit={handleSubmit} className="settings-form">
          
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={errors.currentPassword ? 'error' : ''}
              />
              {errors.currentPassword && (
                <div className="error-message">{errors.currentPassword}</div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={errors.newPassword ? 'error' : ''}
              />
              {errors.newPassword && (
                <div className="error-message">{errors.newPassword}</div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>
            
            <div className="password-requirements">
              <p>Your password must:</p>
              <ul>
                <li className={formData.newPassword.length >= 8 ? 'met' : ''}>
                  Be at least 8 characters long
                </li>
                <li className={/[A-Z]/.test(formData.newPassword) ? 'met' : ''}>
                  Include at least one uppercase letter
                </li>
                <li className={/[0-9]/.test(formData.newPassword) ? 'met' : ''}>
                  Include at least one number
                </li>
              </ul>
            </div>
            
            <div className="form-actions">
              <button type="submit">Save Password</button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                  setIsChangingPassword(false)
                  setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  })
                  setErrors({})
                  setApiError(null)
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="password-status">
            ••••••••
          </p>
        )}
      </div>
      
      {showConfirmation && (
        <ConfirmationModal
          title="Change Password"
          message="Are you sure you want to change your password? You'll need to use your new password next time you log in."
          confirmText="Change Password"
          cancelText="Cancel"
          onConfirm={handleConfirmUpdate}
          onCancel={() => setShowConfirmation(false)}
          isProcessing={isProcessing}
        />
      )}
    </div>
  )
}

export default SecuritySettings