import { useState } from 'react'
import './ProfileSettings.css'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { useAuth} from '../../../../context/AuthContext'

const ProfileSettings = ({ user }) => {
 
  if (!user) {
    return (
      <div className="profile-settings">
        <h2>Profile Information</h2>
        <div className="loading-state">
          <p>Loading profile information...</p>
        </div>
      </div>
    )
  }

  const { updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email
  })
  const [errors, setErrors] = useState({})

  // const handeEditBtn=()=>{
  //   setIsEditing(true)
  //   setShowConfirmation(false)
  //   console.log(showConfirmation);
  //   console.log(isEditing);
    
    
  // }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {

    console.log("form submit");

    if (!validateForm()) {
      return
    }
      setShowConfirmation(true)
  
      
  
    
  }

  const handleConfirmUpdate = async () => {
    setIsSaving(true)
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile', error)
    } finally {
      setIsSaving(false)
      setShowConfirmation(false)
    }
  }

  return (
    <div className="profile-settings">
      <h2>Profile Information</h2>
      
      <form  className="settings-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          {isEditing ? (
            <>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </>
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          {isEditing ? (
            <>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <div className="error-message">{errors.username}</div>}
            </>
          ) : (
            <div className="field-value">{user.username}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          {isEditing ? (
            <>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </>
          ) : (
            <div className="field-value">{user.email}</div>
          )}
        </div>
        
        <div className="form-actions">
          {isEditing ? (
            <>
              <button type="button"
                onClick={()=>{
                   handleSubmit()
                }} 
              >Save Changes</button>

              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                 
                  setIsEditing(false)
                  setFormData({
                    name: user.name,
                    username: user.username,
                    email: user.email
                  })
                  setErrors({})
                  
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
      
      {showConfirmation && (
        <ConfirmationModal
          title="Update Profile"
          message="Are you sure you want to update your profile information?"
          confirmText="Update"
          cancelText="Cancel"
          onConfirm={handleConfirmUpdate}
          onCancel={() => setShowConfirmation(false)}
          isProcessing={isSaving}
        />
      )}
    </div>
  )
}

export default ProfileSettings